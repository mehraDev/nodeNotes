import { createContext, useContext, useState, ReactNode } from "react";

interface OptionsContextType {
  hasOptionButton: boolean;
  displayOptions: boolean;
  setDisplayOptions: (value: boolean) => void;
  setHasOptionButton: (value: boolean) => void;
}

const OptionsContext = createContext<OptionsContextType | undefined>(undefined);

export const OptionsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [hasOptionButton, setHasOptionButton] = useState(false);
  const [displayOptions, setDisplayOptions] = useState(false);

  return (
    <OptionsContext.Provider
      value={{
        hasOptionButton,
        displayOptions,
        setDisplayOptions,
        setHasOptionButton
      }}
    >
      {children}
    </OptionsContext.Provider>
  );
};

export const useOptionsButton = (): OptionsContextType => {
  const context = useContext(OptionsContext);
  if (context === undefined) {
    throw new Error("useOptions must be used within an OptionsProvider");
  }
  return context;
};
