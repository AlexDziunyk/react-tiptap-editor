interface IBubbleSelectListProps {
  children: React.ReactNode | null;
}

const BubbleSelectList = ({ children }: IBubbleSelectListProps) => {
  return <div className="bubble-select-list">{children}</div>;
};

export default BubbleSelectList;
