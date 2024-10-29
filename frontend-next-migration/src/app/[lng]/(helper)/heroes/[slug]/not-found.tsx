'use client';
import Link from 'next/link';
import { getAllHeroesPageRoute } from '@/shared/appLinks/RoutePaths';
import { useClientTranslation } from '@/shared/i18n';

export default function NotFound() {
    const { t } = useClientTranslation('heroes');

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100vh',
                textAlign: 'center',
            }}
        >
            <h1>{t('not-found-title')}</h1>
            <Link href={getAllHeroesPageRoute()}>
                <b>{t('not-found-check-heroes')}</b>
            </Link>
        </div>
    );
}
