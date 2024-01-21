import { useServerTranslation} from "@/shared/i18n";
import {Metadata} from "next";

type Props = {
    params: { lng: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata>  {

    const { t } = await useServerTranslation(params.lng, 'members');

    return {
        title: t("head-title"),
        description: t("head-description"),
        keywords: t("head-keywords"),
    }
}


export default async function About({ params }: Props) {

    const { t } = await useServerTranslation(params.lng, 'about');

    return (
        <div>
            {
                t("title")
            }
        </div>
    )
}
