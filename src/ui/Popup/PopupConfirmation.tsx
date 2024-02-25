import { FC } from "react";
import { useTheme } from "styled-components";
import { Backdrop } from "ui/Backdrop";
import Button from "ui/Button";
import { Card } from "ui/Card";
import { Col, Row, Text } from "ui/basic";

interface IConfirmationPopup {
  title?: string;
  message?: string;
  label?: string;
  onCancel: () => void;
  onConfirm: () => void;
  show?: boolean;
}

const ConfirmationPopup: FC<IConfirmationPopup> = ({
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
      <Card w="80%">
        <Col style={{ gap: "1rem" }}>
          {title && (
            <Row>
              <Text s="16" w={5}>
                {title}
              </Text>
            </Row>
          )}
          {message && (
            <Row>
              <Text s="12" c={theme.neutralColor.textSecondary}>
                {message}
              </Text>
            </Row>
          )}
          <Row a="center" j="between">
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
            <Button onClick={onConfirm}>{label || "Confirm"}</Button>
          </Row>
        </Col>
      </Card>
    </Backdrop>
  );
};

export default ConfirmationPopup;
