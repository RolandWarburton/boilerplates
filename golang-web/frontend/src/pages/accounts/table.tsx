import React from 'react';
import { IAccount } from '../../interfaces/account.interace';
import {
  Cell,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable
} from '@tanstack/react-table';
import { TableContainer } from './index.styles';
import { TableHead } from './table-head';
import { Link } from 'react-router-dom';
import { API_PORT, API_ROOT, DOMAIN, PROTOCOL } from '../../constants';

const columnHelper = createColumnHelper<IAccount>();

const columns = [
  columnHelper.accessor('id', {
    header: () => 'ID',
    cell: (info) => {
      return <button onClick={() => alert(info.getValue())}>click to show</button>;
    }
  }),
  columnHelper.accessor('username', {
    header: () => 'Account Name',
    cell: (info) => info.getValue(),
    minSize: 250
  }),
  columnHelper.accessor('is_staff', {
    header: () => 'Staff',
    cell: (info) => (info.getValue() === true ? 'yes' : 'no'),
    minSize: 150
  }),
  columnHelper.accessor('created_at', {
    header: () => 'Created At',
    cell: (info) => info.getValue(),
    minSize: 350
  }),
  columnHelper.accessor('updated_at', {
    header: () => 'Updated At',
    cell: (info) => info.getValue(),
    minSize: 350
  }),
  columnHelper.display({
    header: () => 'Edit',
    id: 'edit',
    cell: (props) => {
      return (
        <div>
          <Link to={props.row.getValue('id')}>edit</Link>
        </div>
      );
    },
    minSize: 150
  }),
  columnHelper.display({
    header: () => 'Delete',
    id: 'delete',
    // delete the row from the database,
    // and color the background of the
    // deleted row red if successful
    cell: (props) => {
      const handleDelete = async function (e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const userID = props.row.getValue('id');
        const url = `${PROTOCOL}://${DOMAIN}:${API_PORT}/${API_ROOT}/account/${userID}`;
        const res = await fetch(`${url}`, {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('token') || ''
          }
        });
        if (res.status !== 200) {
          alert('failed to delete');
          return undefined;
        }
        const rowDom = document.getElementById(props.row.id);
        if (rowDom) rowDom.style.backgroundColor = 'red';
      };
      return (
        <div>
          <button onClick={handleDelete}>Delete Account</button>
        </div>
      );
    },
    minSize: 150
  })
];

interface Props {
  data: IAccount[];
}

function Table(props: Props) {
  // eslint-disable-next-line
  const [data, setData] = React.useState(() => [...props.data]);
  const rerender = React.useReducer(() => ({}), {})[1];

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onEnd',
    getCoreRowModel: getCoreRowModel()
  });

  return (
    <div className="p-2">
      <TableContainer
        {...{
          style: {
            width: table.getCenterTotalSize()
          }
        }}
      >
        <TableHead table={table} />
        <tbody>
          {table.getRowModel().rows.map((row: Row<IAccount>) => (
            <tr key={row.id} id={row.id}>
              {row.getVisibleCells().map((cell: Cell<IAccount, unknown>) => (
                <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </TableContainer>
      <div className="h-4" />
      <button onClick={() => rerender()} className="border p-2">
        Refresh
      </button>
    </div>
  );
}
export default Table;
