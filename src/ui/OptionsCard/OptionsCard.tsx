import React from 'react';
import { Backdrop } from 'ui/Backdrop';
import Button from 'ui/Button';
import { Card } from 'ui/Card';
import Icon, { IconName } from 'ui/Icon';
import { Col, Row } from 'ui/basic';

interface IOptionCard {
  label: string;
  onClick: () => void;
}

const OptionsCard: React.FC<{ options: IOptionCard[],closeCard: () => void; }> = ({ options,closeCard }) => {
    const handleOptionClick = (index: number) => {
        closeCard();
        options[index].onClick()
    }
  return (
    <Backdrop>
        <Card w='90%'>

      <Row j='end'>
      <Icon height={1.2} width={1.2} name={IconName.Close} onClick={() => closeCard()}/>
      </Row>
      <Col>
        {options.map((option, index) => (
          <Row key={index} p={'0.75rem 1.5rem'}>
            <Button variant='secondary' width='100%' onClick={() => handleOptionClick(index)}>{option.label}</Button>
          </Row>
        ))}
      </Col>

        </Card>
    
    </Backdrop>
    
  );
};

export default OptionsCard;
