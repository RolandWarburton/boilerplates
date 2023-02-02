import styled from 'styled-components';

const Container = styled.div`
  padding: 2em;
  background-color: #36393f;
  display: flex;
`;

const NavLink = styled.div`
  font-size: 2em;
  margin: 0 1em;
  &:hover {
    color: #5865F2;
    cursor: pointer;
  }
`;

export { Container, NavLink };
