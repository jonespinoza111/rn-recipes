import { View, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import SignUpForm from "../components/SignUpForm";
import LoginForm from "../components/LoginForm";
import BreakfastImage from "../assets/images/breakfast-image.jpg";
import FrenchCuisine from "../assets/images/french-cuisine.jpg";
import GreekCuisine from "../assets/images/greek-cuisine.jpg";
import LatinCuisine from "../assets/images/latin-american-cuisine.jpg";
import MexicanCuisine from "../assets/images/mexican-cuisine.jpg";
import AfricanCuisine from "../assets/images/african-cuisine.jpg";
import JapaneseCuisine from "../assets/images/japanese-cuisine.jpg";

const AuthScreen = () => {
  const [authForm, setAuthForm] = useState("Log In");
  const switchForm = () => {
    let newForm = authForm === "Log In" ? "Sign Up" : "Log In";
    setAuthForm(newForm);
  };
  return (
    <View className="flex flex-1 justify-center items-center bg-white pt-[50px]">
      <View className="bg-white w-[150%] gap-x-3 gap-y-3 flex flex-row justify-center flex-wrap h-auto">
        {[
          FrenchCuisine,
          BreakfastImage,
          AfricanCuisine,
          MexicanCuisine,
          LatinCuisine,
          GreekCuisine,
          JapaneseCuisine,
        ].map((el, index) => (
          <Image
            key={index}
            className="w-[125px] h-[155px] rounded-2xl"
            source={el}
          />
        ))}
      </View>
      <ScrollView
        className="w-[100%] px-[30px]"
        contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
      >
        {authForm === "Log In" ? (
          <LoginForm switchForm={switchForm} />
        ) : (
          <SignUpForm switchForm={switchForm} />
        )}
      </ScrollView>
    </View>
  );
};

export default AuthScreen;
