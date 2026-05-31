import React from 'react';
import { StyleSheet, View, Text, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Play, Heart } from 'lucide-react-native';
import { Channel } from '../types';
import { useLiveTVStore } from '../store/useLiveTVStore';

const PlayIcon = Play as any;
const HeartIcon = Heart as any;

interface ChannelCardProps {
  channel: Channel;
}

export function ChannelCard({ channel }: ChannelCardProps) {
  const { playChannel, toggleFavorite, favorites } = useLiveTVStore();
  const isFavorite = favorites.includes(channel.id);

  return (
    <Pressable
      onPress={() => playChannel(channel)}
      style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: channel.logo }}
          style={styles.logo}
          contentFit="contain"
          transition={200}
        />
        
        {/* Play Overlay Icon (Subtle) */}
        <View style={styles.playOverlay}>
          <View style={styles.playButton}>
            <PlayIcon color="#fff" size={16} fill="#fff" style={styles.playIcon} />
          </View>
        </View>

        {/* Badges */}
        <View style={styles.badgesContainer}>
          <View style={styles.liveBadge}>
            <Text style={styles.liveText}>LIVE</Text>
          </View>
          {channel.isHD && (
            <View style={styles.hdBadge}>
              <Text style={styles.hdText}>HD</Text>
            </View>
          )}
        </View>

        {/* Favorite Icon */}
        <Pressable
          onPress={() => toggleFavorite(channel.id)}
          style={styles.favButton}
          hitSlop={8}
        >
          <HeartIcon
            color={isFavorite ? '#ef4444' : '#a1a1aa'}
            fill={isFavorite ? '#ef4444' : 'transparent'}
            size={16}
          />
        </Pressable>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.name} numberOfLines={1}>
          {channel.name}
        </Text>
        <Text style={styles.category}>{channel.category}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#18181b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#27272a',
    overflow: 'hidden',
    marginBottom: 12,
    flex: 1,
  },
  cardPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
    borderColor: '#ef4444',
  },
  imageContainer: {
    aspectRatio: 16 / 9,
    backgroundColor: '#09090b',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: '75%',
    height: '75%',
  },
  playOverlay: {
    ...(StyleSheet.absoluteFill as any),
    backgroundColor: 'rgba(0, 0, 0, 0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    backgroundColor: '#dc2626',
    borderRadius: 20,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#dc2626',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 4,
  },
  playIcon: {
    marginLeft: 2,
  },
  badgesContainer: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    gap: 4,
  },
  liveBadge: {
    backgroundColor: '#dc2626',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  liveText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0.5,
  },
  hdBadge: {
    backgroundColor: 'rgba(9, 9, 11, 0.65)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  hdText: {
    color: '#fff',
    fontSize: 9,
    fontWeight: 'bold',
  },
  favButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(9, 9, 11, 0.65)',
    padding: 6,
    borderRadius: 16,
  },
  infoContainer: {
    padding: 10,
  },
  name: {
    color: '#f4f4f5',
    fontSize: 14,
    fontWeight: 'bold',
  },
  category: {
    color: '#71717a',
    fontSize: 11,
    marginTop: 2,
  },
});
