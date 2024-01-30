import CustomPageTitle from "@/components/CustomPageTitle";
import FormErrorMessage from "@/components/FormErrorMessage";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

// Create Form Schema.
const ProductFormSchema = z.object({
    title: z.string()
        .min(1, 'Nama tidak boleh kosong'),
    description: z.string()
        .min(8, 'Deskripsi minimal 8 karakter')
        .max(255, 'Deskripsi maksimal 255 karakter'),
    price: z.number()
        .int('Harga harus angka')
        .positive('Harga harus positif')
});

// Create ProductForm from Form Schema.
type ProductForm = z.infer<typeof ProductFormSchema>;

const CreateProduct: React.FC = () => {
    // Create isSubmitting state to disable Submit button.
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    // Initialize useForm with type ProductForm.
    const { register, handleSubmit, reset, formState: { errors } } = useForm<ProductForm>({
        resolver: zodResolver(ProductFormSchema)
    });

    const inputStyle = 'appearance-none block w-full text-gray-700 border-gray-200 rounded px-3 py-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500';

    // This function called when submit button triggered.
    const onSubmit = async (form: ProductForm) => {
        try {
            // Disable submit button.
            setIsSubmitting(true);

            // Create HTTP Request to Dummy JSON API.
            await fetch('https://dummyjson.com/products/add', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });

            // Clear form after successfuly submit data.
            reset();
        } catch (error) {
            // Print error if any.
            console.error(error);
        } finally {
            // Enable submit button.
            setIsSubmitting(false);
        }
    }

    return (
        <div>
            <CustomPageTitle pageTitle="Create Product"></CustomPageTitle>
            <form className="w-full max-w-lg" onSubmit={handleSubmit(onSubmit)}>
                {/* Product Name Input */}
                <div className="w-full px-3 py-1">
                    <label className="block tracking-wide">Product Name:</label>
                    <input 
                        className={inputStyle}
                        {...register("title")}>
                    </input>
                    <FormErrorMessage errorMessage={errors.title?.message}></FormErrorMessage>
                </div>
                {/* Description Input */}
                <div className="w-full px-3 py-1">
                    <label className="block tracking-wide">Description:</label>
                    <input 
                        className={inputStyle}
                        {...register("description")}>
                    </input>
                    <FormErrorMessage errorMessage={errors.description?.message}></FormErrorMessage>
                </div>
                {/* Price Input */}
                <div className="w-full px-3 py-1">
                    <label className="block tracking-wide">Price:</label>
                    <input 
                        className={inputStyle}
                        {...register("price", { valueAsNumber: true })}>
                    </input>
                    <FormErrorMessage errorMessage={errors.price?.message}></FormErrorMessage>
                </div>
                <div className="w-full px-3 py-3">
                    <button 
                        className="text-white font-bold px-3 py-2 bg-blue-500 enabled:hover:bg-blue-800 rounded disabled:opacity-75" 
                        type="submit"
                        disabled={isSubmitting}>
                            Submit
                    </button>
                </div>
            </form>
        </div>
    )
}

const CreateProductPage: React.FC = () => {
    return <CreateProduct></CreateProduct>
}

export default CreateProductPage;