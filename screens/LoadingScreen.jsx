import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const LoadingScreen = () => {
  return (
    <View className="flex-1 bg-white justify-center items-center">
      <ActivityIndicator size="large" />
    </View>
  );
};

export default LoadingScreen;
