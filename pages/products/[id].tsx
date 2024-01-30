import CustomLabel from "@/components/CustomLabel";
import CustomPageTitle from "@/components/CustomPageTitle";
import { Product } from "@/types/ProductData";
import { GetServerSideProps } from "next";

const ProductDetail: React.FC<Product> = (props) => {
    return (
        <div>
            <CustomPageTitle pageTitle="Product Detail"></CustomPageTitle>
            <CustomLabel labelName="Product ID" labelValue={props.id.toString()}></CustomLabel>
            <CustomLabel labelName="Product Name" labelValue={props.title}></CustomLabel>
            <CustomLabel labelName="Description" labelValue={props.description}></CustomLabel>
            <CustomLabel labelName="Price" labelValue={props.price.toString()}></CustomLabel>
        </div>
    )
}

const ProductDetailPage: React.FC<Product> = (props) => {
    return <ProductDetail {...props}></ProductDetail>
}

// Function untuk melakukan Server-side rendering setiap ada request membuka page ini.
export const getServerSideProps: GetServerSideProps<Product> = async (props) => {
    const { id } = props.query;
    const url = `https://dummyjson.com/products/${id}`;

    // Create HTTP Request.
    const response = await fetch(url);

    // Translate JSON response into Product data type.
    const productDetail = (response.json() as unknown) as Product;

    return {
        props: productDetail
    }
}

export default ProductDetailPage;