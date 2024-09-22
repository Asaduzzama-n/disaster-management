"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Minus, SquarePen, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { crisisSchema } from "@/lib/schema";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import toast from "react-hot-toast";
import { VercelLogoIcon } from "@radix-ui/react-icons";

enum CrisisSeverity {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical",
}

type CrisisFormValues = {
  title: string;
  description: string;
  imageUrls: File[];
  locations: string;
  severity: CrisisSeverity;
  status: string;
  requiredHelp: string;
};

export default function CreateCrisis() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm<CrisisFormValues>({
    resolver: yupResolver(crisisSchema),
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [selectedFilesLabel, setSelectedFilesLabel] = useState("Choose Images");

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const uploadedImages = Array.from(e.target.files).slice(0, 4); // Limit to 4 images
      setValue("imageUrls", uploadedImages); // Store files in form state

      // Update label to show number of selected files
      setSelectedFilesLabel(`${uploadedImages.length} file(s) selected`);

      // Create image previews
      const imagePreviewUrls = uploadedImages.map((file) =>
        URL.createObjectURL(file)
      );
      setImagePreviews(imagePreviewUrls); // Store URLs for previewing images
    } else {
      setValue("imageUrls", []); // Ensure imageUrls is always an array
      setSelectedFilesLabel("Choose Images"); // Reset label if no files
    }
  };

  // Function to remove image
  const removeImage = (index: number) => {
    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);
    const updatedImages = getValues("imageUrls").filter((_, i) => i !== index);
    setImagePreviews(updatedPreviews); // Update image previews
    setValue("imageUrls", updatedImages); // Update form value
    setSelectedFilesLabel(`${updatedImages.length} file(s) selected`);
  };

  const onSubmit = async (data: CrisisFormValues) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    // Convert locations to an array and append it
    data.locations.split(",").forEach((loc) => {
      formData.append("locations[]", loc.trim());
    });

    formData.append("severity", data.severity);
    formData.append("status", data.status);
    formData.append("requiredHelp", data.requiredHelp);

    // Append image files
    data.imageUrls.forEach((file) => {
      formData.append("imageUrls", file);
    });

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASEURL}/crisis/`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      console.log("Success:", result);
      toast.success(result?.message);
    } catch (error) {
      toast.error("Something went wrong please try again.");
      console.error("Error:", error);
    }
  };
  return (
    <div className="text-center md:flex justify-evenly items-center bg-bg dark:bg-bgd p-4 rounded-md">
      <h1 className="text-lg md:text-2xl font-semibold md:w-1/2">
        Empower your community by creating a{" "}
        <span className="text-primary text-3xl md:text-4xl">crisis</span> report
        and <span className="text-primary text-3xl md:text-4xl">guiding</span>{" "}
        responders to the right location.
      </h1>
      <div>
        <Dialog>
          <DialogTrigger asChild>
            <button className="w-40 rounded-sm font-medium text-primary bg-primary/15 p-2 mt-5 mx-auto flex items-center justify-center hover:opacity-80">
              Report Crisis
              <SquarePen className="ml-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Report a Crisis</DialogTitle>
            </DialogHeader>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-4 rounded-md mx-auto p-4 bg-bg dark:bg-bgd "
            >
              {/* Title Field */}
              <div>
                <label htmlFor="title" className="text-sm font-medium">
                  Title
                </label>
                <input
                  {...register("title")}
                  className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
                  placeholder="Crisis Title"
                />
                <small className="text-red-500">{errors.title?.message}</small>
              </div>

              {/* Description Field */}
              <div>
                <label htmlFor="description" className="text-sm font-medium">
                  Description
                </label>
                <textarea
                  {...register("description")}
                  className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
                  placeholder="Describe the crisis..."
                />
                <small className="text-red-500">
                  {errors.description?.message}
                </small>
              </div>

              {/* Custom Image Upload */}
              <div>
                <div className="flex items-center p-2">
                  <label htmlFor="imageUrls" className="text-sm font-medium">
                    Upload Images (Max 4)
                  </label>
                  <div className="flex  items-center space-x-3">
                    {/* Hidden File Input */}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      id="imageUrls"
                      className="hidden"
                    />

                    {/* Custom Upload Button */}
                    <label
                      htmlFor="imageUrls"
                      className="bg-primary/15 text-gray-500 px-4 py-2 rounded-md cursor-pointer "
                    >
                      {selectedFilesLabel}
                    </label>
                  </div>
                </div>
                <small className="text-red-500">
                  {errors.imageUrls?.message}
                </small>

                {/* Preview Section with Remove Button */}
                <div className="flex mt-2 space-x-2">
                  {imagePreviews.map((url, index) => (
                    <div key={index} className="relative">
                      <img
                        src={url}
                        alt={`Preview ${index + 1}`}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-1 right-1 bg-red-500/80 text-white rounded-full "
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations Field */}
              <div>
                <label htmlFor="locations" className="text-sm font-medium">
                  Locations
                </label>
                <input
                  {...register("locations")}
                  className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
                  placeholder="Enter locations separated by commas"
                />
                <small className="text-red-500">
                  {errors.locations?.message}
                </small>
              </div>

              {/* Severity Field */}
              <div>
                <label htmlFor="severity" className="text-sm font-medium">
                  Severity
                </label>
                <Select
                  onValueChange={(value: CrisisSeverity) =>
                    setValue("severity", value)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select severity" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select Severity</SelectLabel>
                      {Object.values(CrisisSeverity).map((severity) => (
                        <SelectItem key={severity} value={severity}>
                          {severity}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <small className="text-red-500">
                  {errors.severity?.message}
                </small>
              </div>

              {/* Required Help Field */}
              <div>
                <label htmlFor="requiredHelp" className="text-sm font-medium">
                  Required Help
                </label>
                <input
                  {...register("requiredHelp")}
                  className="outline-none focus:outline-none bg-primary/15 p-2 my-1 w-full rounded-sm"
                  placeholder="What help is needed?"
                />
                <small className="text-red-500">
                  {errors.requiredHelp?.message}
                </small>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-center">
                <button
                  type="submit"
                  className="w-40 bg-primary/15 p-2 mt-5 font-semibold text-primary rounded-sm"
                >
                  Create Crisis
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
