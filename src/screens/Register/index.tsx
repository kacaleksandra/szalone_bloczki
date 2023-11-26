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
  confirmPassword: string;
};

const windowWidth = Dimensions.get("window").width;

// Yup schema
const schema = object().shape({
  login: string().required("Login jest wymagany"),
  password: string().required("Hasło jest wymagane"),
  confirmPassword: string()
    .required("Konieczne jest potwierdzenie hasła")
    .test("passwords-match", "Hasła muszą do siebie pasować", function (value) {
      return this.parent.password === value;
    }),
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
      confirmPassword: "",
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    console.log(data);
    navigation.navigate("MainMenu");
  };

  return (
    <Layout style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View className="flex justify-between h-2/3 w-3/4">
        <View>
          <Text style={{ textAlign: "center" }} category="h2">
            Rejestracja
          </Text>
        </View>
        <FormComponent control={control as Control<FormData>} errors={errors} />
        <View className="pb-5">
          <Button onPress={handleSubmit(onSubmit)}>Zarejestruj się</Button>
        </View>
      </View>
    </Layout>
  );
}
