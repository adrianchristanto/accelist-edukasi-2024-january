import CustomPageTitle from "@/components/CustomPageTitle";
import fetcher from "@/functions/fetcher";
import { ProductData } from "@/types/ProductData";
import Link from "next/link";
import useSWR from "swr";

const Products: React.FC = () => {
    const { data, isValidating } = useSWR<ProductData>('https://dummyjson.com/products', fetcher);

    if (isValidating) {
        return (
            <div>
                <p>Loading...</p>
            </div>
        )
    }

    const renderHeader = () => {
        return (
            <thead className="border-b font-medium">
                <th className="px-6 py-4">Product Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Price</th>
                <th className="px-6 py-4">Stock</th>
                <th className="px-6 py-4">Brand</th>
            </thead>
        )
    }

    const renderProducts = () => {
        return (
            <tbody>
                {data?.products.map(product => {
                    return (
                        <tr key={product.id}>
                            <td className="px-6 py-4">
                                <Link className="underline underline-offset-2 text-blue-400" href={`/products/${product.id}`}>
                                    {product.title}
                                </Link>
                            </td>
                            <td className="px-6 py-4">{product.description}</td>
                            <td className="px-6 py-4">${product.price}</td>
                            <td className="px-6 py-4">{product.stock}</td>
                            <td className="px-6 py-4">{product.brand}</td>
                        </tr>
                    )
                })}
            </tbody>
        )
    }

    const renderTable = () => {
        return (
            <table className="table-auto text-left text-sm font-light">
                {renderHeader()}
                {renderProducts()}
            </table>
        )
    }

    return (
        <div>
            <CustomPageTitle pageTitle="Product List"></CustomPageTitle>
            <div>
                {renderTable()}
            </div>
        </div>
    )
}

const ProductsPage: React.FC = () => {
    return <Products></Products>
}

export default ProductsPage;