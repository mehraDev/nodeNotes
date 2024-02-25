import React, { useState } from "react";
import InputText from "./InputText";
import { Box, Col } from "ui/basic";
import styled from "styled-components";
import { IInput } from "./interface";

const SuggestionList = styled.ul`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  list-style: none;
  padding: 0;
  margin: 0;
  max-height: 150px;
  overflow-y: auto;
  z-index: 1001;
  width: 100%;
`;

const ListItem = styled.li`
  padding: 8px;
  cursor: pointer;
  text-transform: capitalize;
  &:hover {
    background-color: #f2f2f2;
  }
`;

interface IInputWithSuggestions extends IInput {
  suggestions: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
  value: string;
  label?: string;
  placeholder?: string;
}

const InputWithSuggestions: React.FC<IInputWithSuggestions> = ({
  suggestions,
  onChange,
  disabled,
  value,
  label,
  placeholder,
}) => {
  const searchInput = value;
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (value: string) => {
    onChange(value);
    if (value) {
      setShowSuggestions(true);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setShowSuggestions(false);
    onChange(suggestion);
  };

  const handleInputClick = () => {
    if (suggestions.length > 0) {
      setShowSuggestions(true);
    }
  };

  const handleInputBlur = () => {
    setTimeout(() => {
      setShowSuggestions(false);
    }, 200);
  };

  const renderSuggestions = () => {
    const filteredSuggestions = suggestions.filter(
      (suggestion) =>
        suggestion.toLowerCase().includes(searchInput.toLowerCase()) &&
        suggestion.toLowerCase() !== searchInput.toLowerCase()
    );

    if (showSuggestions && filteredSuggestions.length > 0) {
      return (
        <SuggestionList>
          {filteredSuggestions.map((suggestion, index) => (
            <ListItem
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
            >
              {suggestion}
            </ListItem>
          ))}
        </SuggestionList>
      );
    }

    return null;
  };

  return (
    <Col style={{ position: "relative" }}>
      <InputText
        disabled={disabled}
        label={label}
        value={value}
        placeholder={placeholder}
        onChange={handleInputChange}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
        tt="cap"
      />
      {!disabled && (
        <Box
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            width: "100%",
          }}
        >
          {renderSuggestions()}
        </Box>
      )}
    </Col>
  );
};

export default InputWithSuggestions;
