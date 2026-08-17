import { Pressable, Text } from "react-native";
import { styles } from "./styles";
import { colors } from "../constants/theme";
import { Ionicons } from "@expo/vector-icons";

type BackButtonProps = {
  onPress: () => void;
};

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <Pressable
      accessibilityLabel="Go back"
      accessibilityRole="button"
      hitSlop={10}
      onPress={onPress}
      style={({ pressed }) => [
        styles.backButton,
        pressed && styles.pressedBackButton,
      ]}
    >
      <Ionicons color={colors.text} name="arrow-back" size={19} />
      <Text style={styles.backText}>Back</Text>
    </Pressable>
  );
}