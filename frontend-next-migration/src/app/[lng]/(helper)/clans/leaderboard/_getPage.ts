import { createPage } from '@/app/_helpers';
import { useServerTranslation } from '@/shared/i18n';

export async function _getPage(lng: string) {
    const { t } = await useServerTranslation(lng, 'clan');

    return createPage({
        buildPage: () => ({}),
        buildSeo: () => ({
            //todo make own for the leaderBoard !!!
            title: t('head-title'),
            description: t('head-description'),
            keywords: t('head-keywords'),
        }),
    });
}
