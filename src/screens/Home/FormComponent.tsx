import React from "react";
import { View } from "react-native";
import { Text, Input } from "@ui-kitten/components";
import { Controller } from "react-hook-form";
import { Control, FieldErrors } from "react-hook-form";

type FormData = {
  login: string;
  password: string;
};

type FormComponentProps = {
  control: Control<FormData>;
  errors: FieldErrors<FormData>;
};

export const FormComponent: React.FC<FormComponentProps> = ({
  control,
  errors,
}) => (
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
