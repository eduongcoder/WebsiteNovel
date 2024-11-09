import ActionTableProduct from './ActionTableProduct';
const TABLE_HEADS = [
    'Product ID',
    'Product Name',
    'Product Image',
    'Price',
    'Stock Quantity',
    'Category',
    'Status',
    'Date Added',
    'Last Updated',
    'Action',
];

const books = [
    {
        productId: '001',
        productName: 'The Great Gatsby',
        productImage:
            'https://th.bing.com/th/id/OIP.tAvAD5lCtDJSjywplxd37QHaEo?rs=1&pid=ImgDetMain',
        price: 10.99,
        stockQuantity: 120,
        category: 'Fiction',
        status: 'In Stock',
        dateAdded: '2024-01-15',
        lastUpdated: '2024-07-20',
    },
    {
        productId: '002',
        productName: '1984',
        productImage: 'https://example.com/images/1984.jpg',
        price: 8.99,
        stockQuantity: 75,
        category: 'Dystopian',
        status: 'In Stock',
        dateAdded: '2024-03-10',
        lastUpdated: '2024-08-05',
    },
    {
        productId: '003',
        productName: 'To Kill a Mockingbird',
        productImage: 'https://example.com/images/to-kill-a-mockingbird.jpg',
        price: 12.99,
        stockQuantity: 50,
        category: 'Classic',
        status: 'In Stock',
        dateAdded: '2024-04-22',
        lastUpdated: '2024-08-10',
    },
    {
        productId: '004',
        productName: 'The Catcher in the Rye',
        productImage: 'https://example.com/images/the-catcher-in-the-rye.jpg',
        price: 9.99,
        stockQuantity: 60,
        category: 'Literary Fiction',
        status: 'Out of Stock',
        dateAdded: '2024-02-18',
        lastUpdated: '2024-07-30',
    },
    {
        productId: '005',
        productName: 'Brave New World',
        productImage: 'https://example.com/images/brave-new-world.jpg',
        price: 11.99,
        stockQuantity: 90,
        category: 'Science Fiction',
        status: 'In Stock',
        dateAdded: '2024-05-05',
        lastUpdated: '2024-08-01',
    },
];

function ProductTable() {
    return (
        <section className="bg-white rounded-md shadow-cyan-500/50 p-4 md:p-6">
            <div className="mb-3">
                <h4 className="text-[18px] text-sky-400">Product</h4>
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
                        {books.map((book) => (
                            <tr key={book.productId}>
                                <td className="px-3 py-3">{book.productId}</td>
                                <td className="px-3 py-3">
                                    {book.productName}
                                </td>
                                <td className="px-3 py-3">
                                    <img
                                        src={book.productImage}
                                        alt={book.productName}
                                        className="w-20 h-auto"
                                    />
                                </td>
                                <td className="px-3 py-3">
                                    ${book.price.toFixed(2)}
                                </td>
                                <td className="px-3 py-3">
                                    {book.stockQuantity}
                                </td>
                                <td className="px-3 py-3">{book.category}</td>
                                <td className="px-3 py-3">
                                    <div className="flex items-center gap-2">
                                        <span
                                            className={`w-2 h-2 rounded-full ${
                                                book.status === 'In Stock'
                                                    ? 'bg-green-500'
                                                    : 'bg-red-500'
                                            }`}
                                        ></span>
                                        <span className="capitalize">
                                            {book.status}
                                        </span>
                                    </div>
                                </td>
                                <td className="px-3 py-3">{book.dateAdded}</td>
                                <td className="px-3 py-3">
                                    {book.lastUpdated}
                                </td>
                               
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
}

export default ProductTable;
