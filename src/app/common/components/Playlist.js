import React from "react";
import { FaGripLines } from "react-icons/fa";

const Playlist = ({
  playlist,
  onVideoSelect,
  currentVideoIndex,
  setPlaylist,
  toggle,
}) => {
  const handleDragStart = (event, index) => {
    event.dataTransfer.setData("index", index);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDrop = (event, index) => {
    const dragIndex = parseInt(event.dataTransfer.getData("index"));
    const dragItem = playlist[dragIndex];
    const newPlaylist = playlist.filter((_, idx) => idx !== dragIndex);
    newPlaylist.splice(index, 0, dragItem);
    setPlaylist(newPlaylist);
  };

  return (
    <div className="w-auto">
      <ul className="flex flex-wrap justify-evenly w-[100%]">
        {playlist.length === 0 ? (
          <>
            <h1>No Found</h1>
          </>
        ) : (
          <>
            {playlist.map((video, index) => (
              <li
                id="playlistID"
                key={index}
                className={``}
                onClick={() => onVideoSelect(index)}
                draggable="true"
                onDragStart={(event) => handleDragStart(event, index)}
                onDragOver={handleDragOver}
                onDrop={(event) => handleDrop(event, index)}
              >
                <div
                  className={`${
                    toggle === true ? "border-gray-700" : "border-gray-200"
                  } ${index === currentVideoIndex ? "bg-gray-200" : ""}
          ${
            toggle === true && index === currentVideoIndex ? "bg-slate-500" : ""
          } flex gap-2 items-center p-2 my-3`}
                >
                  {currentVideoIndex !== null && (
                    <div>
                      <span className="cursor-move mr-2">
                        <FaGripLines />
                      </span>
                    </div>
                  )}
                  <div>
                    <img
                      src={video.thumbnail}
                      alt={`Thumbnail for ${video.title}`}
                      className="w-[372px] h-[13rem] mr-2 rounded-md"
                    />
                    <div className="flex flex-col">
                      <div
                        className={`text-lg ${
                          toggle == true ? "text-gray-50" : "text-gray-950"
                        } font-bold inline-block `}
                      >
                        {video.title}
                      </div>
                      <div className="text- text-gray-500 font-bold inline-block ">
                        {video.authorBy}
                      </div>
                      {/* <div
                    className={` text-${
                      currentVideoIndex == null ? "xs" : "xs"
                    }`}
                  >
                    {video.desc.length > 50
                      ? `${video.desc.slice(0, 50)}...`
                      : video.desc}
                  </div> */}
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </>
        )}
      </ul>
    </div>
  );
};

export default Playlist;
