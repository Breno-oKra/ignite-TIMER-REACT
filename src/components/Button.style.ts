import styled, { css } from "styled-components";

export type ButtonVariant = "primary" | "secundary" | "danger" | "success";
interface ButtonProps {
  variant: ButtonVariant;
}

const buttonVariants = {
  primary: "purple",
  secundary: "orange",
  danger: "red",
  success: "green",
};
export const ButtonContainer = styled.button<ButtonProps>`
  width: 100px;
  height: 40px;
  color: ${(props) => props.theme.white};
  outline: 0;
  border: 0;
  padding: 8px;
  font-size: 0.8rem;
  background-color: ${(props) => props.theme["green-500"]};
  //colocamos css antes somente para pegar uma cor, funcionarioa sem o css que importamos
  /* ${(props) =>
    css`
      background-color: ${buttonVariants[props.variant]};
    `} */
`;
