import styled from 'styled-components';

interface ButtonProps {
  width?: string;
}

const Button = styled.button<ButtonProps>`
  background: #8fb8de;
  border: none;
  border-radius: 5px;
  width: ${(props: any) => (props.width ? props.width : '30px')};
`;

export { Button };
