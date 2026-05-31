import React from 'react';
import { StyleSheet, View, Text, Pressable, Dimensions } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { X } from 'lucide-react-native';
import { useLiveTVStore } from '../store/useLiveTVStore';

const XIcon = X as any;

const { width, height } = Dimensions.get('window');

export function VideoPlayer() {
  const { currentChannel, playChannel } = useLiveTVStore();

  const player = useVideoPlayer(currentChannel?.url || '', (player) => {
    player.loop = false;
    player.play();
  });

  if (!currentChannel) return null;

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        fullscreenOptions={{
          enable: true,
          orientation: 'landscape'
        }}
        allowsPictureInPicture
        nativeControls
        contentFit="contain"
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

