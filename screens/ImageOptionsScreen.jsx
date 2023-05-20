import { View } from "react-native";
import React from "react";
import CustomButton from "../components/CustomButton";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import CustomText from "../components/CustomText";

const ImageOptionsScreen = ({ route }) => {
  const { setPickedImage } = route.params;
  const navigation = useNavigation();

  const [status, requestPermission] = ImagePicker.useCameraPermissions();

  const selectImageHandler = async (type) => {
    try {
      if (!status) return;
      let image;
      if (type === "library") {
        image = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.5,
        });
      }

      if (!image.canceled) {
        setPickedImage(image && image.assets[0].uri);
      }

      navigation.goBack();
    } catch (err) {
      console.log("error choosing image", err);
    }
  };

  if (status && !status.granted) {
    return (
      <View className="bg-white w-[100%] h-[100%] py-[15px] flex-column items-center">
        <CustomText
          styles="text-center"
          text="We need permission to use the camera."
        />
        <View className="flex justify-center items-center w-[90%]">
          <CustomButton
            title="Grant Permission"
            buttonColor="bg-blue-200"
            textColor="text-black"
            onPress={requestPermission}
          />
        </View>
      </View>
    );
  }
  return (
    <View className="flex flex-1 px-[10%] pt-[10px] justify-start items-center bg-white">
      <CustomButton
        title="Choose photo"
        onPress={() => selectImageHandler("library")}
        buttonColor="bg-blue-200"
        textColor="text-black"
      />
    </View>
  );
};

export default ImageOptionsScreen;
