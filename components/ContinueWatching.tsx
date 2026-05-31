import React from "react";
import { StyleSheet, View, Text, ScrollView, Pressable } from "react-native";
import { Clock } from "lucide-react-native";
import { Image } from "expo-image";
import { useLiveTVStore } from "../store/useLiveTVStore";

const ClockIcon = Clock as any;

export function ContinueWatching() {
  const { recentlyWatched, playChannel } = useLiveTVStore();

  if (recentlyWatched.length === 0) return null;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <ClockIcon color="#dc2626" size={18} />
        <Text style={styles.titleText}>Continue Watching</Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recentlyWatched.map((channel) => (
          <Pressable
            key={`recent-${channel.id}`}
            onPress={() => playChannel(channel)}
            style={({ pressed }) => [
              styles.item,
              pressed && styles.itemPressed,
            ]}
          >
            <View style={styles.logoContainer}>
              <Image
                source={{ uri: channel.logo }}
                style={styles.logo}
                contentFit="contain"
              />
            </View>
            <Text style={styles.nameText} numberOfLines={1}>
              {channel.name}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#27272a",
    backgroundColor: "#09090b",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  titleText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  item: {
    width: 140,
    backgroundColor: "#18181b",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#27272a",
    padding: 8,
    alignItems: "center",
  },
  itemPressed: {
    transform: [{ scale: 0.97 }],
    borderColor: "#dc2626",
  },
  logoContainer: {
    width: "100%",
    aspectRatio: 16 / 9,
    backgroundColor: "#09090b",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  logo: {
    width: "80%",
    height: "80%",
  },
  nameText: {
    color: "#f4f4f5",
    fontSize: 12,
    fontWeight: "600",
    textAlign: "center",
    width: "100%",
  },
});
