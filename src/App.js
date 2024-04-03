import React, { useState, useEffect } from "react";
import VideoPlayer from "./app/common/components/VideoPlayer";
import Playlist from "./app/common/components/Playlist";
import AddVideoModal from "./app/common/components/AddVideoModal";
import jsonData from "./app/utils/playlist.json";
import { MdMenu } from "react-icons/md";
import { MdKeyboardVoice } from "react-icons/md";
import { TfiSearch } from "react-icons/tfi";

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  console.log(currentVideoIndex);
  useEffect(() => {
    setPlaylist(
      jsonData.playlist.map((entry) => ({
        ...entry,
        url: require("." + entry.url),
        thumbnail: require("." + entry.thumbnail),
      }))
    );
  }, []);

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveVideo = (newVideo) => {
    console.log(newVideo);
    setPlaylist([...playlist, newVideo]);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPlaylist = playlist.filter((video) =>
    video.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-900 py-4 px-8 text-white flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center">
          <span className="pr-5 cursor-pointer">
            <MdMenu size={30} />
          </span>
          <a href="/" className="flex items-center">
            <span className="text-2xl font-semibold mb-2 md:mb-0">
              <img
                src="https://cdn.pixabay.com/photo/2022/06/23/10/00/gym-logo-7279453_1280.png"
                alt="logo"
                width="40px"
                height="100%"
              />
            </span>
            <span class="bg-gradient-to-tr from-orange-500 to-red-200 text-transparent bg-clip-text font-extrabold text-xl">
              VibeStream
            </span>
          </a>
        </div>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-3 py-2 bg-gray-300 text-black rounded-md md:mb-0 w-[500px]"
          />
          <div className="md:mr-4 border-black bg-gray-600 px-4 py-3 rounded-lg h-[auto] w-[50px] ml-[-10px] cursor-pointer">
            <TfiSearch size={19} />
          </div>
          <div className=" border-black bg-gray-600 px-2 py-3 rounded-full  h-[auto] w-[35px] ml-[-10px] cursor-pointer">
            <MdKeyboardVoice size={20} />
          </div>
        </div>
        <div className="flex items-center">
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Video
          </button>
        </div>
      </div>

      <div
        className={`flex flex-${
          currentVideoIndex == null ? "col" : "row-reverse"
        } `}
      >
        {currentVideoIndex !== null && (
          <div className="w-[1750px] p-4">
            <VideoPlayer
              video={playlist[currentVideoIndex]}
              playlist={playlist}
            />
          </div>
        )}
        <div>
          <Playlist
            playlist={filteredPlaylist}
            onVideoSelect={handleVideoSelect}
            currentVideoIndex={currentVideoIndex}
            setPlaylist={setPlaylist}
          />
        </div>
      </div>

      <AddVideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVideo}
      />
    </div>
  );
};

export default App;
