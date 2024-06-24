import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSelector } from "react-redux";
import { useUpdateAccountDetails } from "../../hooks/user.hook";
import { ProgressBar } from "../../components";

const schema = z.object({
  firstname: z
    .string()
    .nonempty({ message: "First name cannot be empty" })
    .regex(/^\S*$/, { message: "First name cannot contain spaces" })
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters" }),
  lastname: z
    .string()
    .nonempty({ message: "Last name cannot be empty" })
    .regex(/^\S*$/, { message: "Last name cannot contain spaces" })
    .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters" }),
  email: z.string().email(),
});
function EditPersonalInfo() {
  const user = useSelector((state) => state.auth.user);

  const firstName = user?.fullName.split(" ")[0];
  const lastName = user?.fullName.split(" ")[1];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      firstname: firstName,
      lastname: lastName,
      email: user?.email,
    },
  });

  const { mutateAsync: updateAccount, isPending } = useUpdateAccountDetails();

  const onSubmit = async (data) => {
    const { firstname, lastname, email } = data;
    const fullName = `${firstname} ${lastname}`;

    const initialData = {
      firstname: firstName,
      lastname: lastName,
      email: user?.email,
    };
    const hasDataChanged =
      fullName !== `${initialData.firstname} ${initialData.lastname}` ||
      email !== initialData.email;

    if (!hasDataChanged) {
      return;
    }

    const submitData = {
      fullName,
      email,
    };

    await updateAccount(submitData);
  };

  return (
    <div className="flex flex-wrap justify-center gap-y-4 py-4">
      {isPending && <ProgressBar />}
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <h5 className="font-semibold">Personal Info</h5>
        <p className="text-gray-300">Update your photo and personal details.</p>
      </div>
      <div className="w-full sm:w-1/2 lg:w-2/3">
        <form className="rounded-lg border" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-wrap gap-y-4 p-4">
            <div className="w-full lg:w-1/2 lg:pr-2">
              <label htmlFor="firstname" className="mb-1 inline-block">
                First name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                id="firstname"
                placeholder="Enter first name"
                {...register("firstname")}
              />
              {errors.firstname && (
                <p className="text-red-500">{errors.firstname.message}</p>
              )}
            </div>
            <div className="w-full lg:w-1/2 lg:pl-2">
              <label htmlFor="lastname" className="mb-1 inline-block">
                Last name
              </label>
              <input
                type="text"
                className="w-full rounded-lg border bg-transparent px-2 py-1.5"
                id="lastname"
                placeholder="Enter last name"
                {...register("lastname")}
              />
              {errors.lastname && (
                <p className="text-red-500">{errors.lastname.message}</p>
              )}
            </div>
            <div className="w-full">
              <label htmlFor="lastname" className="mb-1 inline-block">
                Email address
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full rounded-lg border bg-transparent py-1.5 pl-10 pr-2"
                  id="lastname"
                  placeholder="Enter email address"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500">{errors.email.message}</p>
                )}
              </div>
            </div>
          </div>
          <hr className="border border-gray-300" />
          <div className="flex items-center justify-end gap-4 p-4">
            <button
              type="button"
              className="inline-block rounded-lg border px-3 py-1.5 hover:bg-white/10"
              onClick={() => reset()}
            >
              Reset
            </button>
            <button
              type="submit"
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

export default EditPersonalInfo;
