import { IconType } from "react-icons";

interface IBubbleIconItemProps {
  onClick: () => void;
  Icon: IconType;
  size?: number;
  active?: boolean;
}

const BubbleIconItem = ({ onClick, Icon, size = 14, active }: IBubbleIconItemProps) => {
  return (
    <button type="button" onClick={onClick} className={`bubble-icon-item ${active ? "active" : ""}`}>
      <Icon size={size} />
    </button>
  );
};

export default BubbleIconItem;
