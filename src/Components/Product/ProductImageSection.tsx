import Image from "next/image";

interface ProductImageSectionProps {
    imageId: number;
}


export default function ProductImageSection({ imageId }: ProductImageSectionProps) {
    return (
        <div className={`${imageId}`} key={imageId}>
            <Image
                src='/product.png'
                alt='Product Image'
                layout="responsive"
                width={100}
                height={100}
                className="rounded-lg"
            />
        </div>
    )
}