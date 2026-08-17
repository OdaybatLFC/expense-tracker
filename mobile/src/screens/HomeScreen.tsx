import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useAuth } from "../auth/AuthContext";
import { Screen } from "../components/Screen";
import { colors } from "../constants/theme";

export function HomeScreen() {
  const { user, signOut } = useAuth();

  return (
    <Screen>
      <View style={styles.container}>
        <Text style={styles.title}>Welcome back</Text>

        <Text style={styles.email}>{user?.email}</Text>

        <Text style={styles.role}>Role: {user?.role}</Text>

        {/* Add a reusable secondary button here if needed */}
        <Text style={styles.logout} onPress={signOut}>
          Sign out
        </Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },

  title: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "700",
  },

  email: {
    color: colors.muted,
    fontSize: 15,
    marginTop: 12,
  },

  role: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 8,
  },

  logout: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "600",
    marginTop: 32,
  },
});
