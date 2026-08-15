import { ReactNode, useState } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";
import { styles } from "./styles";
import { colors } from "../constants/theme";

export type TextFieldProps = TextInputProps & {
  label: string;
  error?: string;
  rightAccessory?: ReactNode;
  labelAccessory?: ReactNode;
};

export function TextField({
  label,
  error,
  rightAccessory,
  labelAccessory,
  style,
  onFocus,
  onBlur,
  ...inputProps
}: TextFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.fieldWrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {labelAccessory}
      </View>

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputFocused,
          Boolean(error) && styles.inputError,
        ]}
      >
        <TextInput
          {...inputProps}
          placeholderTextColor={colors.placeholder}
          style={[styles.input, style]}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
        />

        {rightAccessory}
      </View>

      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
}