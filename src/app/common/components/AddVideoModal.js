import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import Input from "../form/Input";
import Button from "../form/Button";
import { FaFileUpload } from "react-icons/fa";

const AddVideoModal = ({ isOpen, onClose, onSave }) => {
  const [videoName, setVideoName] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [description, setDescription] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSaveDisabled, setIsSaveDisabled] = useState(false);

  const handleSave = () => {
    if (thumbnail && videoUrl && videoName && description) {
      onSave({
        title: videoName,
        thumbnail: thumbnail,
        url: videoUrl,
        desc: description,
      });
      onClose();
    } else {
      alert(
        "Please upload both thumbnail image, video, provide a video name, and description."
      );
    }
  };

  const onThumbnailDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnail(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an image file.");
    }
  };

  const onVideoDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file.type === "video/mp4") {
      setIsProcessing(true);
      setIsSaveDisabled(true); // Disable save button while processing
      const reader = new FileReader();
      reader.onload = () => {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        setIsProcessing(false);
        setIsSaveDisabled(false); // Enable save button after processing
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload an MP4 video file.");
    }
  };

  const {
    getRootProps: getThumbnailRootProps,
    getInputProps: getThumbnailInputProps,
  } = useDropzone({
    onDrop: onThumbnailDrop,
    accept: "image/*",
    multiple: false,
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } =
    useDropzone({
      onDrop: onVideoDrop,
      accept: "video/mp4",
      multiple: false,
    });

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[0%] md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">Add New Video</h2>
            <Input
              type="text"
              placeholder="Video Name"
              value={videoName}
              onChange={(e) => setVideoName(e.target.value)}
            />
            <div
              {...getThumbnailRootProps()}
              className="border border-dashed border-gray-400 rounded-md p-6 mb-4 w-full"
            >
              <input {...getThumbnailInputProps()} />
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Thumbnail"
                  className="w-full h-auto"
                  style={{ maxWidth: "150px" }}
                />
              ) : (
                <div className="text-gray-400 flex justify-center items-center gap-2">
                  <FaFileUpload color="gray" />
                  Drag and drop thumbnail image
                </div>
              )}
            </div>
            <div
              {...getVideoRootProps()}
              className="border border-dashed border-gray-400 rounded-md p-6 mb-4 w-full"
            >
              <input {...getVideoInputProps()} />
              {isProcessing ? (
                <p>Loading...</p>
              ) : videoUrl ? (
                <video
                  controls
                  className="w-full"
                  style={{ maxWidth: "150px" }}
                >
                  <source src={videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div className="text-gray-400 flex justify-center items-center gap-2">
                  <FaFileUpload color="gray" />
                  Drag and drop video file(MP4)
                </div>
              )}
            </div>

            <Input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                onClick={onClose}
                className="px-3 mx-2 bg-red-400 rounded-md"
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className={`px-4 py-2 bg-blue-500 text-white rounded-md ${
                  isSaveDisabled ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Save
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddVideoModal;
