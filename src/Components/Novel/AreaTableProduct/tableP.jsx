import React, { useContext } from "react";
import { ProductProvider } from "../ProductContext"; 

function TableProduct() {
    const { products } = useContext(ProductContext);

    return (
        <table className="min-w-full bg-white">
            <thead>
                <tr>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tên tiểu thuyết</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Thể loại</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Tên tác giả</th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">Mô tả</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td className="text-left py-3 px-4">{product.bookTitle}</td>
                        <td className="text-left py-3 px-4">{product.genre}</td>
                        <td className="text-left py-3 px-4">{product.authorName}</td>
                        <td className="text-left py-3 px-4">{product.description}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default TableProduct;
