import React from 'react';
import { StyleSheet, ScrollView, Pressable, Text, View } from 'react-native';
import { useLiveTVStore } from '../store/useLiveTVStore';
import { channels } from '../data/channels';

// Extract unique categories, adding 'All' and 'Favorites'
const getCategories = () => {
  const cats = Array.from(new Set(channels.map((c) => c.category)));
  return ["All", "Favorites", ...cats];
};

export function CategoryTabs() {
  const { activeCategory, setActiveCategory } = useLiveTVStore();
  const categories = getCategories();

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <Pressable
              key={category}
              onPress={() => setActiveCategory(category)}
              style={[styles.tab, isActive && styles.activeTab]}
            >
              <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {category}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#09090b',
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
    paddingVertical: 12,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#27272a',
  },
  activeTab: {
    backgroundColor: '#dc2626',
  },
  tabText: {
    color: '#a1a1aa',
    fontSize: 13,
    fontWeight: '600',
  },
  activeTabText: {
    color: '#fff',
  },
});
