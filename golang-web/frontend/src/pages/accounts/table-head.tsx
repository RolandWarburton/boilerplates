import React from 'react';
import { IAccount } from '../../interfaces/account.interace';
import { flexRender, Header, HeaderGroup, Table } from '@tanstack/react-table';

interface Props {
  table: Table<IAccount>;
}

function TableHead(props: Props) {
  const { table } = props;

  return (
    <thead>
      {table.getHeaderGroups().map((headerGroup: HeaderGroup<IAccount>) => (
        <tr key={headerGroup.id}>
          {headerGroup.headers.map((header: Header<IAccount, unknown>) => (
            <th
              key={header.id}
              {...{
                colSpan: header.colSpan,
                style: {
                  width: header.getSize()
                }
              }}
            >
              {header.isPlaceholder
                ? null
                : flexRender(header.column.columnDef.header, header.getContext())}
              <div
                {...{
                  onMouseDown: header.getResizeHandler(),
                  onTouchStart: header.getResizeHandler(),
                  className: `resizer ${header.column.getIsResizing() ? 'isResizing' : ''}`,
                  style: {
                    transform: header.column.getIsResizing()
                      ? `translateX(${table.getState().columnSizingInfo.deltaOffset}px)`
                      : ''
                  }
                }}
              />
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
}

export { TableHead };
