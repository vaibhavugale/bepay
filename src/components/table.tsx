import React from 'react';

export interface Column<T> {
  header: string | React.ReactNode;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  className?: string;
  onRowClick?: (item: T) => void;
}

export function Table<T>({ data, columns, className = "", onRowClick }: TableProps<T>) {
  return (
    <div className={`w-full overflow-x-auto rounded-2xl border border-gray-200 bg-white ${className}`}>
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-[13px] text-gray-400 font-medium border-b border-gray-200">
          <tr>
            {columns.map((col, index) => (
              <th key={index} scope="col" className="px-6 py-5 font-medium whitespace-nowrap">
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="px-6 py-16 text-center text-gray-500 font-medium">
                No data available
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr 
                key={rowIndex} 
                onClick={() => onRowClick && onRowClick(row)}
                className={`bg-white border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">
                    {col.cell ? col.cell(row) : (col.accessorKey ? String(row[col.accessorKey]) : null)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
