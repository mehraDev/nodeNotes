import { IGenerator } from "./reactComponentGenerator";

const interfaceGenerator: IGenerator = {
  name: "Interface Generator",
  description: "Generates instructions for an AI to create a TypeScript interface with specified properties and the freedom to add any additional required values. The AI will determine the type for each property automatically based on its name.",
  inputKeys: ["interfaceName", "purpose", "mandatoryProperties", "optionalProperties"],
  templateFunction: (variables: { [key: string]: any }) => {
    const interfaceName = variables.interfaceName || "UnnamedInterface";
    const mandatoryProperties = variables.mandatoryProperties || "";
    const optionalProperties = variables.optionalProperties || "";
    const purpose = variables.purpose || "";
    // Format the mandatory and optional properties as comma-separated lists
    const formattedMandatoryProperties = mandatoryProperties
      .split(",")
      .map((prop: string) => prop.trim())
      .join(", ");
    const formattedOptionalProperties = optionalProperties
      .split(",")
      .map((prop: string) => prop.trim())
      .join(", ");

    // Constructing the instruction for the AI
    return `Create a TypeScript interface named ${interfaceName} for ${purpose}. Determine the type for each property automatically based on its name. Include the following mandatory properties: ${formattedMandatoryProperties}. Also include the following optional properties, which should be marked as optional in the interface: ${formattedOptionalProperties}.
    In addition to the properties provided, autonomously identify and include any other properties that are essential for the functionality and integrity of the interface. These could include fields that are commonly required but may have been omitted. Ensure all properties are clearly defined and appropriately marked as mandatory or optional
    Feel free to add any other properties that are deemed necessary for the functionality. Provide only the TypeScript code for the interface without any additional text, description, or explanation.`;
  },
};

export { interfaceGenerator };
