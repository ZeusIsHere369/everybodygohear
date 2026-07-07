"use client";

import { useState } from "react";
import { createArticle } from "../../lib/articles";
import { createSlug } from "../../lib/slug";
import { uploadImage } from "../../lib/storage";

export default function Newsroom() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Breaking");
  const [image, setImage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [author, setAuthor] = useState("");
  const [featured, setFeatured] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!selectedFile) {
      alert("Please choose an image first.");
      return;
    }

    try {
      setUploading(true);

      const url = await uploadImage(selectedFile);

      setImage(url);

      alert("Image uploaded successfully!");
    } catch (err) {
      console.error(err);
      alert("Image upload failed.");
    } finally {
      setUploading(false);
    }
  }

  async function publishArticle() {
    if (!title || !author) {
      alert("Please complete all required fields.");
      return;
    }

    try {
      await createArticle({
        headline: title,
        summary,
        content,
        slug: createSlug(title),
        category,
        image_url: image,
        author,
        featured,
        published: true,
      });

      alert("Article published successfully!");
    } catch (err) {
      console.error(err);
      alert(JSON.stringify(err, null, 2));
    }
  }

  return (
    <main
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <h1 style={{ marginBottom: "20px", color: "#FFD700" }}>
        EGH NEWSROOM
      </h1>

      <input
        type="text"
        placeholder="Headline"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Article Summary"
        value={summary}
        onChange={(e) => setSummary(e.target.value)}
        rows={4}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <textarea
        placeholder="Full Article Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={12}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setSelectedFile(e.target.files?.[0] ?? null)
        }
        style={{
          marginBottom: "15px",
        }}
      />

      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          marginBottom: "15px",
          background: "#2563EB",
          color: "#fff",
          padding: "10px 20px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        {uploading ? "Uploading..." : "Upload Image"}
      </button>

      <input
        type="text"
        placeholder="Image URL (filled automatically after upload)"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      {image && (
        <img
          src={image}
          alt="Preview"
          style={{
            width: "100%",
            maxHeight: "300px",
            objectFit: "cover",
            borderRadius: "10px",
            marginBottom: "20px",
          }}
        />
      )}
<input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      >
        <option>Breaking</option>
        <option>Politics</option>
        <option>Business</option>
        <option>Sports</option>
        <option>Entertainment</option>
        <option>World</option>
        <option>Markets</option>
      </select>

      <label
        style={{
          display: "block",
          marginBottom: "20px",
        }}
      >
        <input
          type="checkbox"
          checked={featured}
          onChange={(e) => setFeatured(e.target.checked)}
        />{" "}
        Featured Story
      </label>

      <button
        onClick={publishArticle}
        style={{
          background: "#FFD700",
          color: "#000",
          padding: "14px 30px",
          border: "none",
          cursor: "pointer",
          fontWeight: "bold",
          borderRadius: "8px",
        }}
      >
        Publish Article
      </button>
    </main>
  );
}
