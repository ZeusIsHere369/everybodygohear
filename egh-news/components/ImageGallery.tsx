"use client";

import { useState } from "react";

type GalleryImage = {
  id: number;
  image_url: string;
  caption?: string;
};

export default function ImageGallery({
  images,
}: {
  images: GalleryImage[];
}) {
  const [selectedImage, setSelectedImage] =
    useState<GalleryImage | null>(null);

  return (
    <>
      {/* Gallery Grid */}
      <section className="mt-16">

        <h2 className="mb-6 text-3xl font-bold">
          📸 Photo Gallery
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {images.map((image) => (

            <button
              key={image.id}
              onClick={() => setSelectedImage(image)}
              className="overflow-hidden rounded-xl shadow-lg transition hover:scale-105"
            >

              <img
                src={image.image_url}
                alt={image.caption || ""}
                className="h-72 w-full object-cover"
              />

            </button>

          ))}

        </div>

      </section>

      {/* Lightbox */}
      {selectedImage && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={() => setSelectedImage(null)}
        >

          <div
            className="max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >

            <img
              src={selectedImage.image_url}
              alt={selectedImage.caption || ""}
              className="max-h-[80vh] rounded-xl"
            />

            {selectedImage.caption && (

              <p className="mt-5 text-center text-white text-lg">
                {selectedImage.caption}
              </p>

            )}

            <button
              onClick={() => setSelectedImage(null)}
              className="mt-6 w-full rounded-lg bg-yellow-400 py-3 font-bold text-black"
            >
              Close
            </button>

          </div>

        </div>

      )}

    </>
  );
}