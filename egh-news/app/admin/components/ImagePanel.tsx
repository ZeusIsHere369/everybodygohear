"use client";

import { useCMS } from "../context/CMSContext";

export default function ImagePanel() {
  const {
    imageUrl,
    setImageUrl,
    galleryImages,
    setGalleryImages,
  } = useCMS();

  function updateGalleryImage(index: number, value: string) {
    const updated = [...galleryImages];
    updated[index] = value;
    setGalleryImages(updated);
  }

  function addGalleryImage() {
    setGalleryImages([...galleryImages, ""]);
  }

  function removeGalleryImage(index: number) {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
  }

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-5 text-xl font-bold">
        Featured Image
      </h2>

      <input
        type="text"
        placeholder="Paste Hero Image URL..."
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
        className="mb-8 w-full rounded-lg border p-3"
      />

      <h2 className="mb-4 text-xl font-bold">
        Gallery Images
      </h2>

      <div className="space-y-4">

        {galleryImages.map((image, index) => (

          <div
            key={index}
            className="flex gap-2"
          >

            <input
              type="text"
              placeholder={`Gallery Image ${index + 1}`}
              value={image}
              onChange={(e) =>
                updateGalleryImage(index, e.target.value)
              }
              className="flex-1 rounded-lg border p-3"
            />

            <button
              type="button"
              onClick={() => removeGalleryImage(index)}
              className="rounded-lg bg-red-500 px-4 text-white hover:bg-red-600"
            >
              ✕
            </button>

          </div>

        ))}

      </div>

      <button
        type="button"
        onClick={addGalleryImage}
        className="mt-5 w-full rounded-lg bg-yellow-400 py-3 font-bold text-black hover:bg-yellow-500"
      >
        + Add Gallery Image
      </button>

    </div>
  );
}