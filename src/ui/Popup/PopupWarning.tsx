import { FC } from "react";
import { useTheme } from "styled-components";
import { Backdrop } from "ui/Backdrop";
import Button from "ui/Button";
import { Card } from "ui/Card";
import { Col, Row, Text } from "ui/basic";

interface IPopupWarning {
  title?: string;
  message?: string;
  label?: string;
  onCancel: () => void;
  onConfirm: () => void;
  show?: boolean;
}

const PopupWarning: FC<IPopupWarning> = ({
  title,
  message,
  label,
  onCancel,
  onConfirm,
  show = true,
}) => {
  const theme = useTheme();

  if (!show) {
    return null;
  }

  return (
    <Backdrop>
      <Card w="80%" p={'1rem'}>
        <Col style={{ gap: "0.5rem" }}>
          {title && (
            <Row p={'1rem 0rem'}>
              <Text s="16" w={6} c={theme.neutralColor.text}>
                {title}
              </Text>
            </Row>
          )}
          {message && (
            <Row p={'1rem'} style={{background:theme.errorColor.errorBorder}} br="8px">
              <Text s="12" c={theme.errorColor.errorTextActive}>
                {message}
              </Text>
            </Row>
          )}
          <Row p={'1rem 0rem'}  a="center" j="end">
            <Row w="60%" style={{gap: '2rem'}} j="end" a='center'>
                <Button color={theme.errorColor.errorTextActive} variant="secondary" onClick={onCancel}>
                    Cancel
                </Button>
                <Button bg={theme.errorColor.errorTextActive} onClick={onConfirm}>{label || "Confirm"}</Button>
            </Row>
          </Row>
        </Col>
      </Card>
    </Backdrop>
  );
};

export default PopupWarning;
