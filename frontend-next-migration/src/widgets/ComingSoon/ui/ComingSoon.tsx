'use client';
import { useRouter } from 'next/navigation';
import { memo } from 'react';
import bgPicture from '@/shared/assets/images/backgrounds/background.webp';
import { withBackgroundImage } from '@/shared/lib/hocs/withBackgroundImage';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useClientTranslation } from '@/shared/i18n';
import cls from './ComingSoon.module.scss';

export const ComingSoon = memo(() => {
    const { t } = useClientTranslation('coming');
    const router = useRouter();

    const handleGoBack = () => router.back();

    return (
        <div className={cls.main}>
            <div className={cls.container}>
                <h1>{t('title')}</h1>
                <div className={cls.text}>
                    <h3>{t('text')}</h3>
                    <div
                        role="button"
                        className={classNames(cls.NavGoBackButton)}
                        onClick={handleGoBack}
                    >
                        <p>{t('backText')}</p>
                    </div>
                </div>
            </div>
        </div>
    );
});

ComingSoon.displayName = 'ComingSoon';

export default withBackgroundImage({
    alt: 'Tile bg image',
    imagePath: bgPicture as unknown as string,
})(ComingSoon);
