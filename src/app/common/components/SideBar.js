import React from "react";
import { IoHome } from "react-icons/io5";
import { BiSolidLike } from "react-icons/bi";
import { IoIosHeart } from "react-icons/io";
import { FaHistory } from "react-icons/fa";

function SideBar({ handlebutton, button, toggle }) {
  // console.log(button);
  return (
    <>
      <div
        className={`fixed top-[80px] left-0 h-full  w-[100%] md:w-[20%] z-50 ${
          toggle ? "bg-gray-900" : "block bg-gray-50"
        } md:flex md:flex-col items-left px-3 shadow-lg  `}
      >
        <button
          className={`flex flex-row items-center hover:bg-gray-200 p-2 ${
            button == "home" ? "!bg-gray-400" : ""
          }`}
          onClick={() => handlebutton("home")}
        >
          <IoHome className="mr-3" size={20} color="gray" />
          <span
            className={`text-base font-mono ${
              toggle ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Home
          </span>
        </button>
        <button
          className={`flex flex-row items-center hover:bg-gray-200 p-2 ${
            button == "Liked" ? "!bg-gray-400" : ""
          }`}
          onClick={() => handlebutton("Liked")}
        >
          <BiSolidLike className="mr-3" size={20} color="gray" />
          <span
            className={`text-base font-mono  ${
              toggle == true ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Like Videos
          </span>
        </button>
        <button
          className={`flex flex-row items-center hover:bg-gray-200 p-2 ${
            button == "Fav" ? "!bg-gray-400" : ""
          }`}
          onClick={() => handlebutton("Fav")}
        >
          <IoIosHeart className="mr-3" size={20} color="gray" />
          <span
            className={`text-base font-mono  ${
              toggle == true ? "text-gray-200" : "text-gray-700"
            }`}
          >
            Fav Videos
          </span>
        </button>
        <button
          className={`flex flex-row items-center hover:bg-gray-200 p-2 ${
            button == "History" ? "!bg-gray-400" : ""
          }`}
          onClick={() => handlebutton("History")}
        >
          <FaHistory className="mr-3" size={20} color="gray" />
          <span
            className={`text-base font-mono  ${
              toggle == true ? "text-gray-200" : "text-gray-700"
            }`}
          >
            History
          </span>
        </button>
      </div>
    </>
  );
}

export default SideBar;
