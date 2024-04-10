import React, { useEffect, useState } from "react";
import { IoIosSunny } from "react-icons/io";
import { MdOutlineNightlight } from "react-icons/md";

function DayNight({ handleToggle, toggle }) {
  return (
    <div
      className={`border ${
        toggle === true ? "border-black" : "border-gray-200"
      } rounded-lg flex`}
    >
      <button
        className={`lg:px-4 lg:py-2 p-1 rounded-lg ${
          toggle === false && "bg-gradient-to-tr from-orange-300 to-red-500"
        }`}
        onClick={handleToggle}
      >
        <IoIosSunny size={24} />
      </button>
      <button
        className={`lg:px-4 lg:py-2 md:p-1 rounded-lg ${
          toggle === true && "bg-gradient-to-tr from-red-500 to-orange-300"
        }`}
        onClick={handleToggle}
      >
        <MdOutlineNightlight size={24} color="black" />
      </button>
    </div>
  );
}

export default DayNight;
