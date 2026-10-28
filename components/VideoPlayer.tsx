import React, { useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions, BackHandler } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { X } from 'lucide-react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useLiveTVStore } from '../store/useLiveTVStore';

const XIcon = X as any;
const { width, height } = Dimensions.get('window');

export function VideoPlayer() {
  const { currentChannel, playChannel } = useLiveTVStore();
  const videoViewRef = useRef<VideoView>(null);
  const isFullscreenRef = useRef(false);

  const player = useVideoPlayer(currentChannel?.url || '', (player) => {
    player.loop = false;
    player.play();
  });

  // Screen rotation: tilt to landscape → enter fullscreen (video only), tilt back → exit
  // The orientation listener only handles LANDSCAPE (enter).
  // Portrait return is handled by the native player itself via onFullscreenExit.
  // Calling exitFullscreen() from the listener would double-fire and break portrait return.
  // If the device's system rotation lock is ON, the OS never delivers landscape events — no extra check needed.
  useEffect(() => {
    ScreenOrientation.unlockAsync();

    const subscription = ScreenOrientation.addOrientationChangeListener((event) => {
      const o = event.orientationInfo.orientation;
      if (
        o === ScreenOrientation.Orientation.LANDSCAPE_LEFT ||
        o === ScreenOrientation.Orientation.LANDSCAPE_RIGHT
      ) {
        if (!isFullscreenRef.current && videoViewRef.current) {
          videoViewRef.current.enterFullscreen();
        }
      }
    });

    return () => {
      ScreenOrientation.removeOrientationChangeListener(subscription);
      ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT_UP);
    };
  }, []);

  // Intercept Android hardware back button to close player instead of exiting app
  useEffect(() => {
    if (!currentChannel) return;
    const subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      if (isFullscreenRef.current && videoViewRef.current) {
        videoViewRef.current.exitFullscreen();
        return true;
      }
      playChannel(null);
      return true; // returning true prevents default back behavior (exiting app)
    });
    return () => subscription.remove();
  }, [currentChannel, playChannel]);

  if (!currentChannel) return null;

  return (
    <View style={styles.container}>
      <VideoView
        ref={videoViewRef}
        style={styles.video}
        player={player}
        fullscreenOptions={{
          enable: true,
          orientation: 'landscape'
        }}
        allowsPictureInPicture
        nativeControls
        contentFit="contain"
        onFullscreenEnter={() => { isFullscreenRef.current = true; }}
        onFullscreenExit={() => { isFullscreenRef.current = false; }}
      />
      {/* Floating Header */}
      <View style={styles.header}>
        <Pressable onPress={() => playChannel(null)} style={styles.closeButton}>
          <XIcon color="#fff" size={24} />
        </Pressable>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {currentChannel.name}
          </Text>
          {currentChannel.isHD && (
            <View style={styles.hdBadge}>
              <Text style={styles.hdText}>HD</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...(StyleSheet.absoluteFill as any),
    backgroundColor: '#000',
    zIndex: 999,
  },
  video: {
    width: width,
    height: height,
    backgroundColor: '#000',
  },
  header: {
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  closeButton: {
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  headerTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
    maxWidth: '80%',
  },
  hdBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hdText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
  },
});