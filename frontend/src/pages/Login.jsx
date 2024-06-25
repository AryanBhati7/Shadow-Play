import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input, Logo, SpButton } from "../components/index.js";
import { useLogin } from "../hooks/auth.hook.js";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setUser } from "../features/authSlice.js";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = z.object({
    usernameOrEmail: z.string().min(3),
    password: z.string().min(6),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const { mutateAsync: login, isPending, isError, error } = useLogin();

  const loginUser = async (data) => {
    const session = await login(data);
    if (session) {
      dispatch(setUser(session));
      navigate("/");
    }
  };

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white flex justify-center items-center">
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
        <div className="w-full flex justify-center items-center">
          <Logo
            className={" w-full text-center text-2xl font-semibold uppercase"}
            inline={true}
          />
        </div>

        <div className="w-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl">Login</h1>
          <span>
            Don't have an account?
            <Link to="/signup" className="text-blue-500 inline">
              Signup
            </Link>
          </span>
        </div>
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
          <SpButton type="submit">
            {isPending ? "Logging In" : "Login"}
          </SpButton>
        </form>
      </div>
    </div>
  );
}

export default Login;
