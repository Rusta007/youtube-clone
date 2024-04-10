import React, { useState, useEffect } from "react";
import AddVideoModal from "./app/common/components/AddVideoModal";
import VideoPlayer from "./app/common/components/VideoPlayer";
import Playlist from "./app/common/components/Playlist";
import { MdKeyboardVoice } from "react-icons/md";
import jsonData from "./app/utils/playlist.json";
import { TfiSearch } from "react-icons/tfi";
import { MdMenu } from "react-icons/md";
import { RiVoiceprintFill } from "react-icons/ri";
import { FaPlusCircle } from "react-icons/fa";
import DayNight from "./app/common/components/DayNight";
import SideBar from "./app/common/components/SideBar";

const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [historyVideos, setHistoryVideos] = useState([]);
  const [voice, setVoice] = useState(false);

  function SearchRecognition() {
    setVoice(!voice);
    if (`SpeechRecognition` in window || `webkitSpeechRecognition` in window) {
      const recognition = new (window.SpeechRecognition ||
        window.webkitSpeechRecognition)();

      recognition.lang = "en-US";
      recognition.start();

      recognition.onresult = (e) => {
        if (e.results.length > 0 && e.results[0].length > 0) {
          const transcript = e.results[0][0].transcript;
          console.log(transcript);
          setSearchQuery(transcript);
        } else {
          console.log("No transcriptions were recognized.");
        }
      };
      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
      };
      recognition.onend = () => {
        console.log("Speech recognition service disconnected");
      };
    }
  }

  useEffect(() => {
    setPlaylist(
      jsonData.playlist.map((entry) => ({
        ...entry,

        url: require("." + entry.url),
        thumbnail: require("." + entry?.thumbnail),
      }))
    );

    setHistoryVideos(
      jsonData.playlist.map((entry) => ({
        ...entry,
        url: require("." + entry.url),
        thumbnail: require("." + entry.thumbnail),
      }))
    );
    setData(
      jsonData.playlist.map((entry) => ({
        ...entry,

        url: require("." + entry.url),
        thumbnail: require("." + entry?.thumbnail),
      }))
    );

    setButton("home");
  }, []);

  const handleVideoSelect = (index) => {
    setCurrentVideoIndex(index);

    const isIdExists = historyVideos.some(
      (video) => video.id === playlist[index].id
    );
    if (isIdExists) {
      setHistoryVideos((prev) =>
        prev.filter((video) => video.id !== playlist[index].id)
      );
    }
    setHistoryVideos((prev) => [...prev, playlist[index]]);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveVideo = (newVideo) => {
    setPlaylist([...playlist, newVideo]);
  };

  const filteredPlaylist = () => {
    const filtered = playlist?.filter((video) =>
      video.title.toLowerCase().includes(searchQuery.toLocaleLowerCase())
    );
    setCurrentVideoIndex(null);
    setData(filtered);
    setSearchQuery("");
  };

  useEffect(() => {
    // Debounce the search recognition function
    const debounceSearchRecognition = debounce(SearchRecognition, 1000);
    debounceSearchRecognition();

    // Clear timeout on component unmount to avoid memory leaks
    return () => clearTimeout(debounceSearchRecognition);
  }, [searchQuery]);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    // debounce(filteredPlaylist, 1000)(event.target.value);
  };

  const [likedVideos, setLikedVideo] = useState([]);
  const [favVideos, setFavVideos] = useState([]);

  const handleLike = (id) => {
    let LikedVideos = playlist.map((item) => {
      if (item.id == id) {
        item.like = !item.like;
      }
    });

    setLikedVideo([...likedVideos, LikedVideos]);
  };

  const handleFav = (id) => {
    let LikedVideos = playlist.map((item) => {
      if (item.id == id) {
        item.fav = !item.fav;
      }
    });

    setFavVideos([...favVideos, LikedVideos]);
  };

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const body = document.body;
    if (toggle) {
      body.style.backgroundColor = "#333";
      body.style.color = "#FFF";
    } else {
      body.style.backgroundColor = "#FFF";
      body.style.color = "#000";
    }
  }, [toggle]);

  const handleToggle = () => {
    setToggle(!toggle);
  };

  const [model, setModel] = useState(false);

  const handleModel = () => {
    setModel(!model);
    console.log("working ", model);
  };

  const [button, setButton] = useState("");

  const handlebutton = (name) => {
    setButton(name);
    setModel(!model);
  };

  const showVideos = () => {
    if (button == "History") {
      setCurrentVideoIndex(null);
      setData(historyVideos);
    } else if (button == "Liked") {
      setCurrentVideoIndex(null);
      setData(playlist.filter((item) => item.like === true));
    } else if (button == "Fav") {
      setCurrentVideoIndex(null);
      setData(playlist.filter((item) => item.fav === true));
    } else if (button == "home") {
      console.log("home");
      setCurrentVideoIndex(null);
      setData(playlist);
    }
  };

  useEffect(() => {
    showVideos();
  }, [button]);

  const [data, setData] = useState([]);

  return (
    <div className="flex flex-col h-screen">
      <div
        className={`${
          toggle !== true ? "bg-gray-50" : "bg-gray-900"
        } lg:py-4 lg:px-8 py-3 px-2 text-white flex  flex-row items-center justify-between`}
      >
        <div className="flex items-center w-[20%]">
          <button
            className="lg:pr-5 md:pr-2 cursor-pointer"
            onClick={handleModel}
          >
            <MdMenu size={30} color={`${toggle == true ? "white" : "black"}`} />
          </button>
          <a href="/" className="flex items-center">
            <span className="text-2xl font-semibold">
              <img
                src="https://cdn.pixabay.com/photo/2022/06/23/10/00/gym-logo-7279453_1280.png"
                alt="logo"
                // width="40px"
                height="100%"
                className="w-[45px] lg:w-[40px]"
              />
            </span>
            <span className="lg:inline hidden bg-gradient-to-tr from-orange-500 to-red-200 text-transparent bg-clip-text font-extrabold text-xl">
              VibeStream
            </span>
          </a>
        </div>

        <div className="flex items-center w-[50%]">
          <input
            type="text"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearchChange}
            className={`px-3 py-2 ${
              toggle == false ? "bg-gray-50 border" : "bg-gray-500"
            } text-black rounded-md w-[100%] sm:w-auto md:w-[500px]`}
          />
          <button
            onClick={filteredPlaylist}
            className={`md:mr-4 mr-4 border-black ${
              toggle !== true ? "bg-blue-500" : "bg-gray-600"
            } py-2 px-2 lg:px-3 lg:py-3  rounded-lg h-[auto] w-[35px] lg:w-[40px] ml-[-10px] cursor-pointer`}
          >
            <TfiSearch size={19} />
          </button>
          <button
            onClick={SearchRecognition}
            className={` border-black ${
              toggle !== true ? "bg-blue-500" : "bg-gray-600"
            } py-2 px-2 lg:px-2 lg:py-3 rounded-full  h-[auto] w-[35px] ml-[-10px] cursor-pointer`}
          >
            <MdKeyboardVoice size={20} />
          </button>
        </div>

        <div className="flex items-center w-auto">
          <div className="mr-2 md:mr-6">
            <DayNight toggle={toggle} handleToggle={handleToggle} />
          </div>
          <button
            onClick={handleOpenModal}
            className={`lg:px-4 lg:py-2 p-2 ${
              toggle == false ? "bg-blue-500" : "bg-gray-600"
            } text-white rounded-md`}
          >
            <span className="lg:inline hidden">Add Video</span>
            <span className="lg:hidden md:inline">
              <FaPlusCircle />
            </span>
          </button>
        </div>
      </div>

      <div
        className={`flex justify-between ${
          currentVideoIndex == null
            ? "flex-row"
            : " flex-col-reverse lg:flex-row"
        } `}
      >
        {model && (
          <SideBar
            handlebutton={handlebutton}
            toggle={toggle}
            button={button}
          />
        )}
        <div
          className={`${
            currentVideoIndex == null ? "w-[100%]" : "w-[100%] lg:!w-[30%]"
          } `}
        >
          <Playlist
            toggle={toggle}
            playlist={data}
            onVideoSelect={handleVideoSelect}
            currentVideoIndex={currentVideoIndex}
            setPlaylist={setPlaylist}
          />
        </div>
        {currentVideoIndex !== null && (
          <div className="p-4 w-[100%] lg:w-[70%]">
            <VideoPlayer
              toggle={toggle}
              video={playlist[currentVideoIndex]}
              playlist={playlist}
              handleLike={handleLike}
              handleFav={handleFav}
            />
          </div>
        )}
      </div>

      <AddVideoModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSave={handleSaveVideo}
      />
      {voice && (
        <>
          <div className="fixed bottom-0 bg-white text-red-400 p-4 w-[100%] flex justify-center items-center gap-2">
            <RiVoiceprintFill />
            Listing to you ......
          </div>
        </>
      )}
    </div>
  );
};

export default App;
