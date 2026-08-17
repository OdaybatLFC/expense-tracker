import { StyleSheet } from "react-native";
import { colors, radius, spacing } from "../constants/theme";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: radius.pill,
    height: 56,
    justifyContent: 'center',
    width: '100%',
  },

  lightButton: {
    backgroundColor: colors.white,
  },

  disabledButton: {
    opacity: 0.55,
  },

  pressedButton: {
    opacity: 0.82,
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },

  lightButtonText: {
    color: colors.text,
  },

  fieldWrapper: {
    width: '100%',
  },

  labelRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.sm,
  },

  label: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.8,
  },

  inputContainer: {
    alignItems: 'center',
    backgroundColor: colors.input,
    borderColor: 'transparent',
    borderRadius: radius.md,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 52,
    paddingHorizontal: spacing.md,
  },

  inputFocused: {
    backgroundColor: colors.white,
    borderColor: colors.primary,
  },

  inputError: {
    borderColor: colors.danger,
  },

  input: {
    color: colors.text,
    flex: 1,
    fontSize: 16,
    minHeight: 50,
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  eyeButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.sm,
  },

  errorText: {
    color: colors.danger,
    fontSize: 12,
    marginTop: spacing.xs,
  },

  backButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    flexDirection: 'row',
    gap: spacing.sm,
  },

  pressedBackButton: {
    opacity: 0.6,
  },

  backText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '500',
  },

  footerPrompt: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.lg,
  },

  footerText: {
    color: colors.muted,
    fontSize: 14,
  },

  footerLink: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
});

export const uiStyles = StyleSheet.create({
  authScroll: {
    flexGrow: 1,
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.md,
  },

  authHeader: {
    marginTop: spacing.xl,
  },

  authTitle: {
    color: colors.text,
    fontSize: 30,
    fontWeight: '700',
    letterSpacing: -0.7,
  },

  authSubtitle: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
    marginTop: spacing.sm,
  },

  form: {
    gap: spacing.md,
    marginTop: spacing.xxl,
  },

  formError: {
    backgroundColor: '#FEF2F2',
    borderRadius: radius.md,
    color: colors.danger,
    fontSize: 13,
    lineHeight: 19,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },

  bottomActions: {
    marginTop: 'auto',
    paddingTop: spacing.xxl,
  },
});