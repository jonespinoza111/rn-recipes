import { View, Modal, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import DinnerDishes from "../assets/images/dinner-dishes.jpg";
import CustomText from "./CustomText";

const GetStartedModal = () => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setModalVisible(!modalVisible);
      }}
    >
      <View className="w-[100%] h-[100%] bg-black">
        <Image source={DinnerDishes} className="w-[100%] h-[100%]" />
        <View className="get-started-cover absolute flex h-[100%] w-[100%] justify-end pb-[100px] items-center bg-[#00000096]">
          <CustomText
            font="dm-bold"
            styles="text-white font-semibold text-[35px] w-[300px]"
            text="Are you ready to try new recipes?"
          />
          <CustomText
            styles="text-white font-light text-[20px] w-[300px]"
            text="Browse all the recipes you can think of"
          />
          <TouchableOpacity
            className="w-[80%] flex justify-center items-center"
            onPress={() => setModalVisible(!modalVisible)}
          >
            <View className="flex mt-[20px] justify-center items-center bg-green-300 rounded-3xl h-[50px] w-[100%]">
              <CustomText
                styles="text-black font-bold text-[20px]"
                text="Get Started"
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default GetStartedModal;
