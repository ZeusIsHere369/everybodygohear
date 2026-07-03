"use client";

import { useState } from "react";
import { createArticle } from "../../lib/articles";

export default function Newsroom() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [category, setCategory] = useState("Breaking");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [featured, setFeatured] = useState(false);

  async function publishArticle() {
    if (!title || !author) {
      alert("Please complete all required fields.");
      return;
    }

    await createArticle({
      title,
      summary,
      category,
      image,
      author,
      featured,
    });

    alert("Article published successfully!");

    setTitle("");
    setSummary("");
    setCategory("Breaking");
    setImage("");
    setAuthor("");
    setFeatured(false);
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
        rows={6}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "15px",
        }}
      />

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
