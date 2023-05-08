import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import CustomButton from './CustomButton';
import * as yup from "yup";
import * as WebBrowser from 'expo-web-browser';
import { yupResolver } from '@hookform/resolvers/yup';
import GoogleSignInButton from './GoogleSignInButton';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../helpers/Firebase';

const schema = yup.object().shape({
  email: yup
      .string()
      .required("An email is required")
      .email("Email must be a valid email"),
  password: yup
      .string()
      .required("A password is required")
      .min(6, "Your password must be at least 6 charcters"),
});

WebBrowser.maybeCompleteAuthSession();


const LoginForm = ({ switchForm }) => {

  const { control, handleSubmit, formState:{ errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    try {   

            signInWithEmailAndPassword(auth, data.email, data.password)
            .then((user) => console.log("This is the signedin user", user))
            .catch((err) =>
                console.log("There was an error signing in ", err)
            );
    } catch (err) {
        console.log("There was an error signing in", err);
    }
  };

  console.log("These are the errors in the login form", errors);
  return (
    <View className="w-[100%] h-auto flex items-start px-[30px] pb-[20px]">
          <Text className="text-[20px] my-[20px]">Login</Text>
          <View className="flex justify-start w-[100%] mb-[20px]">
              <Text className="text-[14px] mb-[5px]">Email</Text>
              <Controller
                  name="email"
                  defaultValue=""
                  control={control}
                  className="border-1 rounded-sm w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                  render={({ field: { onChange, value } }) => (
                      <TextInput
                          className="border-1 rounded-sm w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          keyboardType="email-address"
                          returnKeyLabel="next"
                      />
                  )}
              />
              {errors && errors.email && (
                  <Text className="mt-[2px] text-[#d34d4d]">{errors.email.message}</Text>
              )}
          </View>
          <View className="flex justify-start w-[100%] mb-[20px]">
              <Text className="text-[14px] mb-[5px]">Password</Text>
              <Controller
                  name="password"
                  defaultValue=""
                  control={control}
                  render={({ field: { onChange, value } }) => (
                      <TextInput
                          className="border-1 rounded-sm w-[100%] pl-[10px] bg-[#ece8e8] border-[#dddddd]"
                          onChangeText={(value) => onChange(value)}
                          value={value}
                          secureTextEntry={true}
                      />
                  )}
              />
              {errors && errors.password && (
                  <Text className="mt-[2px] text-[#d34d4d]">
                      {errors.password.message}
                  </Text>
              )}
          </View>
          <CustomButton
              title="Login"
              onPress={handleSubmit(onSubmit)}
              buttonColor="bg-blue-200"
              textColor="text-black"
          />
          <GoogleSignInButton />
          {/* <CustomButton title="Login" onPress={handleSubmit(onSubmit)} buttonColor="black" textColor="white" /> */}
          <TouchableOpacity className="flex justify-center items-center w-[100%] mt-[15px]" onPress={switchForm}>
              <Text className="text-[#2e82b6]">
                  No account? Sign up instead
              </Text>
          </TouchableOpacity>
      </View>
  )
}

export default LoginForm;