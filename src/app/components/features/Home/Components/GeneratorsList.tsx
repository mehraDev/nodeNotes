import React, { useState } from "react";
import {
  IGenerator,
  reactComponentGenerator,
} from "../generators/reactComponentGenerator";
import { Row } from "ui/basic";
import Generator from "./Generator";
import { jsxGenerator } from "../generators/jsxGenerator";
import { interfaceGenerator } from "../generators/interfaceGenerator";
import { workflowGenerator } from "../generators/workflowGenerator";
import { uiComponentDesignGenerator } from "../generators/uiComponentDesignGenerator";

const GeneratorsList = () => {
  const generators: IGenerator[] = [
    reactComponentGenerator,
    jsxGenerator,
    interfaceGenerator,
    workflowGenerator,
    uiComponentDesignGenerator,
  ];
  const [activeGenerator, setActiveGenerator] = useState<IGenerator | null>(
    null
  );

  // Function to handle clicking on a generator name
  const handleGeneratorClick = (generator: IGenerator) => {
    setActiveGenerator(generator);
  };

  // Function to handle going back to the list
  const handleBackToList = () => {
    setActiveGenerator(null);
  };

  return (
    <>
      {activeGenerator ? (
        // If there's an active generator, show the Generator component
        <div>
          <button onClick={handleBackToList}>Back to List</button>
          <Generator generator={activeGenerator} />
        </div>
      ) : (
        // Otherwise, show the list of generators
        generators.map((generator: IGenerator, index: number) => (
          <Row key={index} onClick={() => handleGeneratorClick(generator)}>
            {generator.name}
          </Row>
        ))
      )}
    </>
  );
};

export default GeneratorsList;
