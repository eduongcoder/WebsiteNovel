import React, { useEffect, useRef } from 'react';
import 'simple-datatables/dist/style.css';
import { DataTable } from 'simple-datatables';

const FilterTable = () => {
    const tableRef = useRef(null);

    useEffect(() => {
        if (tableRef.current && typeof DataTable !== 'undefined') {
            const dataTable = new DataTable(tableRef.current, {
                tableRender: (_data, table, type) => {
                    if (type === 'print') {
                        return table;
                    }

                    const tHead = table.childNodes[0];
                    const filterHeaders = {
                        nodeName: 'TR',
                        attributes: {
                            class: 'search-filtering-row',
                        },
                        childNodes: tHead.childNodes[0].childNodes.map(
                            (_th, index) => ({
                                nodeName: 'TH',
                                childNodes: [
                                    {
                                        nodeName: 'INPUT',
                                        attributes: {
                                            class: 'datatable-input',
                                            type: 'search',
                                            'data-columns': '[' + index + ']',
                                            placeholder: 'Search...',
                                        },
                                    },
                                ],
                            }),
                        ),
                    };
                    tHead.childNodes.push(filterHeaders);
                    return table;
                },
            });
        }
    }, []);

    return (
        <div className="overflow-x-auto">
            <table
                ref={tableRef}
                id="filter-table"
                className="min-w-full table-auto text-sm text-gray-900 dark:text-white"
            >
                <thead>
                    <tr>
                        <th>
                            <span className="flex items-center">
                                Name
                                <svg
                                    className="w-4 h-4 ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                    />
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Category
                                <svg
                                    className="w-4 h-4 ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                    />
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Brand
                                <svg
                                    className="w-4 h-4 ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                    />
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Price
                                <svg
                                    className="w-4 h-4 ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                    />
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Stock
                                <svg
                                    className="w-4 h-4 ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                    />
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Total Sales
                                <svg
                                    className="w-4 h-4 ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                    />
                                </svg>
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Status
                                <svg
                                    className="w-4 h-4 ms-1"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="m8 15 4 4 4-4m0-6-4-4-4 4"
                                    />
                                </svg>
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="font-medium text-gray-900">
                            Apple iMac
                        </td>
                        <td>Computers</td>
                        <td>Apple</td>
                        <td>$1,299</td>
                        <td>50</td>
                        <td>200</td>
                        <td>In Stock</td>
                    </tr>
                    <tr>
                        <td className="font-medium text-gray-900">
                            Apple iPhone
                        </td>
                        <td>Mobile Phones</td>
                        <td>Apple</td>
                        <td>$999</td>
                        <td>120</td>
                        <td>300</td>
                        <td>In Stock</td>
                    </tr>
                    {/* Add the rest of your data rows here */}
                </tbody>
            </table>
        </div>
    );
};

export default FilterTable;
