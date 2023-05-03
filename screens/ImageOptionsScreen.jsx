import { View, Alert, Text } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/CustomButton';
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native';

const ImageOptionsScreen = ({ route }) => {
    const { setPickedImage } = route.params;
    const navigation = useNavigation();

    const [status, requestPermission] = ImagePicker.useCameraPermissions();

    const openCamera = async () => {
        console.log('opening camera ', status);
        try {
            let image = await ImagePicker.launchCameraAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                aspect: [4, 3],
                quality: 1
            });

            console.log('new image takenv ', image);
        } catch (err) {
            console.log("can't open camera because ", err);
        }

    }

    const selectImageHandler = async (type) => {
        console.log('this is the status my dude', status);
        try {
            if (!status) return;
            let image;
            if (type === "camera") {
                const { status: existingStatus } = await ImagePicker.getCameraPermissionsAsync();
                console.log('trying to open camera');

                if (existingStatus) {
                    console.log('nice');
                }
                image = await ImagePicker.launchCameraAsync({
                    mediaTypes: ImagePicker.MediaTypeOptions.Images,
                    allowsEditing: true,
                    base64: false,
                    aspect: [4, 3],
                    quality: 0.5
                });
                console.log('dude man', image);
            } else if (type === "library") {
                image = await ImagePicker.launchImageLibraryAsync({
                    allowsEditing: true,
                    aspect: [4, 3],
                    quality: 0.5
                });
            }

            if (!image.canceled) {
                console.log("cancelled");
                setPickedImage(image && image.uri);
            }

            navigation.goBack();
        } catch (err) {
            console.log('error choosing image', err);
        }
    };

    // if (!permission) {
    //     console.log('domino');
    //     return (
    //         <View className="bg-black w-[100%]">
    //             <Text className="text-black">What are you doing here?</Text>
    //         </View>
    //     )
    // }

    if (status && !status.granted) {
        console.log('candy');
        return (
            <View className="bg-white w-[100%]">
                <Text style={{ textAlign: 'center' }}>We need permission to use the camera.</Text>
                <CustomButton title="Grant Permission" onPress={requestPermission} />
            </View>
        )
    }
  return (
    <View className="flex flex-1 px-[10%] pt-[10px] justify-start items-center bg-white" >
        <CustomButton title="Take new photo" onPress={() => openCamera()} buttonColor="bg-blue-200" textColor="text-black" />
        <CustomButton title="Choose photo" onPress={() => selectImageHandler('library')} buttonColor="bg-blue-200" textColor="text-black" />
    </View>
  )
}

export default ImageOptionsScreen;