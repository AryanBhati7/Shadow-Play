import React, { useState } from "react";
import { Logo, Input, SpButton } from "../components/index.js";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { MdOutlineCloudUpload } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

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
    Controller,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const createAccount = (data) => {
    console.log(data);
  };
  const [profilePic, setProfilePic] = useState(null);
  const [coverPic, setCoverPic] = useState(null);

  const [selectedImage, setSelectedImage] = useState(
    "https://www.kindpng.com/picc/m/463-4636159_cloud-upload-icon-circle-hd-png-download.png"
  );
  const [selectedCover, setSelectedCover] = useState("");
  function handleImageSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }

  function handleCoverSelect(e) {
    const file = e.target.files[0];
    if (file) {
      setCoverPic(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedCover(reader.result);
      };
      reader.readAsDataURL(file);
    }
  }
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
          <div
            className="w-full rounded-lg  bg-gray-300 text-purple-700  bg-cover bg-center bg-no-repeat items-center"
            style={{
              backgroundImage: `url(${selectedCover})`,
            }}
          >
            <div
              className={`mx-auto mt-6 flex justify-center w-[141px] h-[141px] bg-blue-300/20 rounded-full bg-cover bg-center bg-no-repeat border-2 border-purple-700 `}
              style={{ backgroundImage: `url(${selectedImage})` }}
            >
              <div className="bg-white/90 flex justify-center items-center rounded-full w-7 h-7 text-center ml-28 mt-[106px]">
                <input
                  type="file"
                  style={{ display: "none" }}
                  id="profileImg"
                  accept="image/png, image/jpg, image/jpeg, image/gif"
                  {...register("profileImg", { required: true })}
                  onChange={(e) => {
                    handleImageSelect(e);
                  }}
                />

                <label
                  htmlFor="profileImg"
                  className="
                   cursor-pointer"
                >
                  <MdOutlineCloudUpload />
                </label>
              </div>
            </div>
            <div className="flex justify-end">
              <input
                style={{ display: "none" }}
                type="file"
                id="coverphoto"
                accept="image/png, image/jpg, image/jpeg, image/gif"
                {...register("coverphoto", { required: false })}
                onChange={(e) => {
                  handleCoverSelect(e);
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
