import React from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaDiscord,
  FaQuestionCircle,
} from "react-icons/fa";

const Support = () => {
  const personalInfo = {
    name: "Aryan Bhati",
    email: "codiearyan07@gmail.com",
  };
  const links = [
    { name: "Twitter", icon: FaTwitter, url: "https://x.com/CodieAryan" },
    {
      name: "LinkedIn",
      icon: FaLinkedin,
      url: "https://www.linkedin.com/in/aryan-bhati/",
    },
    { name: "GitHub", icon: FaGithub, url: "https://github.com/AryanBhati7" },
    {
      name: "Discord",
      icon: FaDiscord,
      url: "https://discord.com/users/840957818323468318",
    },
  ];

  return (
    <section className="w-full  bg-black flex justify-center items-center">
      <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg max-w-lg mx-auto">
        <div className="flex flex-col items-center mb-6">
          <div className="bg-purple-600 p-4 rounded-full mb-4">
            <FaQuestionCircle className="text-4xl" />
          </div>

          <h3 className="text-2xl font-bold text-center mb-2">
            Contact me for any issue or Support
          </h3>
          <h4 className="text-2xl font-bold text-center mb-2 ">
            {personalInfo.name}
          </h4>
          <p className="text-purple-400 text-lg mb-4">{personalInfo.email}</p>
        </div>
        <div className="space-y-4">
          {links.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center p-3 bg-gray-800 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              <link.icon className="text-purple-400 mr-3 text-xl" />
              <span className="text-lg">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Support;
