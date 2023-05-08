import { Text, TouchableOpacity, Image } from 'react-native'
import React, { useState, useEffect } from 'react'

import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { onSignIn } from '../helpers/AuthFunctions';
import { useDispatch } from 'react-redux';



const GoogleSignInButton = () => {
    const dispatch = useDispatch();
    const [token, setToken] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    const [request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: '1013397994510-puc880cv1lc37t11pe7hfr60hd07l13g.apps.googleusercontent.com'
    });

    useEffect(() => {
        if (response?.type === "success") {
            console.log('very very successful');
            setToken(response.authentication.accessToken);
            getUserInfo();
        }
    }, [response, token]);

    const getUserInfo = async () => {
        try {
          const response = await fetch(
            "https://www.googleapis.com/userinfo/v2/me",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          
          const user = await response.json();
          console.log('get user info response ,', user);
        //   setUserInfo(user);
          onSignIn(user, token, dispatch);
        } catch (error) {
          // Add your own error handler here
        }
    };
  return (
    <TouchableOpacity className="flex flex-row justify-start items-center bg-white text-[#444] w-[100%] h-auto rounded-sm border-[1px] border-[#888] mt-[10px]" onPress={() => { promptAsync() }}>
            <Image
                className="bg-transparent w-[42px] h-[42px] object-fill"
                source={require("../assets/images/btn_google_light_normal_hdpi.9.png")}
            />
            <Text className="px-[22px] text-[14px] font-bold">Sign in with Google</Text>
    </TouchableOpacity>
  )
}

export default GoogleSignInButton;