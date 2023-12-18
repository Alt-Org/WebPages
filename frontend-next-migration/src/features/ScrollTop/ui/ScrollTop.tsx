'use client'
import {classNames} from "@/shared/lib/classNames/classNames";
import {Button, ButtonSize, ButtonTheme} from "@/shared/ui/Button/Button";
import cls from './ScrollTop.module.scss';
import {useCurrentYPosition} from "@/shared/lib/hooks/useCurrentYPosition";
import {memo, ReactNode, useCallback, useEffect, useState} from "react";
import {useClientTranslation} from "@/shared/i18n";
import {useParams} from "next/navigation";

interface ScrollTopProps {
    className?: string;
    innerText?: string
}

export const ScrollTop = memo(({ className = '', innerText}: ScrollTopProps) => {

    const params = useParams();
    const lng = params.lng as string;

    const {t} = useClientTranslation(lng, "translation");

    const localInnerText = innerText  ? innerText : t("upButton")


    const currentYPosition = useCurrentYPosition();

    const handleButtonClick = useCallback(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },[]);

    const [showButton,setShowButton] = useState(false);

    useEffect(()=>{
        if(currentYPosition > window.innerHeight / 6){
            setShowButton(true);
        }
        else{
            setShowButton(false);
        }
    },[currentYPosition])

    return (
        <Button
            size={ButtonSize.XXXL}
            theme={ButtonTheme.OUTLINE}
            className={classNames(cls.ScrollTop, { [cls.show]: showButton }, [className])}
            onClick={handleButtonClick}
        >
            {localInnerText}
        </Button>
    );
});

ScrollTop.displayName = "ScrollTop";
