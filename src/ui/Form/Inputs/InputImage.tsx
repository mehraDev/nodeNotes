import React,{ useRef } from "react";
import styled from "styled-components";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";
import { Box } from "ui/basic";

interface IInputImageButton {
  children?: React.ReactNode;
  onChange: (file: File | null) => void;
  width? : string;
  variant?: 'primary' | 'secondary';
}

const HiddenInput = styled.input`
  display: none;
`;

const InputImageButton : React.FC<IInputImageButton> = ({ 
  children,
  onChange ,
  width,
  variant
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = (event:any) => {
    event.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event:any) => {
    const file = event.target.files[0];
    if (file) {
        onChange(file);
    }
  };
  return (
    <>
      <Box w={ width ? width : "inital"} onClick={ e => handleButtonClick(e)} >
      {children || (
          <Button variant={variant}>
            <Icon name={IconName.Image} height={1} width={1}></Icon>
            Select Image
          </Button>
        )}
      </Box>
      <HiddenInput
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
      />
    </>
  );
};

export default InputImageButton;
