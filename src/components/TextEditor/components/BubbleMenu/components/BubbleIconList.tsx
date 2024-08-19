import React from "react";
import { IconType } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";

interface IBubbleIconListProps {
  onClick: () => void;
  Icon: IconType;
  size?: number;
  arrowSize?: number;
  active?: boolean;
}

const BubbleIconList = ({
  onClick,
  Icon,
  size = 14,
  arrowSize = 10,
  active,
}: IBubbleIconListProps) => {
  return (
    <div className="bubble-icon-list">
      <button type="button" onClick={onClick} className={`bubble-icon-item ${active ? "active" : ""}`}>
        <Icon size={size} />
        <IoIosArrowDown size={arrowSize} />
      </button>
    </div>
  );
};

export default BubbleIconList;
