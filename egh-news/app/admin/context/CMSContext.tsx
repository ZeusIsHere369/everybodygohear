"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type CMSContextType = {
  headline: string;
  setHeadline: (value: string) => void;

  summary: string;
  setSummary: (value: string) => void;

  author: string;
  setAuthor: (value: string) => void;

  category: string;
  setCategory: (value: string) => void;

  imageUrl: string;
  setImageUrl: (value: string) => void;
  galleryImages: string[];
setGalleryImages: (value: string[]) => void;

  content: string;
  setContent: (value: string) => void;

  featured: boolean;
  setFeatured: (value: boolean) => void;

  published: boolean;
  setPublished: (value: boolean) => void;
  editingId: number | null;
setEditingId: (value: number | null) => void;

isEditing: boolean;
setIsEditing: (value: boolean) => void;
};

const CMSContext = createContext<CMSContextType | null>(null);

export function CMSProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [headline, setHeadline] = useState("");
  const [summary, setSummary] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("Breaking");
  const [imageUrl, setImageUrl] = useState("");
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [content, setContent] = useState("");
  const [featured, setFeatured] = useState(false);
  const [published, setPublished] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  return (
    <CMSContext.Provider
      value={{
        headline,
        setHeadline,

        summary,
        setSummary,

        author,
        setAuthor,

        category,
        setCategory,

        imageUrl,
        setImageUrl,

        galleryImages,
        setGalleryImages,

        content,
        setContent,

        featured,
        setFeatured,

        published,
        setPublished,
        editingId,
        setEditingId,
        isEditing,
        setIsEditing,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
}

export function useCMS() {
  const context = useContext(CMSContext);

  if (!context) {
    throw new Error("useCMS must be used inside CMSProvider");
  }

  return context;
}