import Link from "next/link";
import {Button} from "@/components/ui/button";
import {navLinks} from "@/data/navLinks";
import Image from "next/image";
import Logo from "@/app/assets/logo.png"
import { auth } from "@clerk/nextjs/server";
import { UserButton } from "@clerk/nextjs";

const Navbar = () => {
    const { userId } = auth()
    
    return (
        <nav className="py-4 bg-background/30 backdrop-blur-sm">
            <div className="container flex flex-row justify-between items-center">
                <Link href="/">
                    <Image src={Logo} alt={'logo-icon'} width={154} height={132}/>
                </Link>
                <ul className="md:flex flex-row justify-between gap-8 hidden">
                    {navLinks.map((link) => (
                        <li key={link.title}>
                            <Link href={link.href
                            }>
                                {link.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <div className="flex flex-row justify-end space-x-2">
                    <div>{userId ? <UserButton/> :
                        <Button>
                            <Link href="/sign-up">
                                Get Started
                            </Link>
                        </Button>
                        }
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;