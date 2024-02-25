import { IGenerator } from "./reactComponentGenerator";

type Component = {
  type: string;
  children: Component[];
};

const jsxGenerator: IGenerator = {
  name: "JSX Generator",
  description: "Generates rendered JSX for a given component structure",
  inputKeys: ["componentStructure"],
  templateFunction: (variables: { [key: string]: any }) => {
    const componentStructureString = variables.componentStructure || "";

    const convertToStructureObject = (structureString: string): Component | Component[] => {
      const stack: Component[] = []; // Stack to keep track of the hierarchy.
      let current = ""; // Current component being processed.
      let parent: Component = { type: "root", children: [] }; // Initialize the root.

      for (const char of structureString) {
        if (char === "(") {
          // When an opening parenthesis is encountered, push the current component to the stack and reset it.
          const newComponent: Component = { type: current.trim(), children: [] };
          if (stack.length > 0) {
            stack[stack.length - 1].children.push(newComponent);
          } else {
            parent.children.push(newComponent);
          }
          stack.push(newComponent);
          current = "";
        } else if (char === ")") {
          // When a closing parenthesis is encountered, pop the stack.
          if (current.trim()) {
            stack[stack.length - 1].children.push({ type: current.trim(), children: [] });
            current = "";
          }
          stack.pop();
        } else if (char === ",") {
          // Commas indicate siblings. If there's a current component, add it as a child.
          if (current.trim()) {
            stack[stack.length - 1].children.push({ type: current.trim(), children: [] });
            current = "";
          }
        } else {
          // Accumulate the characters for the component name.
          current += char;
        }
      }

      // Handle any remaining component.
      if (current.trim()) {
        parent.children.push({ type: current.trim(), children: [] });
      }

      // Return the parsed structure, omitting the root if it's not necessary.
      return parent.children.length === 1 ? parent.children[0] : parent.children;
    };

    const componentStructure = convertToStructureObject(componentStructureString);

    // ... [rest of your code]

    return `Generate rendered JSX based on the following component structure: ${JSON.stringify(componentStructure)}. Provide only the rendered JSX code for this structure without any additional text, description, or explanation.`;
  },
};

export { jsxGenerator };
