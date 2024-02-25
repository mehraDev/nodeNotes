interface ModeSwitcherProps {
    currentMode: string;
    modeComponents: { [key: string]: React.ReactNode };
  }

  
const ModeSwitcher: React.FC<ModeSwitcherProps> = ({ currentMode, modeComponents }) => {
    return <>{modeComponents[currentMode]}</>;
  };
  

  export default ModeSwitcher;