import Add from "@/Components/Product/Add";
import ProductImageSection from "@/Components/Product/ProductImageSection";
import Image from "next/image";

export default function ProductPage() {
    return (
        <div className="grid grid-cols-1 p-4">
            {/* LEFT */}
            <div className="left">
                <Image
                    src='/product.png'
                    alt='Product Image'
                    layout="responsive"
                    width={100}
                    height={100}
                    className="rounded-lg"
                />
            </div>
            <div className="imageslist grid grid-cols-4 gap-2 mt-5">
                <ProductImageSection
                    imageId={1}
                />
                <ProductImageSection
                    imageId={2}
                />
                <ProductImageSection
                    imageId={3}
                />
                <ProductImageSection
                    imageId={4}
                />
            </div>

            {/* RIGHT */}
            <div className="left mt-4">
                <div className="font-serif text-3xl">Product 1</div>
                <div className="font-sans text-lg">Descrição do produto: Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto vero consequuntur </div>
                <div className="">
                    <div className="font-serif text-2xl">Tamanho: </div>
                    <Add
                        productId="1"
                        stockNumber={4}
                        variantId="1"
                        key={1}
                    />
                </div>
            </div>
        </div>
    )
}