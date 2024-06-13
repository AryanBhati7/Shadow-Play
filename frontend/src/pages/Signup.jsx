import React from "react";
import { Logo, Input, SpButton } from "../components/index.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function Signup() {
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
    // .refine(
    //   (value) => {
    //     const isUnique = users.every((user) => user.username !== value);
    //     return isUnique;
    //   },
    //   {
    //     message: "Username already exists",
    //   }
    // ),
    fullName: z.string().min(6),
    password: z.string().min(6),
    // confirmPassword: z.string().min(6),
  });
  // .refine((data) => data.password === data.confirmPassword, {
  //   message: "Passwords should match",
  //   path: ["confirmPassword"],
  // });

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
            className={
              "mb-6 w-full text-center text-2xl font-semibold uppercase"
            }
          />
        </div>
        <form onSubmit={handleSubmit(createAccount)} className="flex flex-col">
          <Input
            label={"Full Name*"}
            type="text"
            placeholder="John Wick"
            id={"fullName"}
            {...register("fullName", {
              required: true,
            })}
          />
          <Input
            label={"Username*"}
            type="text"
            placeholder="johnwick7"
            id={"username"}
            {...register("username", {
              required: true,
            })}
          />
          <Input
            label={"Email*"}
            type="text"
            placeholder="johnwick@example.com"
            id={"email"}
            {...register("email", {
              required: true,
            })}
          />

          <Input
            label={"Passsword*"}
            type="password"
            placeholder="********"
            id={"password"}
            {...register("password", {
              required: true,
            })}
          />
          <SpButton type="submit">Signup</SpButton>
        </form>
        {/* <button className="bg-[#ae7aff] px-4 py-3 text-black">
          Sign up with Email
        </button> */}
      </div>
    </div>
  );
}

export default Signup;
