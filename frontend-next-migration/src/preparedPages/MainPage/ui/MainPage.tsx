import cls from "./page.module.scss"

import { RoutePaths } from "@/shared/appLinks/RoutePaths";


import { SectionClassifiedHeroesBlocks } from "@/widgets/SectionClassifiedHeroesBlocks";
import { HorizontalLines } from "@/shared/ui/HorizontalLines";
import { withBackgroundImage } from "@/shared/lib/hocs/withBackgroundImage";
import bgPicture from "@/shared/assets/images/backgrounds/background.webp";

import { ProjectDescription,ProjectDescriptionProps } from "./_components/sections/ProjectDescription";
import { GetToKnowComics, GetToKnowComicsProps } from "./_components/sections/GetToKnowComics";
import {VideoAndGalleries} from "./_components/sections/VideoAndGalleries";
import {PlayWithUs, PlayWithUsProps} from "./_components/sections/PlayWithUs";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";



type Props = {
    t: (key: string) => string;
    projectDescription: ProjectDescriptionProps;
    playWithUs: PlayWithUsProps;
    getToKnowComics: GetToKnowComicsProps;
}

function MainPage (props: Props)  {

    const {
        t ,
        projectDescription,
        playWithUs,
        getToKnowComics
    } = props;

    const sameBg = undefined;

    return (
        <div className={cls.MainPage}>

            <ProjectDescription
                className={cls.description}
                {...projectDescription}
            />

            <HorizontalLines />

            <PlayWithUs
                {...playWithUs}
            />

            <HorizontalLines />

            <SectionClassifiedHeroesBlocks/>


            <HorizontalLines />

            <GetToKnowComics
                {...getToKnowComics}
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

