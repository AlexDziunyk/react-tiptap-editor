import { FaCheck } from "react-icons/fa6";

interface IListLetterItemProps {
  onClick: () => void;
  color?: string;
  background?: string;
  colorName: string;
  active: boolean;
}

const ListLetterItem = ({ color, colorName, active, onClick, background }: IListLetterItemProps) => {
  return (
    <button type="button" onClick={onClick} className="text-color-item">
      <div className="value__wrapper">
        <div style={{backgroundColor: background}} className="letter__wrapper">
          <span style={{color}}>A</span>
        </div>
        <p>{colorName}</p>
      </div>
      {active && <FaCheck />}
    </button>
  );
};

export default ListLetterItem;
