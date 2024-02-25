import { Col } from "ui/basic";
import { useTheme } from "styled-components";
import InfoGraph from "../InfoGraph/InfoGraph";
 
const Home = () => {
  const theme = useTheme();
  return (
    <Col style={{ background: theme.neutralColor.bgContainer }}>
      <InfoGraph />
    </Col>
  );
};

export default Home;
