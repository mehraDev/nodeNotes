import styled, { css } from "styled-components";
import { Row } from "ui/basic";

export const PanelHeader = styled(Row)`
  align-items: center;
  justify-content: space-between;
   border-bottom: 1px solid ${({theme }) => theme.neutralColor.border};
   padding: 1rem;
   margin-bottom: 0.5rem;
   font-size: large;
   font-weight: 700;
   color: ${({theme }) => theme.brandColor.primaryActive};
  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `}
  div{
    margin-right: 1rem;
  }
  h3 {
    flex-grow: 1;
    text-align: center;
    margin-right: 2rem;
  }
`