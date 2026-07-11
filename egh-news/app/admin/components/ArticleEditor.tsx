"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";

export default function ArticleEditor() {
  const editor = useEditor({
    extensions: [
      StarterKit,

      Placeholder.configure({
        placeholder: "Start writing your article...",
      }),

      Link.configure({
        openOnClick: false,
      }),
    ],

    content: "",

    editorProps: {
      attributes: {
        class:
          "prose prose-lg max-w-none min-h-[450px] rounded-lg border p-5 focus:outline-none",
      },
    },
  });

  if (!editor) return null;

  return (
    <div className="rounded-xl bg-white p-6 shadow">

      <h2 className="mb-6 text-2xl font-bold">
        Article Content
      </h2>

      {/* Toolbar */}

      <div className="mb-4 flex flex-wrap gap-2">

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className="rounded bg-gray-200 px-3 py-2 font-bold hover:bg-yellow-400"
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className="rounded bg-gray-200 px-3 py-2 italic hover:bg-yellow-400"
        >
          I
        </button>

        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="rounded bg-gray-200 px-3 py-2 hover:bg-yellow-400"
        >
          H2
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="rounded bg-gray-200 px-3 py-2 hover:bg-yellow-400"
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="rounded bg-gray-200 px-3 py-2 hover:bg-yellow-400"
        >
          1. List
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          className="rounded bg-gray-200 px-3 py-2 hover:bg-yellow-400"
        >
          Quote
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded bg-gray-200 px-3 py-2 hover:bg-yellow-400"
        >
          Undo
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded bg-gray-200 px-3 py-2 hover:bg-yellow-400"
        >
          Redo
        </button>

      </div>

      {/* Editor */}

      <EditorContent editor={editor} />

    </div>
  );
}