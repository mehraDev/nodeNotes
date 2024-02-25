import styled from "styled-components";
import { Col } from "ui/basic";

const Card = styled(Col)`
border-radius: 6px;
box-shadow: ${({theme}) => theme.shadow.boxShadow};
background: ${({theme}) => theme.neutralColor.bgContainer};;
`

export default Card;

