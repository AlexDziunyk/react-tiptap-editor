"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import CustomBubbleMenu from "./components/BubbleMenu/CustomBubbleMenu";
import "./style.scss";
import { tiptapExtensions } from "../../utils/tiptapExtensions";

const TextEditor = () => {
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: "<p>Hello World! 🌎️</p>",
  });

  return (
    <div className="text-editor">
      {editor && <CustomBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
    </div>
  );
};

export default TextEditor;
