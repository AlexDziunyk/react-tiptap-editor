import { useEditor, EditorContent, JSONContent } from "@tiptap/react";
import CustomBubbleMenu from "./components/BubbleMenu/CustomBubbleMenu";
import "./style.scss";
import { tiptapExtensions } from "../../utils/tiptapExtensions";
import Button from "../Button/Button";

const TextEditor = () => {
  const editor = useEditor({
    extensions: tiptapExtensions,
    content: "<p>Hello World! 🌎️</p>",
  });

  const handleGetJson = (data: JSONContent) => {
    const fileName = "json-file";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  const handleGetHtml = (data: string) => {
    const fileName = "html-file";
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: "application/html" });
    const href = URL.createObjectURL(blob);

    // create "a" HTLM element with href to file
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".html";
    document.body.appendChild(link);
    link.click();

    // clean up "a" element & remove ObjectURL
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  };

  return (
    <div className="text-editor">
      {editor && <CustomBubbleMenu editor={editor} />}
      <EditorContent editor={editor} />
      <div className="buttons">
        <Button
          text="Get HTML"
          onClick={() => {
            if (editor) {
              handleGetHtml(editor.getHTML());
            }
          }}
        />
        <Button
          text="Get JSON"
          onClick={() => {
            if (editor) {
              handleGetJson(editor.getJSON());
            }
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
