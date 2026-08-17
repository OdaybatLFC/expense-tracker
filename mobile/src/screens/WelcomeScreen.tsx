import React from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Screen } from '../components/Screen';
import { colors, radius, spacing } from '../constants/theme';
import { PrimaryButton } from '../components/PrimaryButton';
import { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export function WelcomeScreen({ navigation }: Props) {
  return (
    <Screen
      backgroundColor={colors.primary}
      style={styles.screen}
    >
      <View style={styles.content}>
        <View style={styles.hero}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoSymbol}>$</Text>
          </View>

          <Text style={styles.title}>Track your money, simply.</Text>

          <Text style={styles.description}>
            Manual expense tracking with iPhone Shortcut support.
            No bank connections. Just clarity.
          </Text>
        </View>

        <View style={styles.actions}>
          <PrimaryButton
            light
            title="Create free account"
            onPress={() => navigation.navigate('Register')}
          />

          <Pressable
            accessibilityRole="button"
            onPress={() => navigation.navigate('SignIn')}
            style={({ pressed }) => [
              styles.signInButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.signInText}>Sign in</Text>
          </Pressable>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingHorizontal: spacing.lg,
  },

  content: {
    flex: 1,
    justifyContent: 'space-between',
  },

  hero: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 30,
  },

  logoContainer: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: radius.md,
    height: 68,
    justifyContent: 'center',
    marginBottom: spacing.xl,
    width: 68,
  },

  logoSymbol: {
    color: colors.primary,
    fontSize: 35,
    fontWeight: '800',
  },

  title: {
    color: colors.white,
    fontSize: 31,
    fontWeight: '700',
    letterSpacing: -0.8,
    textAlign: 'center',
  },

  description: {
    color: 'rgba(255, 255, 255, 0.78)',
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.md,
    maxWidth: 310,
    textAlign: 'center',
  },

  actions: {
    gap: spacing.md,
    paddingBottom: spacing.sm,
  },

  signInButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.16)',
    borderColor: 'rgba(255, 255, 255, 0.28)',
    borderRadius: radius.pill,
    borderWidth: 1,
    height: 56,
    justifyContent: 'center',
  },

  signInText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  pressed: {
    opacity: 0.75,
  },
});