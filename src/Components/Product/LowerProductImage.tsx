import Image from "next/image";

interface LowerProductImageProps {
    imageId: number;
}


export default function LowerProductImage({ imageId }: LowerProductImageProps) {
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