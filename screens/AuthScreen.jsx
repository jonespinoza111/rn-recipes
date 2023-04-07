import { View, ScrollView } from 'react-native'
import React, { useState } from 'react'
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';

const AuthScreen = () => {
    const [authForm, setAuthForm] = useState("Log In");
    const switchForm = () => {
        let newForm = (authForm === "Log In") ? "Sign Up" : "Log In";
        setAuthForm(newForm);
    };
  return (
    <View className="flex flex-1 justify-center items-center bg-white px-[30px]">
        <ScrollView className="w-[100%]" contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }} >
            {authForm === "Log In" ? <LoginForm switchForm={switchForm} /> : <SignUpForm switchForm={switchForm} />}
        </ScrollView>
    </View>
  )
}

export default AuthScreen;