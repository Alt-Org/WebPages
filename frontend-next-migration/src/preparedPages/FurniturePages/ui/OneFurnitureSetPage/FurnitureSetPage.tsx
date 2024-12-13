'use client';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { FurnitureManager, PieceCard, Piece } from '@/entities/Furniture';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import { Container } from '@/shared/ui/Container';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { getRouteAllFurnitureSetsPage } from '@/shared/appLinks/RoutePaths';
import cls from './FurnitureSetPage.module.scss';

const OneSetPage = () => {
    const { id } = useParams();
    const router = useRouter();

    const { t } = useClientTranslation('furnitureinfo');

    const manager = new FurnitureManager();

    let set;
    try {
        set = manager.getFurnitureSet(id as string);
    } catch (err) {
        set = undefined;
    }

    if (!set) {
        router.push('/furniture/set');
        return;
    }

    const { path, cover, author, items } = set;

    return (
        <div className={classNames(cls.SetPage)}>
            <Container className={cls.Container}>
                <div className={cls.Cover}>
                    <Image
                        src={cover}
                        alt={'cover'}
                    />
                </div>
                <div className={cls.Back}>
                    <AppLink to={getRouteAllFurnitureSetsPage()}>&lt;- {t('text-back')}</AppLink>
                </div>
                <h1>{t(`${path}.name`)}</h1>
                <h3>{author}</h3>
                <div className={cls.CardsContainer}>
                    {items.map((item: Piece) => {
                        return (
                            <PieceCard
                                item={item}
                                key={item.path}
                            />
                        );
                    })}
                </div>
            </Container>
        </div>
    );
};

export default OneSetPage;
