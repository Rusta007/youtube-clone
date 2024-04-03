import React, { useRef, useState, useEffect } from "react";
import Button from "../form/Button";
import { IoExpandSharp, IoPlayOutline, IoPauseOutline } from "react-icons/io5";

const VideoPlayer = ({ video, playlist, onVideoEnd }) => {
  const videoRef = useRef(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(video.id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  useEffect(() => {
    setCurrentVideoIndex(video.id);
  }, [video]);

  useEffect(() => {
    if (
      videoRef.current &&
      isPlaying &&
      firstClick &&
      currentVideoIndex !== null
    ) {
      videoRef.current.play();
    }
  }, [playlist, currentVideoIndex, isPlaying, firstClick]);

  const playNextVideo = () => {
    const nextIndex = (currentVideoIndex + 1) % playlist.length;
    setCurrentVideoIndex(nextIndex);
  };

  const playPrevVideo = () => {
    const prevIndex =
      currentVideoIndex === 0 ? playlist.length - 1 : currentVideoIndex - 1;
    setCurrentVideoIndex(prevIndex);
  };

  const handlePlayPause = () => {
    if (firstClick) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setFirstClick(false);
    }
  };

  const handleSeek = (event) => {
    const newTime = event.target.value;
    videoRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
  };

  const handlePlaybackSpeedChange = (event) => {
    const speed = parseFloat(event.target.value);
    setPlaybackSpeed(speed);
    if (speed === 0) {
      videoRef.current.playbackRate = 1;
    } else if (speed < 0) {
      videoRef.current.playbackRate = Math.abs(1 / speed);
    } else {
      videoRef.current.playbackRate = speed;
    }
  };

  const toggleFullScreen = () => {
    if (!isFullScreen) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  const handleEnded = () => {
    playNextVideo();
    onVideoEnd && onVideoEnd();
  };

  const handleKeyDown = (event) => {
    if (event.key === "Escape" && isFullScreen) {
      toggleFullScreen();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullScreen]);

  return (
    <>
      <div className="">
        <video
          ref={videoRef}
          src={video.url}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleEnded}
          className=""
          autoPlay
        ></video>
        <div className="flex gap-2 items-center bg-gray-200 p-2">
          {/* <input type="button" onClick={playPrevVideo} value="Prev" /> */}
          <Button onClick={handlePlayPause}>
            {isPlaying ? (
              <IoPauseOutline size={24} />
            ) : (
              <IoPlayOutline size={24} />
            )}
          </Button>
          {/* <input type="button" onClick={playNextVideo} value="Next" /> */}
          <input
            type="range"
            min="0"
            max={videoRef.current ? videoRef.current.duration : 0}
            value={currentTime}
            onChange={handleSeek}
            className="flex-grow"
          />
          <span>
            {formatTime(currentTime)} /{" "}
            {formatTime(videoRef.current ? videoRef.current.duration : 0)}
          </span>
          <select
            value={playbackSpeed}
            onChange={handlePlaybackSpeedChange}
            className="bg-gray-200"
          >
            <option value="-2">-2x</option>
            <option value="-1.5">-1.5x</option>
            <option value="-1">-1x</option>
            <option value="1">Normal</option>
            <option value="1.5">1.5x</option>
            <option value="2">2x</option>
          </select>
          <Button onClick={toggleFullScreen}>
            <IoExpandSharp size={20} />
          </Button>
        </div>
      </div>
      <h1 className="font-extrabold text-xl pt-[20px]">{video.title}</h1>
      <div>
        <button className="border rounded m-1 px-4 py-2">Like</button>
        <button className="border rounded m-1 px-4 py-2">Favorite</button>
      </div>
      <p className="pt-[8px]">{video.desc}</p>
    </>
  );
};

const formatTime = (time) => {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
};

export default VideoPlayer;
