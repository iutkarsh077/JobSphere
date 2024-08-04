"use client;"
import React, { MouseEvent, useState } from 'react';
import { toast } from '../ui/use-toast';
import axios from "axios";
import { MdCloudUpload } from "react-icons/md";
const ImageUploadDialog = ({ isOpen, onClose, type }: any) => {
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [fileInputPlaceholder, setFileInputPlaceholder] =
  useState<string>("No file Chosen");
  const [isUploading, setIsuploading] = useState(false);

  const handleSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
      if(!selectedFile){
        toast({
          title: "No Image",
          description: "Please Select a image",
       })
      }
    const formData = new FormData();
    if (selectedFile) {
      // console.log(selectedFile)
      formData.append("file", selectedFile);
      formData.append("type", type);
    }

    try {
      // console.log(formData);
      setIsuploading(true);
      const response = await axios.post("/api/ProfileImageHandler", formData);
     const data = await response.data;
    //  console.log(data);
     toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
     })
     setSelectedFile(null);
     setFileInputPlaceholder("No file chosen");
    } catch (error: any) {
      // console.log(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later",
      });
    }finally{
      setIsuploading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let file = event.target.files ? event.target.files[0] : null;
    if (file?.type === "application/pdf" || file?.type === "application/msword" || file?.type === "video/mp4" || file?.type === "application/x-zip-compressed") {
      toast({
        title: "Unsupported file type",
        description: "Please upload an image file",
      });
      setFileInputPlaceholder("Select a file");
      file = null;
      setSelectedFile("");
      return;
    }
    setSelectedFile(file);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
  <div className="bg-white rounded-lg shadow-lg p-6 w-80">
    <div className="flex flex-col items-center bg-gray-100 rounded-md p-4">
      <h2 className="text-xl font-semibold mb-4">Upload Image</h2>
      <MdCloudUpload size={48} className="text-gray-600 mb-4" />
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        className="cursor-pointer text-gray-600 bg-white rounded-md border border-gray-300 p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      />
    </div>
    <div className="mt-4 flex justify-end">
      <button
        onClick={onClose}
        className="mr-2 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
      <button
        onClick={handleSubmit}
        disabled={selectedFile === null}
        className={`px-4 py-2 rounded text-white ${
          selectedFile ? 'bg-blue-500 hover:bg-blue-600' : 'bg-blue-300 cursor-not-allowed'
        } focus:outline-none focus:ring-2 focus:ring-blue-500`}
      >
        {
          isUploading ? "Please Wait" : "Upload"
        }
      </button>
    </div>
  </div>
</div>

  );
};

export default ImageUploadDialog;
