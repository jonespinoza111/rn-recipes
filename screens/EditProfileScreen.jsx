import { View, Text, ScrollView, ImageBackground, TextInput } from 'react-native'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import ChooseImageButton from '../components/ChooseImageButton';
import * as yup from "yup";
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import CustomButton from '../components/CustomButton';

const schema = yup.object().shape({
    name: yup.string().required("You must enter a name").min(6),
    email: yup
        .string()
        .required("An email is required")
        .email("Email must be a valid email"),
    description: yup.string().max(255, "Your description is too long"),
});

const EditProfileScreen = ({ navigation }) => {
    const userData = useSelector((state) => state.userData);
    const dispatch = useDispatch();

    const { control, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });


    const [isNameChanged, setIsNameChanged] = useState(false);
    const [isDescChanged, setIsDescChanged] = useState(false);
    const [isContactChanged, setIsContactChanged] = useState(false);

    const [pickedImage, setPickedImage] = useState(userData.profileImage);


    const onSubmit = () => {
        console.log('submitting profile updates form now');
    }
  return (
    <View className="flex-1 flex justify-start items-center bg-white">
        <ScrollView className="w-[100%]">
            <View className="flex justify-center items-center w-[100%] h-min-[200px] py-[20px] bg-[#000000b3]">
                <ImageBackground
                    className="w-[150px] h-[150px]"
                    resizeMode="cover"
                    imageStyle={{ borderRadius: 75 }}
                    source={{
                        uri: pickedImage,
                    }}
                >
                    <ChooseImageButton setPickedImage={setPickedImage} />
                </ImageBackground>
            </View>
            <View className="w-[100%] h-auto flex items-start bg-white px-[30px] py-[20px]">
                <View className="flex justify-start w-[100%] mb-[10px]">
                    <Text className="text-[14px] mb-[5px]">Name</Text>
                    <Controller
                        name="name"
                        defaultValue={userData.name}
                        control={control}
                        className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                                onChangeText={(value) => {
                                    console.log(
                                        "This is the value in this",
                                        value
                                    );
                                    onChange(value);
                                    setIsNameChanged(
                                        value !== userData.name
                                    );
                                }}
                                value={value}
                            />
                        )}
                    />
                </View>
                <View className="flex justify-start w-[100%] mb-[10px]">
                    <Text className="text-[14px] mb-[5px]">Description</Text>
                    <Controller
                        name="description"
                        defaultValue={userData.description}
                        control={control}
                        className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                                onChangeText={(value) => {
                                    console.log(
                                        "This is the value in this",
                                        value
                                    );
                                    onChange(value);
                                    setIsDescChanged(
                                        value !== userData.description
                                    );
                                }}
                                value={value}
                            />
                        )}
                    />
                </View>
                <View className="flex justify-start w-[100%] mb-[10px]">
                    <Text className="text-[14px] mb-[5px]">
                        Contact Information
                    </Text>
                    <Controller
                        name="email"
                        defaultValue={userData.email}
                        control={control}
                        className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                        render={({ field: { onChange, value } }) => (
                            <TextInput
                                className="border-1 w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                                onChangeText={(value) => {
                                    console.log(
                                        "This is the value in this",
                                        value
                                    );
                                    onChange(value);
                                    setIsContactChanged(
                                        value !== userData.email
                                    );
                                }}
                                value={value}
                            />
                        )}
                    />
                </View>
                <CustomButton
                    title="Update"
                    onPress={handleSubmit(onSubmit)}
                    buttonColor="bg-blue-200"
                    disabled={
                        !isNameChanged &&
                        !isContactChanged &&
                        !isDescChanged &&
                        userData.profileImage === pickedImage
                    }
                    textColor="black"
                />
            </View>
        </ScrollView>
    </View>
  )
}

export default EditProfileScreen;