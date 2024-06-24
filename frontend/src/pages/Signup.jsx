import React, { useState } from "react";
import { Logo, Input, SpButton } from "../components/index.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdOutlineCloudUpload } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useLogin, useRegisterUser } from "../hooks/auth.hook.js";
import { useDispatch } from "react-redux";
import { setUser } from "../features/authSlice.js";

function Signup() {
  const dispatch = useDispatch();
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
    fullName: z.string().min(4),
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
  const navigate = useNavigate();
  const { mutateAsync: registerUser } = useRegisterUser();
  const { mutateAsync: loginUser } = useLogin();
  const createAccount = async (data) => {
    data.avatar = profilePic;
    data.coverImage = coverPic;
    const registeredUser = await registerUser(data);
    if (registeredUser) {
      const loggedInUser = await loginUser({
        usernameOrEmail: data.email,
        password: data.password,
      });
      if (loggedInUser) {
        dispatch(setUser(loggedInUser));
        navigate("/");
      }
    }
  };
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const [selectedProfile, setSelectedProfile] = useState(
    "data:image/png;base64,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"
  );
  const [selectedCover, setSelectedCover] = useState("");

  return (
    <div className="h-screen overflow-y-auto bg-[#121212] text-white flex justify-center items-center">
      <div className="mx-auto my-8 flex w-full max-w-sm flex-col px-4">
        <div className="mx-auto inline-block w-16">
          <Logo
            className={" w-full text-center text-2xl font-semibold uppercase"}
          />
        </div>
        <div className="w-full flex flex-col items-center justify-center mb-6">
          <h1 className="text-2xl">Signup</h1>
          <span>
            already have an account?
            <Link to="/login" className="text-blue-500 inline">
              Login
            </Link>
          </span>
        </div>
        <form onSubmit={handleSubmit(createAccount)} className="flex flex-col">
          <div
            className="w-full mb-4 rounded-lg  bg-gray-300 text-purple-700  bg-cover bg-center bg-no-repeat items-center"
            style={{
              backgroundImage: `url(${selectedCover})`,
            }}
          >
            <div
              className={`mx-auto mt-6 flex cursor-pointer justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat border-2 border-purple-700 `}
              style={{
                backgroundImage: `url(${selectedProfile})`,
              }}
            >
              <label htmlFor="profileImg" className="cursor-pointer">
                <div className="bg-white/90 flex justify-center items-center rounded-full w-7 h-7 text-center ml-28 mt-[106px] cursor-pointer">
                  <MdOutlineCloudUpload />
                </div>

                <input
                  type="file"
                  style={{ display: "none" }}
                  id="profileImg"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("profileImg", { required: true })}
                  onChange={(e) => {
                    setSelectedProfile(URL.createObjectURL(e.target.files[0]));
                    setProfilePic(e.target.files[0]);
                  }}
                />
              </label>
            </div>
            <div className="flex justify-end">
              <input
                style={{ display: "none" }}
                type="file"
                id="coverphoto"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("coverphoto", { required: false })}
                onChange={(e) => {
                  setSelectedCover(URL.createObjectURL(e.target.files[0]));
                  setCoverPic(e.target.files[0]);
                }}
              />

              <div className="bg-white/90 text-purple-700 flex items-center gap-1 rounded-tl-md px-2 text-center font-semibold">
                <label
                  htmlFor="coverphoto"
                  className="inline-flex items-center gap-1 cursor-pointer"
                >
                  Cover
                  <MdOutlineCloudUpload />
                </label>
              </div>
            </div>
          </div>

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
          <SpButton type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Creating an Account..." : "Sign Up"}
          </SpButton>
        </form>
      </div>
    </div>
  );
}

export default Signup;
