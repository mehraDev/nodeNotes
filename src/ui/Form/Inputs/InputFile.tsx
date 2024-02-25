import React, { useRef, useState } from "react";
import { useTheme } from "styled-components";
import Button from "ui/Button";
import { IButton } from "ui/Button/Button";
import { Text } from "ui/basic";

interface InputFileProps extends IButton {
  accept?: string;
  multiple?: boolean;
  label: string;
  onFileChange: (files: FileList) => void;
}

const InputFile: React.FC<InputFileProps> = ({
  accept,
  multiple = false,
  label,
  onFileChange,
  ...buttonProps
}) => {
  const theme = useTheme();
  const [inputKey, setInputKey] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onFileChange(files);
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      setInputKey((prevKey) => prevKey + 1);
    }
  };

  return (
    <>
      <Button onClick={handleButtonClick} {...buttonProps} value={label}>
        <Text c={theme.brandColor.primary}>{label}</Text>
        <input
          key={inputKey} // Change the key to trigger re-render
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          accept={accept}
          multiple={multiple}
          onChange={handleFileChange}
        />
      </Button>
    </>
  );
};

export default InputFile;
