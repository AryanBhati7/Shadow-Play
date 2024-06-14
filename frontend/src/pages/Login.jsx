import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Logo, SpButton } from "../components/index.js";

function Login() {
  const schema = z.object({
    email: z.string().email(),
    username: z
      .string()
      .min(4)
      .refine((value) => !value.includes(" "), {
        message: "Username must not contain spaces",
      })
      .refine((value) => value === value.toLowerCase(), {
        message: "Username must be all lowercase",
      }),
    password: z.string().min(6),
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createAccount = (data) => {
    console.log(data);
  };
  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white flex justify-center items-center">
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
        <div className="mx-auto inline-block w-16">
          <Logo
            className={" w-full text-center text-2xl font-semibold uppercase"}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl">Login</h1>
          <span>
            dont have an account?
            <Link to="/signup" className="text-blue-500 inline">
              Signup
            </Link>
          </span>
        </div>
        <form onSubmit={handleSubmit(createAccount)} className="flex flex-col">
          <Input
            label={"Username/Email*"}
            type="text"
            placeholder="johnwick7"
            id={"username"}
            {...register("usernameOrEmail", {
              required: true,
            })}
          />
          <Input
            label={"Password*"}
            type="password"
            placeholder="*******"
            id={"password"}
            {...register("password", {
              required: true,
            })}
          />
          <SpButton type="submit">Login</SpButton>
        </form>
      </div>
    </div>
  );
}

export default Login;
