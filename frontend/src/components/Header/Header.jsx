import React, { useState, useEffect } from "react";
import SpButton from "../SpButton";
import Logo from "../Logo";
import Button from "../Button";
import { Link, useNavigate } from "react-router-dom";
import { useLogout } from "../../hooks/auth.hook";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/authSlice";

import { BiLike } from "react-icons/bi";
import { GoDeviceCameraVideo } from "react-icons/go";
import { RxQuestionMarkCircled } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { IconContext } from "react-icons";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { setShowUploadVideo } from "../../features/uiSlice";

function Header() {
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.authStatus);
  const userData = useSelector((state) => state.auth.user);

  const dispatch = useDispatch();
  const { mutateAsync: logout } = useLogout();

  const handleLogout = async () => {
    const sessionStatus = await logout();
    if (sessionStatus) {
      dispatch(setUser(null));
    }
  };

  const handleUploadVideo = () => {
    navigate("/my-studio");
    dispatch(setShowUploadVideo(true));
  };

  const mobileSidebarItems = [
    {
      name: "Liked Videos",
      path: "/liked-videos",
      icon: <BiLike />,
    },
    {
      name: "My Content",
      path: `/channel/${userData?.username}/videos`,
      icon: <GoDeviceCameraVideo />,
    },
    {
      name: "Support",
      path: "/support",
      icon: <RxQuestionMarkCircled />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <CiSettings />,
    },
  ];

  const [sideBar, setSideBar] = useState(true);

  const openSideBar = () => {
    setSideBar(true);
  };
  const closeSideBar = () => {
    setSideBar(false);
  };

  return (
    <header className="z-[9999] sticky inset-x-0 top-0 w-full border-b border-white text-white bg-[#121212] px-4">
      <nav className="mx-auto flex max-w-7xl items-center py-2 ">
        <Link to="/" className="flex items-center">
          <Logo className={"mr-4 w-12 shrink-0 sm:w-16"} />
        </Link>

        <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
          <input
            className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
            placeholder="Search"
          />
          <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              aria-hidden="true"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              ></path>
            </svg>
          </span>
        </div>
        <button className="ml-auto sm:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            aria-hidden="true"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            ></path>
          </svg>
        </button>
        <button
          onClick={openSideBar}
          className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden"
        >
          <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
          <span className="block h-[2px] w-2/3 bg-white group-hover:bg-[#ae7aff]"></span>
          <span className="block h-[2px] w-full bg-white group-hover:bg-[#ae7aff]"></span>
        </button>
        <IconContext.Provider value={{ className: "w-6 h-6" }}>
          {sideBar && (
            <div className="fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l border-white bg-[#121212] duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none">
              <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
                <Link to="/" className="inline-block w-12">
                  <Logo />
                </Link>
                <button onClick={closeSideBar} className="inline-block w-8">
                  <IoIosCloseCircleOutline />
                </button>
              </div>
              <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
                {mobileSidebarItems.map((item, index) => (
                  <li key={index} className="w-full">
                    <Link
                      to={item.path}
                      className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-[#ae7aff] hover:text-black focus:border-[#ae7aff] focus:bg-[#ae7aff] focus:text-black"
                    >
                      <span className="inline-block w-full max-w-[20px] group-hover:mr-4 lg:mr-4">
                        {item.icon}
                      </span>
                      <span>{item.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
                {authStatus ? (
                  <SpButton onClick={handleUploadVideo}>Upload Video</SpButton>
                ) : (
                  <Button onClick={handleUploadVideo}>Upload Video</Button>
                )}

                {authStatus && userData && (
                  <>
                    <Button
                      className="bg-gray-500 hover:bg-slate-400"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                    <div className="mb-8 mt-auto px-4 sm:mb-0 sm:mt-0 sm:px-0">
                      <Button className="flex w-full gap-4 text-left sm:items-center">
                        <img
                          src={userData.avatar?.url}
                          alt={userData.username}
                          className="object-cover h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
                        />
                        <div className="w-full pt-2 sm:hidden">
                          <h6 className="font-semibold">{userData.fullName}</h6>
                          <p className="text-sm text-gray-300">
                            {userData.username}
                          </p>
                        </div>
                      </Button>
                    </div>
                  </>
                )}

                {!authStatus && (
                  <>
                    <Link to="/login">
                      <SpButton>Log in</SpButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </IconContext.Provider>
      </nav>
    </header>
  );
}

export default Header;
