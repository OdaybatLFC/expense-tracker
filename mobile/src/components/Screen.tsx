import { ReactNode } from "react";
import { colors } from "../constants/theme";
import { StyleProp, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "./styles";

interface ScreenProps  {
  children: ReactNode;
  backgroundColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  backgroundColor = colors.white,
  style,
}: ScreenProps) {
  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.screen, { backgroundColor }, style]}
    >
      {children}
    </SafeAreaView>
  );
}