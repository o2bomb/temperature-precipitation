import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { ProcessedMonthlyData, ProcessedMonthlyDataCollection } from "helpers/getWeather";
import { MonthEnum, ViewEnum } from "pure/enums";
import styled from "styled-components";

export interface MonthlyTableProps {
    data: ProcessedMonthlyDataCollection;
    view: ViewEnum;
}

const columnHelper = createColumnHelper<ProcessedMonthlyData>();

const columns = [
    columnHelper.accessor("gcm", {
        header: "",
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("jan", {
        header: MonthEnum.January,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("feb", {
        header: MonthEnum.February,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("mar", {
        header: MonthEnum.March,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("apr", {
        header: MonthEnum.April,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("may", {
        header: MonthEnum.May,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("jun", {
        header: MonthEnum.June,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("jul", {
        header: MonthEnum.July,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("aug", {
        header: MonthEnum.August,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("sep", {
        header: MonthEnum.September,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("oct", {
        header: MonthEnum.October,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("nov", {
        header: MonthEnum.November,
        cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("dec", {
        header: MonthEnum.December,
        cell: (info) => info.getValue(),
    }),
];

export const MonthlyTable = ({ data, view }: MonthlyTableProps) => {
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
                                <TableData key={cell.id} isGCM={cell.column.id === "gcm"}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableData>
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

    @media (max-width: 500px) {
        max-height: 300px;
    }
`;

const Table = styled.table`
    th,
    td {
        text-align: right;
        white-space: nowrap;
        padding: 0.5rem 2rem;
        :first-child {
            padding-left: 0.5rem;
        }
        :last-child {
            padding-right: 0.5rem;
        }
    }

    thead th {
        z-index: 1;
        position: sticky;
        top: 0;
        padding-bottom: 0.8rem;
        background-color: #101c35;
        :not(:first-child) {
            border-bottom: 1px solid #1f2937;
        }

        :first-child {
            z-index: 3;
            top: 0;
            left: 0;
        }
    }

    tbody tr {
        :nth-child(even) {
            background-color: #1f2937aa;
        }
    }
`;

interface TableDataProps {
    isGCM?: boolean;
}

const TableData = styled.td<TableDataProps>`
    ${(props) =>
        props.isGCM
            ? `
            z-index: 2;
            position: sticky;
            left: 0;
            padding-right: 1rem !important;
            background-color: #101c35;
            border-right: 1px solid #1f2937;
            text-align: right;
            font-weight: 500;
    `
            : undefined}
`;
