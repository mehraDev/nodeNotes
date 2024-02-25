import React, { ChangeEvent, useState } from "react";
import styled, { useTheme } from "styled-components";
import { InputWrapper, Label } from "./styles";
import { IInput } from "./interface";
import Error from "ui/Error";
import Icon, { IconName } from "ui/Icon";
import { Row } from "ui/basic";

interface IInputSearch extends IInput {
  value: string;
  onChange: (value: string) => void;
  borderColor?: string | undefined;
  borderRadius?: string;
  error?: string;
  onClear: () => void;
}

const Input = styled.input<{
  hasValue: boolean;
  borderColor: string;
  borderRadius?: string;
  isInputFocused: boolean;
}>`
  color: ${({ theme }) => theme.neutralColor.text};
  font-weight: 400;
  border-width: 1px;
  padding: 8px 0px 8px 28px;
  font-size: 16px;
  width: 100%;
  position: relative;
  border-color: ${({ theme }) => theme.neutralColor.border};
  border-radius: ${({ borderRadius }) => borderRadius || "9px"};
  border-style: solid;
  outline: none;
  transition: border-color 0.3s ease;
  &:focus {
    border-color: ${({ borderColor, theme }) =>
      borderColor ? borderColor : theme.neutralColor.border};
    outline: none;
  }
`;

const InputSearch: React.FC<IInputSearch> = ({
  label,
  value,
  onChange,
  placeholder,
  required,
  labelTop = true,
  borderColor = "",
  borderRadius,
  error,
  onClear,
}) => {
  const [isInputFocused, setIsInputFocused] = useState(false);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleInputFocus = () => {
    setIsInputFocused(true);
  };

  const handleInputBlur = () => {
    setIsInputFocused(false);
  };

  const handleClearSearch = () => {
    onClear();
  };
  const theme = useTheme();
  return (
    <InputWrapper top={labelTop}>
      {label && (
        <Label top={labelTop}>
          {label}
          {required && "*"}
        </Label>
      )}
      <Row a="center" style={{ position: "relative" }} j="center">
        <Input
          type="text"
          value={value}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder={placeholder}
          hasValue={value !== ""}
          required={required}
          borderColor={borderColor}
          borderRadius={borderRadius}
          isInputFocused={isInputFocused} // Pass the isInputFocused state as a prop
        />
        {value !== "" && (
          <ClearIcon
            name={IconName.Clear}
            height={0.6}
            width={0.6}
            color={theme.neutralColor.bgContainer}
            onClick={handleClearSearch}
            style={{ background: theme.neutralColor.border }}
          />
        )}
        <SearchIcon
          borderRadius={0}
          name={IconName.Search}
          color={
            isInputFocused
              ? theme.brandColor.primaryActive
              : theme.neutralColor.border
          }
        />
      </Row>
      {error && <Error>{error}</Error>}
    </InputWrapper>
  );
};

const SearchIcon = styled(Icon)`
  position: absolute;
  left: 4px; /* Adjust the left position to move the search icon to the start */
  top: 50%; /* Center vertically */
  transform: translateY(-50%);
`;

const ClearIcon = styled(Icon)`
  position: absolute;
  right: 10px; /* Adjust the right position to move the clear icon to the end */
  top: 50%; /* Center vertically */
  transform: translateY(-50%);
`;
export default InputSearch;
