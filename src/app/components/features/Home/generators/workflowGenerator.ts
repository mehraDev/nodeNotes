import { IGenerator } from "./reactComponentGenerator";

const workflowGenerator: IGenerator = {
  name: "Simple Workflow Gen",
  description: "Generates a concise AI-ready prompt for creating a workflow based on provided terms and constraints",
  inputKeys: ["term", "constraints"],

  templateFunction: (variables: { [key: string]: any }) => {
    const term = variables.term || "Undefined Process";
    const constraints = variables.constraints || "No specific constraints";

    // Constructing a prompt for an AI to generate a workflow
    return `Generate a concise workflow for the process: '${term}'. Consider the following constraints: '${constraints}'. List the steps in a simple, numbered format with minimal additional text or explanations.`;
  },
};

export { workflowGenerator };
