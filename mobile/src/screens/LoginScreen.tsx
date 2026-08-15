import { useState } from "react";
import { Alert} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("basic");

  const handleLogin = () => {
    if (!email.trim()) {
      Alert.alert("Missing field", "Please enter your email.");
      return;
    }
  };

  return (
    <SafeAreaView>
      
    </SafeAreaView>
  );
}