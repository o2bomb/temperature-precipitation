import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ProcessedMonthlyData, ProcessedMonthlyDataCollection } from "helpers/getWeather";
import styled from "styled-components";

export interface MonthlyTableProps {
    data: ProcessedMonthlyDataCollection;
}

const columnHelper = createColumnHelper<ProcessedMonthlyData>();

const columns = [
    columnHelper.accessor("jan", {
        header: "January",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("feb", {
        header: "February",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("mar", {
        header: "March",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apr", {
        header: "April",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("may", {
        header: "May",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("jun", {
        header: "June",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("jul", {
        header: "July",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("aug", {
        header: "August",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sep", {
        header: "September",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("oct", {
        header: "October",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nov", {
        header: "November",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dec", {
        header: "December",
        cell: (info) => info.getValue(),
    }),
];

export const MonthlyTable = ({ data }: MonthlyTableProps) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <Scrollable>
            <Table>
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <th key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
                                              header.getContext(),
                                          )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <td key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Scrollable>
    );
};

const Scrollable = styled.div`
    overflow-x: auto;
    scro
`;

const Table = styled.table`
    th {
        text-align: left;
    }

    th,
    td {
        padding: 0.5rem 2rem;
        :first-child {
            padding-left: 0;
        }
        :last-child {
            padding-right: 0;
        }
    }
`;
