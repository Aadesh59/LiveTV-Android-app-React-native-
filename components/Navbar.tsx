import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { Tv, Search } from 'lucide-react-native';
import { useLiveTVStore } from '../store/useLiveTVStore';

const TvIcon = Tv as any;
const SearchIcon = Search as any;

export function Navbar() {
  const { searchTerm, setSearchTerm } = useLiveTVStore();

  return (
    <View style={styles.header}>
      <View style={styles.brandContainer}>
        <TvIcon color="#dc2626" size={24} />
        <Text style={styles.brandText}>
          tedey<Text style={styles.redText}>TV</Text>
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchIcon color="#71717a" size={16} style={styles.searchIcon} />
        <TextInput
          placeholder="Search channels..."
          placeholderTextColor="#71717a"
          value={searchTerm}
          onChangeText={setSearchTerm}
          style={styles.searchInput}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#09090b',
    borderBottomWidth: 1,
    borderBottomColor: '#27272a',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    gap: 12,
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  brandText: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: -0.5,
  },
  redText: {
    color: '#dc2626',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#18181b',
    borderRadius: 24,
    paddingHorizontal: 12,
    height: 40,
    borderWidth: 1,
    borderColor: '#27272a',
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#f4f4f5',
    fontSize: 14,
    height: '100%',
  },
});
