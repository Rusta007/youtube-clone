import React from "react";
import { FaGripLines } from "react-icons/fa";

const Playlist = ({
  playlist,
  onVideoSelect,
  currentVideoIndex,
  setPlaylist,
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
      {/* <h2 className="text-xl font-bold mb-4">Playlist</h2> */}
      <ul>
        {playlist.map((video, index) => (
          <li
            key={index}
            className={`flex items-center h-[170px] p-2 ${
              index === currentVideoIndex ? "bg-gray-200" : ""
            }`}
            onClick={() => onVideoSelect(index)}
            draggable="true"
            onDragStart={(event) => handleDragStart(event, index)}
            onDragOver={handleDragOver}
            onDrop={(event) => handleDrop(event, index)}
          >
            <span className="cursor-move mr-2">
              <FaGripLines />
            </span>
            <img
              src={video.thumbnail}
              alt={`Thumbnail for ${video.title}`}
              className="w-[194px] h-[9rem] mr-2"
            />
            <div>
              <span className="text-lg font-bold inline-block">
                {video.title}
              </span>
              <div>
                {video.desc.length > 50
                  ? `${video.desc.slice(0, 150)}...`
                  : video.desc}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
