import React from "react";
import { useTheme } from "styled-components";
import { Backdrop } from "ui/Backdrop";
import { Row, Text, Col } from "ui/basic";
import Button from "ui/Button";
import Icon, { IconName } from "ui/Icon";

interface IPopupStatus {
  mode: EPopupModes
  onClose: () => void;
  message? : string;
}
export enum EPopupModes {
  None = 'none',
  Success = 'success',
  Error = 'error',
}

const PopupStatus: React.FC<IPopupStatus> = ({ mode, onClose,message }) => {
    const theme = useTheme();
    const isSuccess = mode === EPopupModes.Success;
    const successColor = '#38a81c';
    const errorColor = theme.errorColor.error;
    const errorMessageBg = theme.errorColor.errorBorder;
    const successMessageBg = '#b0eea1';
  return mode !== EPopupModes.None ? (
    <Backdrop>
    <Col br="8px" w="80%" style={{ gap: '2rem', padding: '1.5rem 1rem' , background: theme.neutralColor.bgContainer }} a="center">
      <Icon style={{background: isSuccess ? successColor :  errorColor}}
        name={isSuccess ? IconName.Check :  IconName.Cart}
        color='#fff'  padding="6px" br='50%'  width={5} height={5}/>
        <Text tt="cap" s="18" w={6} c={theme.neutralColor.text}>
                {isSuccess ? 'Success' : 'Error' }
              </Text>
              {message && (
            <Row a="center" j="center" p={'1rem'} style={{background: isSuccess ? successMessageBg : errorMessageBg}} br="8px">
              <Text tt="cap" s="12" c={isSuccess ? successColor : errorColor}>
                {message}
              </Text>
            </Row>
          )}
     <Row a="center" j="center" style={{gap:'1rem'}}>
        <Button  width="50%" onClick={onClose}
        bg={isSuccess ? '#4CBB17' : theme.errorColor.error}
        >
        {isSuccess ? 'Done' : 'Close'}
            </Button>
     </Row>
    </Col>
  </Backdrop>
  ) : null;
};

export default PopupStatus;
