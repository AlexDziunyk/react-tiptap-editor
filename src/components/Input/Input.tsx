import { ChangeEvent, useEffect, useRef } from "react";
import "./style.scss";

interface IInputProps {
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
  inputWrapperClassName?: string;
  placeholder: string;
}

const Input = ({
  value,
  onChange,
  inputClassName,
  inputWrapperClassName,
  placeholder,
}: IInputProps) => {

  
  return (
    <div className={`input__wrapper ${inputWrapperClassName}`}>
      <input
        type="text"
        placeholder={placeholder}
        className={`${inputClassName}`}
        value={value}
        onChange={onChange}
      ></input>
    </div>
  );
};

export default Input;
