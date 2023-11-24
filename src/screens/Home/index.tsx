import React from "react";
import { Image, View, Dimensions } from "react-native";
import { Layout, Text, Input, Button } from "@ui-kitten/components";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller, SubmitHandler } from "react-hook-form";

type FormData = {
  login: string;
  password: string;
};

const windowWidth = Dimensions.get("window").width;

// Yup schema
const schema = object().shape({
  login: string().required("Login is required"),
  password: string().required("Password is required"),
});

type FormComponentProps = {
  control: any; // Type for control from react-hook-form
  errors: any; // Type for errors from react-hook-form
};

const FormComponent: React.FC<FormComponentProps> = ({ control, errors }) => (
  <View className="flex justify-between h-1/3">
    <Controller
      control={control}
      render={({ field }) => (
        <Input
          label="Login"
          size="large"
          onChangeText={field.onChange}
          value={field.value}
        />
      )}
      name="login"
    />
    {errors && errors.login && (
      <Text style={{ color: "red", textAlign: "center", marginBottom: "2%" }}>
        {errors.login.message}
      </Text>
    )}
    <Controller
      control={control}
      render={({ field }) => (
        <Input
          label="Hasło"
          size="large"
          secureTextEntry
          onChangeText={field.onChange}
          value={field.value}
        />
      )}
      name="password"
    />
    {errors && errors.password && (
      <Text style={{ color: "red", textAlign: "center", marginBottom: "2%" }}>
        {errors.password.message}
      </Text>
    )}
  </View>
);

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
    //submit logic here
    console.log(data);
  };

  return (
    <Layout
      style={{ flex: 1, justifyContent: "space-between", alignItems: "center" }}
    >
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
        <FormComponent control={control} errors={errors} />
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
