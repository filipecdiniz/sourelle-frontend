import Image from "next/image";
import Link from "next/link";

export default function FooterContactDiv() {
    return (
        <div className="flex flex-row mt-2 justify-between px-2">
            <div className="texts">
                <div className="text-base font-semibold text-blue-500">
                    <Link href="tel:+5562984689961">(62) 98468-9961</Link>
                </div>
                <div className="text-base text-gray-600">sourellepratas@gmail.com</div>
            </div>
            <div className="flex flex-col gap-2 justify-center">
                {/* INSTAGRAM */}
                <div className="instagram">
                    <Image
                        src={`/instagram_icon.png`}
                        alt=""
                        width={22}
                        height={22}
                    ></Image>
                    <Link
                        href={``}
                    ></Link>
                </div>
                {/* WHATSAPP */}
                <div className="whatsapp flex">
                    <Image
                        src={`/whatsapp_icon.png`}
                        alt=""
                        width={22}
                        height={22}
                    ></Image>
                    <div className="text"></div>
                </div>
            </div>
        </div>
    )
}