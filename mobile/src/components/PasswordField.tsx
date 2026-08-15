import { Pressable } from "react-native";
import { TextField, TextFieldProps } from "./TextField";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../constants/theme";
import { styles } from "./styles";

type PasswordFieldProps = Omit<TextFieldProps, 'secureTextEntry'> & {
  secure: boolean;
  onToggleSecure: () => void;
};

export function PasswordField({
  secure,
  onToggleSecure,
  ...props
}: PasswordFieldProps) {
  return (
    <TextField
      {...props}
      secureTextEntry={secure}
      rightAccessory={
        <Pressable
          accessibilityLabel={secure ? 'Show password' : 'Hide password'}
          accessibilityRole="button"
          hitSlop={10}
          onPress={onToggleSecure}
          style={styles.eyeButton}
        >
          <Ionicons
            color={colors.muted}
            name={secure ? 'eye-outline' : 'eye-off-outline'}
            size={21}
          />
        </Pressable>
      }
    />
  );
}