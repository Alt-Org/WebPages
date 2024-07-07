import cls from "./page.module.scss"

import { RoutePaths } from "@/shared/appLinks/RoutePaths";

import { SectionPlayWithUs } from "@/widgets/SectionPlayWithUs";
import { SectionClassifiedHeroesBlocks } from "@/widgets/SectionClassifiedHeroesBlocks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";

import { ProjectDescription } from "./_components/sections/ProjectDescription";
import { GetToKnowComics } from "./_components/sections/GetToKnowComics";
import {VideoAndGalleries} from "./_components/sections/VideoAndGalleries";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";


export type Props = {
    t: (key: string) => string;
}

function MainPage ({ t }: Props)  {
    const sameBg = undefined;

    return (
        <div className={cls.MainPage}>

            <ProjectDescription
                className={cls.description}
                title={t('project-description-title')}
                description={t('project-description-text')}
            />

            <HorizontalLines />

            <SectionPlayWithUs
                title={t("playWithUs-title")}
                webGl={{
                    title: t('PlayOnline'),
                    link: AppExternalLinks.webgl
                }}
                googlePLayLink={AppExternalLinks.downloadAndroid}
                belowNavs={ [{
                    title: t("playWithUs-OpenPositions-title"),
                    body: t("playWithUs-OpenPositions-body"),
                    link: AppExternalLinks.duunitori,
                    isExternal: true
                },
                {
                    title: t("playWithUs-BecomeATester-title"),
                    body: t("playWithUs-BecomeATester-body"),
                    link: AppExternalLinks.discord,
                    isExternal: true
                }]}
            />

            <HorizontalLines />

            <SectionClassifiedHeroesBlocks/>


            <HorizontalLines />

            <GetToKnowComics
                title={t("getToKnowComics-title")}
                buttonParams={{ innerText: t("getToKnowComics"), href: RoutePaths.COMICS_GALLERY }}
                backgroundImageSrc={sameBg}
            />


            <HorizontalLines />
            <VideoAndGalleries
                videoLink={AppExternalLinks.previewVideoYoutube}
                title={t("videoAndGalleries-title")}
                backgroundImageSrc={sameBg}
            />
            <HorizontalLines />
            {/*<SectionNewsPreview/>*/}

            {/*<SectionRanking*/}
            {/*    rankingPlayerText={t('ranking-player')}*/}
            {/*    rankingScoreText={t('ranking-score')}*/}

            {/*/>*/}
            {/*</div>*/}
        </div>
    );
};


export default withBackgroundImage<Props>({
    alt: "Main-Page underground style background",
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG
})(MainPage);

