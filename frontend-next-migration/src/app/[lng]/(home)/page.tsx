import {MainPage as PreparedPage} from "@/preparedPages/MainPage";
import {useServerTranslation} from "@/shared/i18n";
import {Metadata} from "next";
import {AppExternalLinks} from "@/shared/appLinks/appExternalLinks";
import {RoutePaths} from "@/shared/appLinks/RoutePaths";
import {_getPage} from "./_getPage";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'main');
    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}

export default async function MainPage({params}: Props) {
    const page = await  _getPage(params.lng);

    return (
        <>
            <PreparedPage
                {...page}
            />
        </>
    );

}