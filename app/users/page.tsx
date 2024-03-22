"use client";
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const UserPage: any = () => {
  const [propName, setPropName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File[]>([]);

  const router = useRouter();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files ?? []);
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];
    const invalidFiles = selectedFiles.filter(
      (file) => !allowedTypes.includes(file.type)
    );
    if (invalidFiles.length > 0) {
      // Invalid file format selected
      toast.error(
        "🚫 Invalid file format! Only PNG, JPG, and JPEG files are allowed.",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    } else {
      // Valid files selected
      setFile(selectedFiles);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file.length === 0) {
      // No file selected, display error toast
      toast.error("Please select at least one Valid file.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return; // Prevent form submission
    }

    const formData = new FormData();
    formData.append("propertyName", propName);
    formData.append("description", description);
    // Append each file individually
    file.forEach((file, index) => {
      formData.append("images", file, file.name);
    });

    console.log("Files State :", file, file.length, file[0]);
    const formDataEntries = Array.from(formData.entries());

    // Log each key-value pair
    formDataEntries.forEach(([key, value]) => {
      console.log("FormData :: ", `${key}:`, value);
    });
    try {
      const response = await fetch("http://localhost:3000/", {
        method: "POST",
        body: formData,
      });

      console.log("Res :", response);
      if (response.ok) {
        console.log("Data successfully submitted!");
        toast.success("🦄 Data successfully submitted!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
          onClose: () => router.push("/"),
        });
        // Reset form fields
        setPropName("");
        setDescription("");
        setFile([]);
      } else {
        console.error("Failed to submit data.");
        toast.error("🦄 It Failed! Please Try Again", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } catch (error) {
      console.log("API Error :", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <ToastContainer />
      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">Add Your Rental Details</h1>
      </div>
      <div className="mt-4 w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <label className="input input-bordered flex items-center gap-2 mt-3 mb-3">
            Name:
            <input
              type="text"
              className="w-full px-4 py-2"
              placeholder="Enter property name"
              value={propName}
              required
              maxLength={20}
              onChange={(e) => setPropName(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2 mt-3 mb-3">
            Description:
            <input
              type="text"
              className="w-full px-4 py-2 resize-none"
              placeholder="Property description"
              maxLength={100}
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <input
            type="file"
            className="file-input w-full max-w-xs mb-3"
            onChange={handleFileChange}
            multiple
          />
          <button type="submit" className="btn btn-primary w-full">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserPage;
