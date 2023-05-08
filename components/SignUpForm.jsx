import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import CustomButton from './CustomButton';

import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch } from 'react-redux';
import { createDatabaseUser } from '../helpers/AuthFunctions';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../helpers/Firebase';

const schema = yup.object().shape({
    name: yup.string().required("You must enter a name"),
    email: yup
        .string()
        .required("An email is required")
        .email("Email must be a valid email"),
    password: yup
        .string()
        .required("A password is required")
        .min(6, "Your password must be at least 6 characters"),
    confirmPassword: yup
        .string()
        .required("Confirm your password")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
});

const SignUpForm = ({ switchForm }) => {
    const dispatch = useDispatch();
    const { control, handleSubmit, formState:{ errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        try {
            console.log('here is the data', data);
            
            await createUserWithEmailAndPassword(auth, data.email, data.password)
                .then(async (newUser) => {
                    console.log('hello here here rhera');
                    console.log('newuser.user.uid  ', newUser.user.uid);
                    createDatabaseUser(newUser.user.uid, data, dispatch);
                })
                .catch((err) =>
                    console.log("There was an error creating a new user", err)
                );
        } catch (err) {
            console.log("auth error", err);
        }
    };

  return (
    <View className="w-[100%] h-auto flex items-start bg-white px-[30px] pb-[20px]">
        <Text className="text-[20px] my-[20px]">Sign Up</Text>
        <View className="flex justify-start w-[100%] mb-[10px]">
            <Text className="text-[14px] mb-[5px]">Full Name</Text>
            <Controller
                name="name"
                defaultValue=""
                control={control}
                className="w-[100%] bg-[#ece8e8] border-[#dddddd] border-1 rounded-sm pl-[10px]"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        className="w-[100%] bg-[#ece8e8] border-[#dddddd] border-1 rounded-sm pl-[10px]"
                        onChangeText={(value) => {
                            console.log("This is the value in this", value);
                            onChange(value);
                        }}
                        value={value}
                    />
                )}
            />
            {errors && errors.name && (
                <Text className="text-[#d34d4d] mt-[2px]">{errors.name.message}</Text>
            )}
        </View>
        <View className="flex justify-start w-[100%] mb-[10px]">
            <Text className="text-[14px] mb-[5px]">Email</Text>
            <Controller
                name="email"
                defaultValue=""
                control={control}
                className="w-[100%] bg-[#ece8e8] border-[#dddddd] border-1 rounded-sm pl-[10px]"
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        className="w-[100%] bg-[#ece8e8] border-[#dddddd] border-1 rounded-sm pl-[10px]"
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        keyboardType="email-address"
                    />
                )}
                rules={{ required: true }}
            />
            {errors && errors.email && (
                <Text className="text-[#d34d4d] mt-[2px]">{errors.email.message}</Text>
            )}
        </View>
        <View className="flex justify-start w-[100%] mb-[10px]">
            <Text className="text-[14px] mb-[5px]">Password</Text>
            <Controller
                name="password"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        className="w-[100%] bg-[#ece8e8] border-[#dddddd] border-1 rounded-sm pl-[10px]"
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        secureTextEntry={true}
                    />
                )}
            />
            {errors && errors.password && (
                <Text className="text-[#d34d4d] mt-[2px]">
                    {errors.password.message}
                </Text>
            )}
        </View>
        <View className="flex justify-start w-[100%] mb-[10px]">
            <Text className="text-[14px] mb-[5px]">Confirm Password</Text>
            <Controller
                name="confirmPassword"
                defaultValue=""
                control={control}
                render={({ field: { onChange, value } }) => (
                    <TextInput
                        className="w-[100%] bg-[#ece8e8] border-[#dddddd] border-1 rounded-sm pl-[10px]"
                        onChangeText={(value) => onChange(value)}
                        value={value}
                        secureTextEntry={true}
                    />
                )}
            />
            {errors && errors.confirmPassword && (
                <Text className="text-[#d34d4d] mt-[2px]">
                    {errors.confirmPassword.message}
                </Text>
            )}
        </View>
        <CustomButton
            title="Create Account"
            onPress={handleSubmit(onSubmit)}
            buttonColor="bg-blue-200"
            textColor="text-black"
        />
        <TouchableOpacity className="flex justify-center items-center mt-[15px] w-[100%]" onPress={switchForm}>
            <Text className="text-[#2e82b6]">
                Already have an account? Login
            </Text>
        </TouchableOpacity>
    </View>
  )
}

export default SignUpForm;