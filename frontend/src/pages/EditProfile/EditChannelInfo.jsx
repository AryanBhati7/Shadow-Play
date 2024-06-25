import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useUpdateChannelInfo } from "../../hooks/user.hook";
import { ProgressBar } from "../../components";

const schema = z.object({
  username: z
    .string()
    .nonempty({ message: "Username cannot be empty" })
    .regex(/^\S*$/, { message: "Username cannot contain spaces" })
    .regex(/^[a-z]*$/, { message: "Username must be lowercase" }),
  description: z
    .string()
    .max(275, { message: "Description must be less than 275 characters" }),
});
function EditChannelInfo() {
  const channelInfo = useSelector((state) => state.auth.user);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: channelInfo?.username,
      description: channelInfo?.description || "",
    },
    mode: "onChange",
  });

  const description = watch("description");
  const maxChars = 275;

  const descriptionCharsLeft = maxChars - description.length;

  const { mutateAsync: updateChannelInfo, isPending } = useUpdateChannelInfo();
  const onSubmit = async (data) => {
    const { username, description } = data;

    const initialData = {
      username: channelInfo?.username,
      description: channelInfo?.description,
    };

    const hasDataChanged =
      username !== initialData.username ||
      description !== initialData.description;

    if (!hasDataChanged) {
      return;
    }

    await updateChannelInfo(data);
  };

  return (
    <div className="flex flex-wrap justify-center gap-y-4 py-4">
      {isPending && <ProgressBar />}
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <h5 className="font-semibold">Channel Info</h5>
        <p className="text-gray-300">Update your Channel details here.</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-lg border">
          <div className="flex flex-wrap gap-y-4 p-4">
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="username">
                Username
              </label>
              <div className="flex rounded-lg border">
                <p className="flex shrink-0 items-center border-r border-white px-3 align-middle">
                  yt-tweets.vercel.app/
                </p>
                <input
                  type="text"
                  className="w-full bg-transparent px-2 py-1.5"
                  id="username"
                  placeholder="@username"
                  {...register("username")}
                />
              </div>
              {errors.username && (
                <p className="text-md text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="w-full">
              <label className="mb-1 inline-block" htmlFor="desc">
                Description
              </label>
              <textarea
                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                rows="4"
                id="desc"
                placeholder="Channel Description"
                {...register("description")}
              ></textarea>
              <p className="mt-0.5 text-sm text-gray-300">
                {descriptionCharsLeft} characters left
              </p>
              {errors.description && (
                <p className="text-md text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>
          <hr className="border border-gray-300" />
          <div className="flex items-center justify-end gap-4 p-4">
            <button
              type="button"
              onClick={() => reset()}
              disabled={isPending}
              className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-block bg-[#ae7aff] px-3 py-1.5 text-black"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditChannelInfo;
