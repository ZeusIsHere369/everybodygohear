"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

type Props = {
  content: string;
  onChange: (value: string) => void;
};

export default function Editor({ content, onChange }: Props) {
  const editor = useEditor({
    extensions: [StarterKit],
    content,

    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "10px",
        overflow: "hidden",
        marginBottom: "20px",
      }}
    >
      {/* Toolbar */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          padding: "10px",
          background: "#f5f5f5",
          borderBottom: "1px solid #ddd",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          Bold
        </button>

        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          Italic
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          H1
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          H2
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleBulletList().run()
          }
        >
          Bullet List
        </button>

        <button
          onClick={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          Numbered List
        </button>

        <button
          onClick={() => editor.chain().focus().undo().run()}
        >
          Undo
        </button>

        <button
          onClick={() => editor.chain().focus().redo().run()}
        >
          Redo
        </button>
      </div>

      {/* Editor */}
      <EditorContent
        editor={editor}
        style={{
          minHeight: "350px",
          padding: "15px",
          background: "white",
        }}
      />
    </div>
  );
}