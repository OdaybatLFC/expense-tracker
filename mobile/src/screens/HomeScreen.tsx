import { useEffect, useState } from "react";
import { Text } from "react-native";
import { getHealth } from "../api/healthApi";
import { SafeAreaView } from "react-native-safe-area-context";

export default function HomeScreen() {
  const [status, setStatus] = useState("Loading...");

  useEffect(() => {
    getHealth()
      .then(setStatus)
      .catch((error) => {
        console.log(error);
        console.error(error);
        setStatus("Connection failed");
      });
  }, []);

  return (
    <SafeAreaView>
      <Text>{status}</Text>
    </SafeAreaView>
  );
}
