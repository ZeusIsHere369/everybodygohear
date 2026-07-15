"use client";

import { useCMS } from "../context/CMSContext";

export default function ImagePanel() {
  const {
    imageUrl,
    setImageUrl,

    videoUrl,
    setVideoUrl,

    galleryImages,
    setGalleryImages,
  } = useCMS();

  function updateGalleryImage(
    index: number,
    value: string
  ) {
    const updated = [...galleryImages];
    updated[index] = value;
    setGalleryImages(updated);
  }

  function addGalleryImage() {
    setGalleryImages([
      ...galleryImages,
      "",
    ]);
  }

  function removeGalleryImage(index: number) {
    const updated = galleryImages.filter(
      (_, i) => i !== index
    );

    setGalleryImages(updated);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Media
      </h2>

      {/* Featured Image */}

      <label className="mb-2 block font-semibold">
        Featured Image
      </label>

      <input
        type="text"
        placeholder="Paste hero image URL..."
        value={imageUrl}
        onChange={(e) =>
          setImageUrl(e.target.value)
        }
        className="mb-6 w-full rounded-lg border p-3"
      />

      {/* YouTube Video */}

      <label className="mb-2 block font-semibold">
        YouTube Video
      </label>

      <input
        type="text"
        placeholder="Paste YouTube video URL..."
        value={videoUrl}
        onChange={(e) =>
          setVideoUrl(e.target.value)
        }
        className="mb-8 w-full rounded-lg border p-3"
      />

      {/* Gallery */}

      <div className="mb-4 flex items-center justify-between">

        <h3 className="text-lg font-bold">
          Gallery Images
        </h3>

        <button
          onClick={addGalleryImage}
          className="rounded-lg bg-yellow-400 px-4 py-2 font-bold"
        >
          + Add Image
        </button>

      </div>

      {galleryImages.map((image, index) => (

        <div
          key={index}
          className="mb-4 flex gap-3"
        >

          <input
            type="text"
            placeholder={`Gallery Image ${index + 1}`}
            value={image}
            onChange={(e) =>
              updateGalleryImage(
                index,
                e.target.value
              )
            }
            className="flex-1 rounded-lg border p-3"
          />

          <button
            onClick={() =>
              removeGalleryImage(index)
            }
            className="rounded-lg bg-red-600 px-4 text-white"
          >
            ✕
          </button>

        </div>

      ))}

    </div>
  );
}