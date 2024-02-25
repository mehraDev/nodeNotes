import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled, { useTheme } from "styled-components";
import Icon, { IconName } from "ui/Icon";
import { Text } from "ui/basic";

interface DropdownInputProps {
  label?: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const DropdownWrapper = styled.div`
  position: relative;
  width: 200px;
  align-items: center;
`;

const DropdownLabel = styled.label`
  margin-bottom: 4px;
  display: block;
`;

const DropdownIcon = styled.span`
  position: absolute;
  right: 10px;
  pointer-events: none; // Ensures the icon doesn't interfere with clicking the dropdown.
`;


const DropdownInputWrapper = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;

  text-transform: capitalize;
`;

const DropdownList = styled.ul<{ isOpen: boolean }>`
  display: ${(props) => (props.isOpen ? "block" : "none")};
  position: absolute;
  top: 0%;
  left: 0;
  right: 0;
  background: #fff;
  border: 1px solid #ccc;
  border-radius: 0.5rem;  
  padding: 0;
  margin: 0;
  list-style-type: none;
`;

const DropdownListItem = styled.li`
  padding: 8px;
  cursor: pointer;

  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownInput: React.FC<DropdownInputProps> = ({
  label,
  options,
  value,
  onChange,
  placeholder,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const theme = useTheme();
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };
  const wrapperRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false); 
      }
    };

    const handleFocusChange = (event: FocusEvent) => {
      if (isOpen && wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      window.addEventListener("scroll", handleScroll, true);
      document.addEventListener("focusin", handleFocusChange);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll, true);
      document.removeEventListener("focusin", handleFocusChange);
    };

  }, [isOpen]);
  const handleOptionClick = (selectedValue: string) => {
    setIsOpen(false);
    onChange(selectedValue);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <DropdownWrapper ref={wrapperRef}>
      {label && <DropdownLabel>{label}</DropdownLabel>}
      <DropdownInputWrapper
        type="text"
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        onClick={toggleDropdown}
      />
      <DropdownIcon>
        <Icon name={ isOpen ? IconName.ChevronUp :IconName.DownArrow} width={0.8} height={0.8}/>
      </DropdownIcon>
      
      <DropdownList isOpen={isOpen}>
        {filteredOptions.map((option) => (
          <DropdownListItem
            key={option}
            onClick={() => handleOptionClick(option)}
          >
            <Text s="12" c={value === option ? theme.brandColor.primary:  theme.neutralColor.textSecondary}>{option}</Text>
            
          </DropdownListItem>
        ))}
      </DropdownList>
    </DropdownWrapper>
  );
};

export default DropdownInput;
