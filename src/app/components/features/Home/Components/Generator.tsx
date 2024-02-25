import React, { useState } from "react";
import { IGenerator } from "../generators/reactComponentGenerator";
import { InputText } from "ui/Form";
import { Col, Row, Text } from "ui/basic";
import { useTheme } from "styled-components";

type GeneratorProps = {
  generator: IGenerator;
};

const Generator = ({ generator }: GeneratorProps) => {
  const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});
  const [generatedContent, setGeneratedContent] = useState("");

  // Handle input changes for each key
  const handleInputChange = (key: string, val: string) => {
    setInputValues({
      ...inputValues,
      [key]: val,
    });
  };

  // Generate content when the user clicks the generate button
  const handleGenerate = () => {
    const content = generator.templateFunction(inputValues);
    setGeneratedContent(content);
  };

  // Assuming the keys for the template function are known and defined in an array
  const inputKeys: string[] = generator.inputKeys || []; // e.g., ['componentName', 'author']
  const theme = useTheme();
  return (
    <Col style={{ gap: "1rem" }}>
      <h2>{generator.name}</h2>
      <p>{generator.description}</p>
      {inputKeys.map((key) => (
        <div key={key}>
          <InputText
            label={key}
            value={inputValues[key] || ""}
            onChange={(val) => handleInputChange(key, val)}
          />
        </div>
      ))}
      <button onClick={handleGenerate}>Generate</button>
      <div>
        <h3>Generated Content:</h3>
        <Row>
          <Text s="12" w={4} c={theme.neutralColor.textSecondary}>
            {generatedContent}
          </Text>
        </Row>
      </div>
    </Col>
  );
};

export default Generator;
