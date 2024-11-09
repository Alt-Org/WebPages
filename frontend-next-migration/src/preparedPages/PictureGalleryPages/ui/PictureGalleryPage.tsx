import { SectionGallerias } from '@/widgets/SectionGallerias';
import { Container } from '@/shared/ui/Container';
import { SectionGalleriasPaths } from '@/shared/const/SectionGalleriasPaths';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { Version } from '@/entities/Gallery/types/gallery';
import { SectionGalleryV2, SectionGalleryV1 } from '@/widgets/SectionGallery';
import cls from './PictureGalleryPage.module.scss';

export interface Props {
    title: string;
    infoText: string;
    socialsText: string;
    socialMediaLinks: string[];
    videoLink: string;
}

const PictureGalleryPage = (props: Props) => {
    const { title, infoText, socialsText, socialMediaLinks, videoLink } = props;

    return (
        <div className={cls.Wrapper}>
            <Container className={cls.Container}>
                <h1>{title}</h1>
                <p className={cls.InfoText}>{infoText}</p>
                <p className={cls.SocialsText}>{socialsText}</p>

                {/* <SectionGallerias parentDirectory={SectionGalleriasPaths.artGalleries} /> */}

                {/* version1 */}
                {/*<SectionGallery*/}
                {/*    socialMediaLinks={socialMediaLinks}*/}
                {/*    videoLink={videoLink}*/}
                {/*/>*/}

                {/* version2 */}
                <SectionGalleryV2
                    version={'full'}
                    socialMediaLinks={socialMediaLinks}
                />
            </Container>
        </div>
    );
};

export default withBackgroundImage<Props>({
    alt: 'Picture Gallery Page underground style background',
    imagePath: bgPicture as unknown as string,
    className: cls.wholePageBG,
})(PictureGalleryPage);
