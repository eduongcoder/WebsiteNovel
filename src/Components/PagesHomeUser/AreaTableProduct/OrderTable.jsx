const TABLE_HEADS = [
    'Products',
    'Order ID',
    'Date',
    'Customer name',
    'Status',
    'Amount',
    'Action',
];

const TABLE_DATA = [
    {
        id: 100,
        name: 'Iphone 13 Pro',
        order_id: 11232,
        date: 'Jun 29,2022',
        customer: 'Anh Nhut',
        status: 'delivered',
        amount: 400,
    },
    {
        id: 101,
        name: 'Macbook Pro',
        order_id: 11232,
        date: 'Jun 29,2022',
        customer: 'Cam dat',
        status: 'pending',
        amount: 288,
    },
    {
        id: 102,
        name: 'Apple Watch',
        order_id: 11232,
        date: 'Jun 29,2022',
        customer: 'Chi An',
        status: 'canceled',
        amount: 500,
    },
    {
        id: 103,
        name: 'Microsoft Book',
        order_id: 11232,
        date: 'Jun 29,2022',
        customer: 'Thanh Vu',
        status: 'delivered',
        amount: 100,
    },
    {
        id: 104,
        name: 'Apple Pen',
        order_id: 11232,
        date: 'Jun 29,2022',
        customer: 'Thai Duong',
        status: 'delivered',
        amount: 60,
    },
    {
        id: 105,
        name: 'Airpods',
        order_id: 11232,
        date: 'Jun 29,2022',
        customer: 'Dai Minh',
        status: 'delivered',
        amount: 80,
    },
];

function OrderTTable() {
    // Đổi tên hàm cho rõ ràng
    return (
        <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
            <div className="mb-3">
                <h4 className="text-[18px] text-sky-400">Orders</h4>
            </div>
            <div className="rounded-lg border border-gray-950 overflow-x-auto scrollbar-thin scrollbar-track-[var(--scroll-track-bg-color)] scrollbar-thumb-gray-200">
                <table className="min-w-[900px] w-full border-collapse text-zinc-900">
                    <thead className="text-left text-[17px] bg-slate-400">
                        <tr>
                            {TABLE_HEADS.map((th, index) => (
                                <th key={index} className="px-3 py-3">
                                    {th}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {TABLE_DATA.map((dataItem) => (
                            <tr key={dataItem.id}>
                                <td className="px-3 py-3">{dataItem.name}</td>
                                <td className="px-3 py-3">
                                    {dataItem.order_id}
                                </td>
                                <td className="px-3 py-3">{dataItem.date}</td>
                                <td className="px-3 py-3">
                                    {dataItem.customer}
                                </td>
                                <td className="px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2 h-2 rounded-full dot-${dataItem.status}`}
                                        ></span>
                                        <span className="capitalize">
                                            {dataItem.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 py-3">
                                    $
                                    {typeof dataItem.amount === 'number'
                                        ? dataItem.amount.toFixed(2)
                                        : dataItem.amount}
                                </td>
                                <td className="px-3 py-3 text-center">
                                    <ActionTable />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default OrderTTable;
