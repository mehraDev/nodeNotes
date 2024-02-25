export interface IGenerator {
  name: string; // Name of the generator
  description: string; // Description of what the generator does
  templateFunction: (variables: { [key: string]: any }) => string;
  inputKeys: string[];
}

const reactComponentGenerator: IGenerator = {
  name: "React Component Gen",
  description: "Generates a React TSX component with specified props based on the provided component name and props",
  // Include additional keys for props
  inputKeys: ["componentName", "props"],
  templateFunction: (variables: { [key: string]: any }) => {
    const componentName = variables.componentName || "UnnamedComponent";

    // Initialize props as an empty object representation.
    let props = "{}";

    if (typeof variables.props === "string") {
      // If props is a non-empty string, split it by commas to create an array, and then join it back into a string representation.
      const propsArray = variables.props.split(",").map((prop) => prop.trim());
      if (propsArray.length > 0 && propsArray[0] !== "") {
        props = `{ ${propsArray.join(", ")} }`;
      }
    }
    return `Generate a React TSX component named ${componentName} with the following props: ${props}. The component should be functional and include these props. Provide only the React TSX code for the component without any additional text, description, or explanation.`;
  },
};
export { reactComponentGenerator };
