import { ActivityIndicator, Pressable, Text } from "react-native";
import { colors } from "../constants/theme";
import { styles } from "./styles";

interface PrimaryButtonProps  {
  title: string;
  onPress: () => void;
  loading?: boolean;
  disabled?: boolean;
  light?: boolean;
};

export function PrimaryButton({
  title,
  onPress,
  loading = false,
  disabled = false,
  light = false,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      disabled={isDisabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.primaryButton,
        light && styles.lightButton,
        isDisabled && styles.disabledButton,
        pressed && !isDisabled && styles.pressedButton,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={light ? colors.text : colors.white}
        />
      ) : (
        <Text
          style={[
            styles.primaryButtonText,
            light && styles.lightButtonText,
          ]}
        >
          {title}
        </Text>
      )}
    </Pressable>
  );
}
