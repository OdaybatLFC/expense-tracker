import { Pressable, Text, View } from "react-native";
import { styles } from "./styles";

type FooterPromptProps = {
  prefix: string;
  linkText: string;
  onPress: () => void;
};

export function FooterPrompt({
  prefix,
  linkText,
  onPress,
}: FooterPromptProps) {
  return (
    <View style={styles.footerPrompt}>
      <Text style={styles.footerText}>{prefix} </Text>

      <Pressable
        accessibilityRole="link"
        hitSlop={8}
        onPress={onPress}
      >
        <Text style={styles.footerLink}>{linkText}</Text>
      </Pressable>
    </View>
  );
}