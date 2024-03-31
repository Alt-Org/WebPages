'use client'
import cls from "./SectionPlayWithUs.module.scss"
import Image from "next/image";
import bgPicture from "@/shared/assets/images/mainpage/background.webp";
import googlePLay from "@/shared/assets/images/media/googleplay.png";
import sideImg from "@/shared/assets/images/heros/einstein/einstein.png";
import { Button, ButtonSize, ButtonTheme } from "@/shared/ui/Button/Button";
import Link from "next/link";
import { AppExternalLinks } from "@/shared/appLinks/appExternalLinks";
import useIsMobileSize from "@/shared/lib/hooks/useIsMobileSize";
import { NavElements } from "../NavElements/NavElements";
import { Navs } from "../../model/data/navs";



type Props = {
    webGlButtonText: string;
    // googleButtonText: string;
}

const SectionPlayWithUs = (props: Props) => {

    const {
        webGlButtonText,
    } = props;

    const { isMobileSize } = useIsMobileSize();



    return (
        <div className={cls.SectionPlayWithUs}>


            <div className={cls.backgroundImageWrapper}>
                <Image src={bgPicture} alt="Background" layout="fill" objectFit="cover" quality={100} />
            </div>

            <div className={cls.Content}>

                <div className={cls.ContentWithNav}>
                    <div className={cls.Buttons}>
                        <Button
                            key={"webgl"}
                            withScalableLink
                            theme={ButtonTheme.Graffiti}
                            // size={ButtonSize.}
                            className={cls.BtnGame}
                        >
                            <Link target={"_blank"} href={AppExternalLinks.webgl}>
                                {webGlButtonText}
                            </Link>
                        </Button>

                        <Link href={AppExternalLinks.downloadAndroid} target={"_blank"}>
                            <Image src={googlePLay} alt={"google play button"}
                                className={cls.BtnDownload}
                            />
                        </Link>
                    </div>
                    <NavElements navElems={Navs} className={cls.navElements} />
                </div>
                {!isMobileSize && (
                    <Image src={sideImg} alt={"Side image with hero"} className={cls.sideImg} />
                )}
            </div>

        </div>

    );
};

export default SectionPlayWithUs;