export interface IGenerator {
  name: string; // Name of the generator
  description: string; // Description of what the generator does
  templateFunction: (variables: { [key: string]: any }) => string;
  inputKeys: string[];
}

const uiComponentDesignGenerator: IGenerator = {
  name: "UI Component Design Gen",
  description: "Generates a complete design for a UI component based on the component name and special instructions",
  inputKeys: ["componentName", "specialInstructions"],

  templateFunction: (variables: { [key: string]: any }) => {
    const componentName = variables.componentName || "UnnamedComponent";
    const specialInstructions = variables.specialInstructions || "none";

    // Constructing a design prompt for an AI to generate a UI component design
    return `Design a ${componentName} component. Apply best UI/UX practices to ensure the component is user-friendly and aesthetically pleasing. Consider any special instructions: ${specialInstructions}. Provide a detailed visual layout and description of the component without any additional text or explanations.`;
  },
};

export { uiComponentDesignGenerator };
