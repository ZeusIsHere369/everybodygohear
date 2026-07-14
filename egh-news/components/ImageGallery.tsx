"use client";

import { useEffect, useState } from "react";

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
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const currentImage =
    selectedIndex !== null ? images[selectedIndex] : null;

  function openImage(index: number) {
    setSelectedIndex(index);
  }

  function closeImage() {
    setSelectedIndex(null);
  }

  function nextImage() {
    if (selectedIndex === null) return;

    setSelectedIndex((selectedIndex + 1) % images.length);
  }

  function previousImage() {
    if (selectedIndex === null) return;

    setSelectedIndex(
      (selectedIndex - 1 + images.length) % images.length
    );
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (selectedIndex === null) return;

      if (e.key === "Escape") {
        closeImage();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        previousImage();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () =>
      window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex]);

  return (
    <>
      {/* Gallery */}
      <section className="mt-16">

        <h2 className="mb-6 text-3xl font-bold">
          📸 Photo Gallery
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {images.map((image, index) => (

            <button
              key={image.id}
              onClick={() => openImage(index)}
              className="overflow-hidden rounded-xl shadow-lg transition duration-300 hover:scale-105"
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
      {currentImage && (

        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-6"
          onClick={closeImage}
        >

          <div
            className="max-w-6xl"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Counter */}
            <div className="mb-4 text-center text-white text-lg font-semibold">
              {selectedIndex! + 1} / {images.length}
            </div>

            {/* Image */}
            <img
              src={currentImage.image_url}
              alt={currentImage.caption || ""}
              className="max-h-[75vh] rounded-xl shadow-2xl"
            />

            {/* Caption */}
            {currentImage.caption && (

              <p className="mt-5 text-center text-lg text-white">
                {currentImage.caption}
              </p>

            )}

            {/* Navigation */}
            <div className="mt-8 flex justify-between gap-4">

              <button
                onClick={previousImage}
                className="rounded-lg bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-500"
              >
                ⬅ Previous
              </button>

              <button
                onClick={closeImage}
                className="rounded-lg bg-red-600 px-6 py-3 font-bold text-white hover:bg-red-700"
              >
                Close
              </button>

              <button
                onClick={nextImage}
                className="rounded-lg bg-yellow-400 px-6 py-3 font-bold text-black hover:bg-yellow-500"
              >
                Next ➡
              </button>

            </div>

            <p className="mt-6 text-center text-sm text-gray-300">
              Keyboard shortcuts:
              <br />
              ← Previous | → Next | Esc Close
            </p>

          </div>

        </div>

      )}

    </>
  );
}