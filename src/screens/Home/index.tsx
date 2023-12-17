import React from "react";
import { Image, View, Dimensions } from "react-native";
import { Layout, Text, Button } from "@ui-kitten/components";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler, Control } from "react-hook-form";
import { FormComponent } from "./FormComponent";

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

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    navigation.navigate("MainMenu");
  };

  return (
    <Layout
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
      <Button onPress={navigation.navigate("NewProject")}>DevTool</Button>
      <View className="flex self-center h-1/3 py-16">
        <Image
          source={require("../../assets/full_app_logo.png")}
          style={{ width: windowWidth, height: 200 }}
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
