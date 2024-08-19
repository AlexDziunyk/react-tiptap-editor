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

  const handleGetFile = (type: "json" | "html", data: string | JSONContent) => {
    const fileName = `${type}-file`;
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: `application/${type}` });
    const href = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + `.${type}`;
    document.body.appendChild(link);
    link.click();

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
              handleGetFile("html", editor.getHTML());
            }
          }}
        />
        <Button
          text="Get JSON"
          onClick={() => {
            if (editor) {
              handleGetFile("json", editor.getJSON());
            }
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
