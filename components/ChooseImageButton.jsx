import { TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

const ChooseImageButton = ({ setPickedImage }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className="flex justify-center items-center absolute bottom-0 right-5 bg-blue-200 rounded-full h-[50px] w-[50px]"
      onPress={() => {
        navigation.navigate("Image Options", { setPickedImage });
      }}
    >
      <FontAwesome5 name="camera" size={25} color="black" />
    </TouchableOpacity>
  );
};

export default ChooseImageButton;
