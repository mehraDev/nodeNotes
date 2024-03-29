import React, { ChangeEvent } from "react";
import styled, { useTheme } from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";
import Error from "ui/Error";
interface IInputInteger extends IInput{
  value: number | string | undefined ;
  onChange: (value:number | '') => void;
  width? : string
  borderColor? : string;
  error? : string
}

const Input = styled.input<{borderColor: string}>`
  color: ${({theme}) => theme.neutralColor.text};
  font-weight: 400;
  border-width : 1px;
  padding: 8px;
  font-size: 1rem;
  border-color: ${({theme}) => theme.neutralColor.border};
  transition: border-color 0.2s ease;
  width: ${({width}) => width ? width : '100%'} ;
  border-radius: 4px;
  border-style: solid;
  &:focus {
    border-color:${({borderColor,theme}) => borderColor ? borderColor : theme.brandColor.primary};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
    outline: none;
  }
  &:active {
    outline: none;
    border-color:${({borderColor}) => borderColor };
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

`;

const InputInteger: React.FC<IInputInteger> = ({
  label,
  value,
  onChange,
  required,
  labelTop = true,
  width,
  borderColor ,
  error
}) => {

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const integerValue   = Number(value);

    if (integerValue >= 0 && value !== '') {
        onChange(integerValue);
    } else if(value === ''){
        onChange(value)
    }

  };

  const theme = useTheme()

  return (
    <InputWrapper top={labelTop}>
      {label && 
        <Label top={labelTop}>
        {label}
        {required && '*'}
        </Label>}
        <div>
      <Input
        type="number"
        value={value}
        onChange={handleInputChange}
        required={required}
        placeholder="0"
        width={width}
        borderColor={borderColor ? borderColor : theme.brandColor.primary}
      />
      {error && <Error>{error}</Error>}
       </div>
    </InputWrapper>
  );
};

export default InputInteger;
