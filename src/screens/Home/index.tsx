import React, { useState, useEffect } from "react";
import { Image, View, Dimensions, Alert, Keyboard } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Control } from "react-hook-form";
import { FormComponent } from "./FormComponent";
import { handleAuth } from "../../composables/handleAuth";

type FormData = {
  login: string;
  password: string;
};

const windowWidth = Dimensions.get("window").width;

// Yup schema
const schema = object().shape({
  login: string().required("Login jest wymagany"),
  password: string().required("Hasło jest wymagane"),
});

// MAIN PAGE
export default function Home({ navigation }: any) {
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      login: "",
      password: "",
    },
  });

  const onKeyboardDidShow = () => {
    setIsKeyboardOpen(true);
  };

  const onKeyboardDidHide = () => {
    setIsKeyboardOpen(false);
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      onKeyboardDidShow
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      onKeyboardDidHide
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    handleAuth(
      data,
      "login",
      () => {
        navigation.navigate("MainMenu");
      },
      () => {
        Alert.alert("Błąd", "Błąd logowania");
      }
    );
  };

  return (
    <Layout
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <Button onPress={navigation.navigate("Blocks")}>DevTool</Button>
      <View
        className="flex self-center h-1/3 py-16"
        style={{
          ...(isKeyboardOpen && {
            display: "none",
          }),
        }}
      >
        <Image
          source={require("../../assets/full_app_logo.png")}
          style={{
            width: windowWidth,
            height: 200,
          }}
          resizeMode="contain"
        />
      </View>
      <View className="flex justify-around h-2/3 mb-24 w-3/4">
        <View>
          <Text style={{ textAlign: "center" }} category="h2">
            Logowanie
          </Text>
        </View>

        <FormComponent control={control as Control<FormData>} errors={errors} />
        <View className="pb-5">
          <Button onPress={handleSubmit(onSubmit)}>Zaloguj mnie</Button>
          <Text
            category="s2"
            style={{ textAlign: "center", padding: 16 }}
            onPress={() => navigation.navigate("Register")}
          >
            Nie masz konta? Zarejestruj się
          </Text>
        </View>
      </View>
    </Layout>
  );
}
