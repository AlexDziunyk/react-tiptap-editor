import { BubbleMenu, Editor } from "@tiptap/react";
import BubbleIconItem from "./components/BubbleIconItem";
import { FaBold } from "react-icons/fa";
import { FaItalic } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { AiOutlineStrikethrough } from "react-icons/ai";
import { IoCodeSlashOutline } from "react-icons/io5";
import { IoIosLink } from "react-icons/io";
import BubbleSelectList from "./components/BubbleSelectList";
import Input from "../../../Input/Input";
import BubbleIconList from "./components/BubbleIconList";
import { useEffect, useRef, useState } from "react";
import { BiFontColor } from "react-icons/bi";
import { backgroundsArr, colorsArr, IColorObj } from "../../../../utils/colors";
import "./style.scss";
import { useMyEditor } from "../../../../hooks/useMyEditor";
import ListLetterItem from "./components/ListLetterItem";
import ListIconItem from "./components/ListIconItem";
import { TbH1, TbH2, TbH3 } from "react-icons/tb";
import { BsBlockquoteLeft } from "react-icons/bs";
import { MdFormatListBulleted } from "react-icons/md";
import { GoListOrdered } from "react-icons/go";
import { GoTasklist } from "react-icons/go";
import { MdOutlineTextFields } from "react-icons/md";
import { CiImageOn } from "react-icons/ci";

interface IBubbleMenuProps {
  editor: Editor;
}

const CustomBubbleMenu = ({ editor }: IBubbleMenuProps) => {
  const imageRef = useRef<HTMLInputElement>(null);

  const [linkList, setLinkList] = useState<boolean>(false);
  const linkListRef = useRef<HTMLInputElement>(null);
  const [linkValue, setLinkValue] = useState<string>("");

  const [colorList, setColorList] = useState<boolean>(false);
  const colorListRef = useRef<HTMLInputElement>(null);

  const [textList, setTextList] = useState<boolean>(false);
  const textListRef = useRef<HTMLInputElement>(null);

  const {
    handleBold,
    handleCode,
    handleColor,
    handleHighlight,
    handleItalic,
    handleLineThrough,
    handleLink,
    handleSaveLink,
    handleUnderline,
    handleBlockquote,
    handleBulletList,
    handleHeading,
    handleOrderedList,
    handleTaskList,
    handleImage,
  } = useMyEditor(editor);

  useEffect(() => {
    const handleClickLinkOutSide = (event: MouseEvent) => {
      if (
        linkListRef.current &&
        !linkListRef.current.contains(event.target as Node)
      ) {
        setLinkList(false);
        setLinkValue("");
      }
    };

    const handleClickColorsOutSide = (event: MouseEvent) => {
      if (
        colorListRef.current &&
        !colorListRef.current.contains(event.target as Node)
      ) {
        setColorList(false);
      }
    };

    const handleClickTextOutside = (event: MouseEvent) => {
      if (
        textListRef.current &&
        !textListRef.current.contains(event.target as Node)
      ) {
        setTextList(false);
      }
    };

    document.addEventListener("mousedown", handleClickLinkOutSide);
    document.addEventListener("mousedown", handleClickColorsOutSide);
    document.addEventListener("mousedown", handleClickTextOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickLinkOutSide);
      document.removeEventListener("mousedown", handleClickColorsOutSide);
      document.removeEventListener("mousedown", handleClickTextOutside);
    };
  }, [linkListRef]);

  useEffect(() => {
    if (linkList === false) {
      setLinkValue("");
    }
  }, [linkList]);

  return (
    <div className="bubble-menu__wrapper">
      <BubbleMenu
        className="bubble-menu"
        editor={editor}
        tippyOptions={{ duration: 100, zIndex: 3 }}
      >
        <BubbleIconItem
          active={editor.isActive("bold")}
          onClick={handleBold}
          Icon={FaBold}
        />
        <BubbleIconItem
          active={editor.isActive("italic")}
          onClick={handleItalic}
          Icon={FaItalic}
        />
        <BubbleIconItem
          active={editor.isActive("underline")}
          onClick={handleUnderline}
          Icon={FaUnderline}
        />
        <BubbleIconItem
          active={editor.isActive("strike")}
          onClick={handleLineThrough}
          Icon={AiOutlineStrikethrough}
        />
        <BubbleIconItem
          active={editor.isActive("code")}
          onClick={handleCode}
          Icon={IoCodeSlashOutline}
        />
        <BubbleIconList
          active={editor.isActive("link")}
          onClick={() => {
            if (editor.isActive("link")) {
              handleLink();
            } else {
              setLinkList(true);
            }
          }}
          Icon={IoIosLink}
        />
        <BubbleIconList onClick={() => setColorList(true)} Icon={BiFontColor} />
        <BubbleIconList
          onClick={() => setTextList(true)}
          Icon={MdOutlineTextFields}
        />
        <BubbleIconItem
          //active={editor.isActive("image")}
          onClick={() => imageRef.current?.click()}
          Icon={CiImageOn}
        />
        <input
          onChange={(e) => handleImage(e)}
          accept="image/*"
          ref={imageRef}
          hidden
          type="file"
        />
        {linkList && !editor.isActive("link") && (
          <BubbleSelectList>
            <div ref={linkListRef} className="link__wrapper">
              <Input
                value={linkValue}
                onChange={(e) => setLinkValue(e.target.value)}
                placeholder="Write your link in here"
              />
              <button
                disabled={linkValue.length === 0}
                type="button"
                onClick={() => {
                  handleSaveLink(linkValue);
                  setLinkList(false);
                }}
                className="link__button_save"
              >
                Save Link
              </button>
            </div>
          </BubbleSelectList>
        )}
        {colorList && (
          <BubbleSelectList>
            <div ref={colorListRef} className="color__wrapper">
              <span className="section__title">Color</span>
              <div className="colors__col">
                {colorsArr.map(({ color, colorName }: IColorObj, index) => (
                  <ListLetterItem
                    key={index}
                    onClick={() => {
                      handleColor(color, index);
                      setColorList(false);
                    }}
                    color={color}
                    colorName={colorName}
                    active={editor.isActive("textStyle", { color })}
                  />
                ))}
              </div>
              <span className="section__title">Background</span>
              <div className="colors__col">
                {backgroundsArr.map(
                  ({ color, colorName }: IColorObj, index) => (
                    <ListLetterItem
                      key={index}
                      onClick={() => {
                        handleHighlight(color, index);
                        setColorList(false);
                      }}
                      background={color}
                      colorName={colorName}
                      active={editor.isActive("highlight", { color })}
                    />
                  )
                )}
              </div>
            </div>
          </BubbleSelectList>
        )}
        {textList && (
          <BubbleSelectList>
            <div ref={textListRef} className="text__wrapper">
              <span className="section__title">Turn into</span>
              <ListIconItem
                onClick={() => {
                  handleHeading(1);
                  setTextList(false);
                }}
                Icon={TbH1}
                name={"Heading 1"}
              />
              <ListIconItem
                onClick={() => {
                  handleHeading(2);
                  setTextList(false);
                }}
                Icon={TbH2}
                name={"Heading 2"}
              />
              <ListIconItem
                onClick={() => {
                  handleHeading(3);
                  setTextList(false);
                }}
                Icon={TbH3}
                name={"Heading 3"}
              />
              <ListIconItem
                onClick={() => {
                  handleBlockquote();
                  setTextList(false);
                }}
                Icon={BsBlockquoteLeft}
                name={"Quote"}
              />
              <ListIconItem
                onClick={() => {
                  handleBulletList();
                  setTextList(false);
                }}
                Icon={MdFormatListBulleted}
                name={"Bullet list"}
              />
              <ListIconItem
                onClick={() => {
                  handleOrderedList();
                  setTextList(false);
                }}
                Icon={GoListOrdered}
                name={"Ordered list"}
              />
              <ListIconItem
                onClick={() => {
                  handleTaskList();
                  setTextList(false);
                }}
                Icon={GoTasklist}
                name={"Task list"}
              />
            </div>
          </BubbleSelectList>
        )}
      </BubbleMenu>
    </div>
  );
};

export default CustomBubbleMenu;
