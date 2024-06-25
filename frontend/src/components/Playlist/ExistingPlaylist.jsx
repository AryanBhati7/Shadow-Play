import React from "react";

function ExistingPlaylist() {
  return (
    <ul className="mb-4">
      <li className="mb-2 last:mb-0">
        <label
          className="group/label inline-flex cursor-pointer items-center gap-x-3"
          htmlFor="Collections-checkbox"
        >
          <input
            type="checkbox"
            className="peer hidden"
            id="Collections-checkbox"
          />
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              ></path>
            </svg>
          </span>
          Collections
        </label>
      </li>
      <li className="mb-2 last:mb-0">
        <label
          className="group/label inline-flex cursor-pointer items-center gap-x-3"
          htmlFor="JavaScript Basics-checkbox"
        >
          <input
            type="checkbox"
            className="peer hidden"
            id="JavaScript Basics-checkbox"
          />
          <span className="inline-flex h-4 w-4 items-center justify-center rounded-[4px] border border-transparent bg-white text-white group-hover/label:border-[#ae7aff] peer-checked:border-[#ae7aff] peer-checked:text-[#ae7aff]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              ></path>
            </svg>
          </span>
          JavaScript Basics
        </label>
      </li>
    </ul>
  );
}

export default ExistingPlaylist;
