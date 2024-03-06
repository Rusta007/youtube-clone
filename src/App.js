import React, { useState, useEffect } from "react";
import VideoPlayer from "./app/common/components/VideoPlayer";
import Playlist from "./app/common/components/Playlist";
import jsonData from "./app/utils/playlist.json";
import AddVideoModal from "./app/common/components/AddVideoModal";

const App = () => {
  const [playlist, setPlaylist] = useState(jsonData.playlist);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const updatedPlaylist = jsonData.playlist.map((entry) => ({
      ...entry,
      url: require("." + entry.url),
      thumbnail: require("." + entry.thumbnail),
    }));

    setPlaylist(updatedPlaylist);
  }, [searchQuery]);

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
      <div className="bg-gray-900 p-4 text-white flex flex-col md:flex-row items-center justify-between">
        <span className="text-2xl font-semibold mb-2 md:mb-0">
          YouTube Clone
        </span>
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="px-4 py-2 bg-gray-700 text-white rounded-md md:mb-0 md:mr-4"
          />
          <button
            onClick={handleOpenModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
          >
            Add Video
          </button>
        </div>
      </div>

      <div className="flex-grow flex flex-col md:flex-row">
        {currentVideoIndex !== null && (
          <div className="w-full md:w-3/5 p-4">
            <VideoPlayer
              video={playlist[currentVideoIndex]}
              playlist={playlist}
            />
          </div>
        )}

        <div
          className={`w-full md:w-${
            currentVideoIndex !== null ? "2/5" : "full"
          } p-4 bg-gray-200 overflow-y-auto`}
        >
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
