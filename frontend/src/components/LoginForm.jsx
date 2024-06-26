import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLogin } from "../hooks/auth.hook";
import { Input, SpButton } from "./index";

function LoginForm({ onLogin }) {
  const schema = z.object({
    usernameOrEmail: z
      .string()
      .min(3, "Username or email must be at least 3 characters"),
    password: z.string().min(6, "Password must be at least 6 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: login, isPending, isError, error } = useLogin();

  const loginUser = async (data) => {
    try {
      const session = await login(data);
      if (session) {
        onLogin(session);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(loginUser)} className="flex flex-col">
      <Input
        label={"Username/Email*"}
        type="text"
        placeholder="johnwick7"
        id={"username"}
        {...register("usernameOrEmail", {
          required: true,
        })}
      />
      {errors.usernameOrEmail && (
        <span className="text-red-500 text-sm">
          {errors.usernameOrEmail.message}
        </span>
      )}
      <Input
        label={"Password*"}
        type="password"
        placeholder="*******"
        id={"password"}
        {...register("password", {
          required: true,
        })}
        className="mb-4"
      />
      {errors.password && (
        <span className="text-red-500 text-sm">{errors.password.message}</span>
      )}
      {isError && <span className="text-red-500 text-sm">{error.message}</span>}
      <SpButton type="submit">{isPending ? "Logging In" : "Login"}</SpButton>
    </form>
  );
}

export default LoginForm;
