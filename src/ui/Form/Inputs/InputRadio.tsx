import React, { ChangeEvent } from "react";
import styled from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";
import Error from "ui/Error";
import theme from "ui/Utils/Media/Theme/theme";
import { Row } from "ui/basic";
interface IInputRadio extends IInput {
    label?: string
    options: { label: string; value: any,
    colorActive? : string;
    colorDisabled? : string;
    icon : (color: string) => JSX.Element
    }[];
  onChange: (value: any) => void;
  error? : string
}

const RadioButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const RadioButtonOption = styled.label`
  display: inline-flex;
  align-items: center;
  margin-right: 1rem;
`;
const RadioButtonInput = styled.input`
  appearance: none;
  display: none;
  width: 16px;
  height: 16px;
  border-radius: 2px;
  background-color: ${({ theme }) => theme.neutralColor.bgLayout};
  padding: 4px;
  transition: background-color 0.3s ease;
  &:checked {
    background-color: ${({ theme }) => theme.brandColor.primaryActive};
  }
`;

const RadioButtonInputLabel = styled.label`display: inline-flex;
  margin-left: 0.5rem;
`;



const InputRadio: React.FC<IInputRadio> = ({
  label,
  options,
  value,
  onChange,
  labelTop = true,
  required = false,
  error
}) => {
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedOption = event.target.value;
    onChange(selectedOption);
  };

  return (
    <InputWrapper top={labelTop}>
      {label && 
        <Label top={labelTop}>
        {label}
        {required && <sup>*</sup>}
        </Label>}
        <Row a="center" p='0.5rem 0rem'>
          <RadioButtonWrapper>
            {options.map((option) => (
              <RadioButtonOption key={option.value}>
                <RadioButtonInput
                  type="radio"
                  name={label}
                  value={option.value}
                  checked={value === option.value}
                  onChange={handleInputChange}
                  required={required}
                />
                {option.icon(value === option.value ? option.colorActive || theme.brandColor.primaryActive : option.colorDisabled || theme.neutralColor.borderSecondary)}
                <RadioButtonInputLabel onClick={() => onChange(option.value)}>{option.label}</RadioButtonInputLabel>
              </RadioButtonOption>
            ))}
          </RadioButtonWrapper>
          {error && <Error>{error}</Error>}
       </Row>
    </InputWrapper>
  );
};

export default InputRadio;
