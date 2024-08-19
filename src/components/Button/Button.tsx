import './style.scss';

interface IButtonProps {
  text: string;
  onClick: () => void;
}

const Button = ({ text, onClick }: IButtonProps) => {
  return (
    <button type='button' onClick={onClick} className='button'>
      {text}
    </button>
  )
}

export default Button