import React from "react";
import { FaGripLines } from "react-icons/fa";

const HistoryPlaylist = ({ playlist, currentVideoIndex, onVideoSelect }) => {
  console.log(playlist)
  return (
    <div className="w-auto">
      <h1 className="text-xl font-semibold text-center m-2">Watch Videos</h1>

      <ul>
        {playlist.map((video, index) => (
          <li
            key={index}
            className={`flex cursor-pointer flex-col items-center ${
              index === currentVideoIndex ? "bg-gray-200" : ""
            }`}
            onClick={() => onVideoSelect(index)}
          >
            <div className="border p-2 w-[200px]">
              <img
                src={video.thumbnail}
                alt={`Thumbnail for ${video.title}`}
                className="w-[194px] h-[9rem] mr-2 mt-2"
              />

              <span className="text-lg font-bold inline-block ml-2">
                {video.title}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryPlaylist;
