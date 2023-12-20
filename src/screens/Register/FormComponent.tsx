import React from "react";
import { View } from "react-native";
import { Text, Input } from "@ui-kitten/components";
import { Controller } from "react-hook-form";
import { Control, FieldErrors } from "react-hook-form";
import { error } from "console";

type FormData = {
  login: string;
  password: string;
  confirmPassword: string;
};

type FormComponentProps = {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};

export const FormComponent: React.FC<FormComponentProps> = ({
  control,
  errors,
}) => (
  <View className="flex flex-grow justify-around py-10 h-1/3">
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
        Login jest wymagany
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
        Hasło jest wymagane
      </Text>
    )}
    <Controller
      control={control}
      render={({ field }) => (
        <Input
          label="Potwierdź hasło"
          size="large"
          secureTextEntry
          onChangeText={field.onChange}
          value={field.value}
        />
      )}
      name="confirmPassword"
    />
    {errors && errors.confirmPassword && (
      <Text style={{ color: "red", textAlign: "center", marginBottom: "2%" }}>
        {errors.confirmPassword.message}
      </Text>
    )}
  </View>
);
