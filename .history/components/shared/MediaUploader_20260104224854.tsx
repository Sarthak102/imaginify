"use client";

import React, { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";
import { dataUrl, getImageSize } from "@/lib/utils";
import { CldImage, CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { PlaceholderValue } from "next/dist/shared/lib/get-img-props";

type MediaUploaderProps = {
  onValueChange: (value: string) => void;
  setImage: React.Dispatch<any>;
  publicId: string;
  image: any;
  type: string;
};

const MediaUploader = ({
  onValueChange,
  setImage,
  image,
  publicId,
  type,
}: MediaUploaderProps) => {
  const { toast } = useToast();

  // 🔐 Persist open() safely
  const openRef = useRef<(() => void) | null>(null);

  const onUploadSuccessHandler = (result: any) => {
    const info = result?.info;
    if (!info) return;

    setImage((prev: any) => ({
      ...prev,
      publicId: info.public_id,
      width: info.width,
      height: info.height,
      secureURL: info.secure_url,
    }));

    onValueChange(info.public_id);

    toast({
      title: "Image uploaded successfully",
      description: "1 credit was deducted from your account",
      duration: 5000,
      className: "success-toast",
    });
  };

  const onUploadErrorHandler = () => {
    toast({
      title: "Upload failed",
      description: "Please try again",
      duration: 5000,
      className: "error-toast",
    });
  };

  const handleOpen = () => {
    if (!openRef.current) {
      console.warn("Cloudinary widget not ready yet");
      return;
    }
    openRef.current();
  };

  return (
    <CldUploadWidget
      uploadPreset="imaginify"
      options={{
        multiple: false,
        resourceType: "image",
      }}
      onSuccess={onUploadSuccessHandler}
      onError={onUploadErrorHandler}
    >
      {({ open }) => {
        // 🧠 Capture open safely once it exists
        if (open && !openRef.current) {
          openRef.current = open;
        }

        return (
          <div className="flex flex-col gap-4">
            <h3 className="h3-bold text-dark-600">Original</h3>

            {publicId ? (
              <div className="cursor-pointer overflow-hidden rounded-[10px]">
                <CldImage
                  width={getImageSize(type, image, "width")}
                  height={getImageSize(type, image, "height")}
                  src={publicId}
                  alt="image"
                  sizes="(max-width: 767px) 100vw, 50vw"
                  placeholder={dataUrl as PlaceholderValue}
                  className="media-uploader_cldImage"
                />
              </div>
            ) : (
              <div
                className={`media-uploader_cta ${
                  !openRef.current ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={handleOpen}
              >
                <div className="media-uploader_cta-image">
                  <Image
                    src="/assets/icons/add.svg"
                    alt="Add Image"
                    width={24}
                    height={24}
                  />
                </div>
                <p className="p-14-medium">
                  {openRef.current
                    ? "Click here to upload image"
                    : "Loading uploader…"}
                </p>
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default MediaUploader;
