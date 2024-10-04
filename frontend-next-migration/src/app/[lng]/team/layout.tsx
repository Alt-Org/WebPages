import {ReactNode} from "react";
import {Navbar} from "@/widgets/Navbar";
import {Footer} from "@/widgets/Footer";
import {ScrollTop} from "@/features/ScrollTop";

type Props = {
    children: ReactNode;
}

export default function TeamLayout({children}: Props) {
    return (
        <>
            <Navbar />
            {children}
            <ScrollTop />
        </>
    )
}