import React, { ChangeEvent } from "react";
import styled, { css, useTheme } from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";
import Error from "ui/Error";
import Icon, { IconName } from "ui/Icon";
import { Box, Col, Row, Text } from "ui/basic";
import theme from "ui/Utils/Media/Theme/theme";

interface IInputTelephone extends IInput{
  value: string;
  onChange: (value:string) => void,
  borderColor?: string | undefined
  error? : string
  onBlur?: () => void;
  disabled?: boolean;
  onClick?:() => void,
  tt?: 'upp' | 'cap'
}
const Input = styled.input<{ hasValue: boolean ,borderColor:string,tt ?:  'upp' | 'cap',error:boolean}>`
  color: ${({theme}) => theme.neutralColor.text};
  font-weight: 400;
  border-width: 1px;
  padding: 8px ;
  font-size: 1rem;
  width: 100%;
  text-transform: ${({tt}) => tt ? tt === 'upp' ? 'uppercase' : tt === 'cap' ? 'capitalize' : '' : ''};
  border-color: ${({theme,error}) => error ? theme.errorColor.errorBorder : theme.neutralColor.border};
  border-radius: 4px;
  border-style: solid;
  outline: none;
  transition: border-color 0.2s ease;
  &:focus  {
    border-color:${({borderColor,theme}) => borderColor ? borderColor : theme.brandColor.primary};
    outline: none;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.1);
  }
  ${({ theme, disabled }) =>
    disabled &&
    css`
      pointer-events: none;
      background-color: ${theme.neutralColor.fillQuaternary}; /* Use your desired color */
      color: ${theme.neutralColor.textTertiary}; /* Use your desired color */
      cursor: not-allowed;
    `}
`;

const InputTelephone: React.FC<IInputTelephone> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  labelTop = true,
  borderColor = '',
  error,
  onBlur,
  disabled,
  onClick,
  tt
}) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const numericValue = event.target.value.replace(/[^0-9]/g, "");
        const truncatedValue = numericValue.slice(0, 10);
        onChange(truncatedValue);
      };

  const theme = useTheme()
  return (
    <InputWrapper top={labelTop}>
      <Col>
            {label && 
            <Label top={labelTop} >
            {label}
            {required && '*'}
            </Label>}
            <Input
            error={error ? true : false}
            maxLength={10}
            minLength={10}
              type="tel"
              value={value}
              onChange={handleInputChange}
              placeholder={placeholder}
              hasValue={value !== ""}
              required={required}
              borderColor={borderColor}
              onBlur={onBlur}
              disabled={disabled}
              onClick={onClick}
              tt={tt}
            />
            <Row style={{position:'relative'}}>
            {error && 
              <Row a="center" style={{position:'absolute'}}>
                <Icon name={IconName.Alert} color={theme.errorColor.errorText} height={0.8} width={0.8} isHoverable={false}/>
                <Text s="12" w={5} c={theme.errorColor.errorText}>{error}</Text>
              </Row>
            }
            </Row>
      </Col>
    </InputWrapper>
  );
};

export default InputTelephone;
