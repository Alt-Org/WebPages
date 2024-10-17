import {HeroPage as PreparedHeroPage} from "@/preparedPages/HeroesPages";
import {useServerTranslation} from "@/shared/i18n";
import {heroes} from "@/entities/Hero";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import { notFound } from 'next/navigation';
// import {withPageData ,createMetadataGenerator} from "@/app/_helpers";
// import {_getPage} from "./_getPage";


interface Props extends DefaultAppRouterProps {
    params: DefaultAppRouterProps['params'] & {
        title: string;
    };
}

// @ts-ignore todo figure out why it doesnt work properly and refactor after it and add createMetadataGenerator
// export default withPageData(PreparedHeroPage, _getPage);

export default async function HeroPage({ params }: Props) {
    const { title, lng } = params;

    const {t} = await useServerTranslation(lng, 'heroes');
    const currentIndex = heroes.findIndex(hero => hero.title === title);
    const prevHeroTitle = findPrevTitle(currentIndex);
    const nextHeroTitle = findNextTitle(currentIndex);
    const selectedHero = getHeroData(title, t);
    const prevHeroLink = generateHeroLink(prevHeroTitle);
    const nextHeroLink = generateHeroLink(nextHeroTitle);

    const notFoundBoolean = !selectedHero || !nextHeroTitle || !prevHeroTitle;

    if (notFoundBoolean) {
        notFound();
    }


    return (
        <PreparedHeroPage
            // @ts-ignore todo fix
            selectedHero={selectedHero}
            prevHeroLink={prevHeroLink}
            nextHeroLink={nextHeroLink}
        />
    );
}


function getHeroData(heroTitle: string, t: (key: string) => string ) {
    const hero = heroes.find(hr => hr.title === heroTitle);
    return hero
        ? {
            id: hero.id,
            img: hero.srcImg as unknown as string,
            title: t(`${hero.title}`),
            alt: t(`${hero.alt}`),
            heroColor: hero.color,
            description: t(`${hero.description}`),
            borderColor: hero.borderColor,
            imgGif: hero?.srcGif as unknown as string,
            group: hero?.group
        }
        : null;
}

function findNextTitle(currentIndex: number): string {
    const nextIndex = currentIndex === heroes.length - 1 ? 0 : currentIndex + 1;
    return heroes[nextIndex]?.title;
}

function findPrevTitle(currentIndex: number): string {
    const previousIndex =
        currentIndex === 0 ? heroes.length - 1 : currentIndex - 1;
    return heroes[previousIndex]?.title;
}

function generateHeroLink(heroTitle: string): string {
    return RoutePaths.HEROES_ONE.replace(':id', heroTitle);
}