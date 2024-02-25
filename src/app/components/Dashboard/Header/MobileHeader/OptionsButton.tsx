import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import Icon, { IconName } from 'ui/Icon';


interface OptionsButtonProps {
  optionsList: ReactNode[]; 
  onOptionClick: (optionIndex: number) => void; // Callback function for handling option click
}

const ControlsWrapper = styled.div`
  width: 100%;
`;

const OptionsWrapper = styled.div`
  right: 8px;
  top: -3rem;
  align-items: end;
  display: flex;
  flex-direction: column;
  z-index: 3;
  position: absolute;
  width: 70%;
`;

const OptionIcon = styled.div``;

const OptionsList = styled.ul`
  margin-right: 0.75rem;
  margin-top: 0.5rem;
  border-radius: 8px;
  padding: 1rem 0;
  width: 100%;
  background: white;
  box-shadow: ${({ theme }) => theme.shadow.boxShadowSecondary};
  box-shadow: ${({ theme }) => theme.neutralColor.border};

  li {
    padding: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover,
    &:active {
      background-color: lightgray;
    }
  }
`;

const OptionsButton: React.FC<OptionsButtonProps> = ({ optionsList, onOptionClick }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleOptionItemClick = (index: number) => {
    onOptionClick(index);
    setShowOptions(false);
  };

  return (
    <ControlsWrapper>
      <OptionsWrapper>
        <OptionIcon>
          <Icon name={IconName.Ellipsis} width={1.5} height={1.5} onClick={() => setShowOptions(!showOptions)} />
        </OptionIcon>
        {showOptions && (
          <OptionsList>
            {optionsList.map((option, index) => (
              <li key={index} onClick={() => handleOptionItemClick(index)}>
                {option}
              </li>
            ))}
          </OptionsList>
        )}
      </OptionsWrapper>
    </ControlsWrapper>
  );
};

export default OptionsButton;
