import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/logo.svg"

export const Logo =()=> {

    return(
        <Link href="/">
            <Image 
                src={logo}
                alt="Logo"
                width={120}
                height={150}
                className="xs:w-37.5"
            />
        </Link>
    )
}