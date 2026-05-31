import React, { useMemo } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Navbar } from './components/Navbar';
import { CategoryTabs } from './components/CategoryTabs';
import { ContinueWatching } from './components/ContinueWatching';
import { ChannelCard } from './components/ChannelCard';
import { VideoPlayer } from './components/VideoPlayer';
import { channels } from './data/channels';
import { useLiveTVStore } from './store/useLiveTVStore';

export default function App() {
  const { activeCategory, searchTerm, favorites, currentChannel } = useLiveTVStore();

  const filteredChannels = useMemo(() => {
    let result = channels;

    if (activeCategory === 'Favorites') {
      result = channels.filter((c) => favorites.includes(c.id));
    } else if (activeCategory !== 'All') {
      result = channels.filter((c) => c.category === activeCategory);
    }

    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (c) => c.name.toLowerCase().includes(lowerTerm) || c.category.toLowerCase().includes(lowerTerm)
      );
    }

    return result;
  }, [activeCategory, searchTerm, favorites]);

  // ListHeaderComponent contains Navbar, CategoryTabs, and ContinueWatching to scroll together
  const renderHeader = () => (
    <View>
      <Navbar />
      <CategoryTabs />
      {activeCategory === 'All' && !searchTerm && <ContinueWatching />}
      
      <View style={styles.listHeader}>
        <Text style={styles.headerTitle}>
          {searchTerm
            ? `Search: "${searchTerm}"`
            : activeCategory === 'Favorites'
            ? 'Your Favorites'
            : `${activeCategory} Channels`}
        </Text>
        <Text style={styles.countText}>{filteredChannels.length} channels</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <StatusBar style="light" />
        <View style={styles.container}>
          <FlatList
            data={filteredChannels}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.cardWrapper}>
                <ChannelCard channel={item} />
              </View>
            )}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            ListHeaderComponent={renderHeader}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No channels found</Text>
              </View>
            }
          />

          {/* Floating Native Fullscreen Video Player */}
          {currentChannel && <VideoPlayer />}
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  container: {
    flex: 1,
    backgroundColor: '#09090b',
  },
  listContent: {
    paddingBottom: 24,
  },
  columnWrapper: {
    paddingHorizontal: 12,
    justifyContent: 'space-between',
    gap: 12,
  },
  cardWrapper: {
    flex: 0.5,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  countText: {
    fontSize: 12,
    color: '#71717a',
  },
  emptyContainer: {
    padding: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    color: '#71717a',
    fontSize: 14,
  },
});
