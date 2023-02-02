import styled from 'styled-components';

const Container = styled.div`
  margin: 5rem;
  margin-top: 2.5rem;
`;

const TableContainer = styled.table`
  border-collapse: collapse;
  .tr {
    display: flex;
  }

  tr,
  .tr {
    width: fit-content;
    height: 30px;
  }

  th,
  .th,
  td,
  .td {
    box-shadow: inset 0 0 0 1px lightgray;
    padding: 0.25rem;
  }

  th,
  .th {
    padding: 2px 4px;
    position: relative;
    font-weight: bold;
    text-align: center;
    height: 30px;
  }

  td,
  .td {
    height: 30px;
  }

  .resizer {
    position: absolute;
    right: 0;
    top: 0;
    height: 100%;
    width: 5px;
    background: rgba(255, 255, 255, 0.5);
    cursor: col-resize;
    user-select: none;
    touch-action: none;
  }

  .resizer.isResizing {
    background: blue;
    opacity: 1;
  }

  @media (hover: hover) {
    .resizer {
      opacity: 0;
    }

    *:hover > .resizer {
      opacity: 1;
    }
  }
`;

export { Container, TableContainer };
