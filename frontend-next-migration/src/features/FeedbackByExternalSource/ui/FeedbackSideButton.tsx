'use client';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { AppExternalLinks } from '@/shared/appLinks/appExternalLinks';
import { openLinkInNewTab } from '@/shared/lib/openLinkInNewTab/openLinkInNewTab';
import { useClientTranslation } from '@/shared/i18n';
import useIsMobileSize from '@/shared/lib/hooks/useIsMobileSize';
import cls from './FeedbackSideButton.module.scss';

type Props = {
    // The button does not display on mobile devices
    disableMobile?: boolean;
};

export const FeedbackSideButton = (props: Props) => {
    const { disableMobile = true } = props;

    const { t } = useClientTranslation('translation');

    const { isMobileSize } = useIsMobileSize();

    const handleClick = () => {
        openLinkInNewTab(AppExternalLinks.googleFeedback);
    };

    return (
        (!isMobileSize || !disableMobile) && (
            <Button
                theme={ButtonTheme.Graffiti}
                className={cls.SideButton}
                type="button"
                onClick={handleClick}
            >
                {t('feedback')}
            </Button>
        )
    );
};
