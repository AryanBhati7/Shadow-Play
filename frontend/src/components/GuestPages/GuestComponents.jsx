import React from "react";
import {
  FaUser,
  FaHeart,
  FaHistory,
  FaCog,
  FaTv,
  FaFilm,
  FaUsers,
} from "react-icons/fa";

export const GuestComponent = ({ title, description, icon: Icon }) => (
  <div className="flex flex-col items-center justify-center  bg-black p-4 text-center">
    <Icon className="w-16 h-16 text-purple-400 mb-4" />
    <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
    <p className="text-gray-400 mb-8 max-w-md">{description}</p>
  </div>
);

export const GuestMyChannel = () => (
  <GuestComponent
    title="Save your favorite moments"
    description="Discover new videos you'll love by signing in and creating your channel."
    icon={FaUser}
  />
);

export const GuestMyStudio = () => (
  <GuestComponent
    title="Create and share your content"
    description="Sign in to access your studio and start creating amazing videos."
    icon={FaFilm}
  />
);

export const GuestSubscriptions = () => (
  <GuestComponent
    title="Never miss a video"
    description="Subscribe to your favorite channels by signing in."
    icon={FaUsers}
  />
);

export const GuestLikedVideos = () => (
  <GuestComponent
    title="Save your favorite moments"
    description="Discover new videos you'll love by signing in and liking them."
    icon={FaHeart}
  />
);

export const GuestHistory = () => (
  <GuestComponent
    title="Keep track of what you watch"
    description="Watch history isn't viewable when signed out. Sign in to see your viewing history."
    icon={FaHistory}
  />
);

export const GuestSettings = () => (
  <GuestComponent
    title="Customize your experience"
    description="Sign in to access and modify your account settings."
    icon={FaCog}
  />
);

export const GuestNow = () => (
  <GuestComponent
    title="Stay up to date"
    description="Sign in to see what's happening right now on our platform."
    icon={FaTv}
  />
);
