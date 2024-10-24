import { SectionClassifiedHeroesBlocks } from '@/widgets/SectionClassifiedHeroesBlocks';
import { FeedbackSideButton } from '@/features/FeedbackByExternalSource';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import cls from './HeroesPage.module.scss';

const HeroesPage = () => {
    const sameBg = undefined;

    return (
        <main className={cls.main}>
            <FeedbackSideButton disableMobile={true} />
            <SectionClassifiedHeroesBlocks title={'Heroes'} />
        </main>
    );
};

export default withBackgroundImage({
    alt: 'ClassifiedHeroesPage underground style background',
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG,
})(HeroesPage);
