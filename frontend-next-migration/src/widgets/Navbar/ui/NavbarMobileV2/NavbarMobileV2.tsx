import { CSSProperties, memo, useMemo } from "react";
import Image from 'next/image'
import { sidebarItemType } from "@/shared/ui/Sidebar/model/items";
import {useLogoutMutation, useUserPermissionsV2} from "@/entities/Auth";
import cls from "./NavbarMobileV2.module.scss";
import { classNames } from "@/shared/lib/classNames/classNames";
import { ISidebarItem, Sidebar } from "@/shared/ui/Sidebar";
import { ItemType, NavbarBuild, NavBarType } from "../../model/types";
import { AppLink, AppLinkTheme } from "@/shared/ui/AppLink/AppLink";
import { useParams } from "next/navigation";
import { useClientTranslation } from "@/shared/i18n";
import { LangSwitcher } from "@/features/LangSwitcher";
import { FixedButton } from "../FixedButton/FixedButton";

import { useFixed } from "../../model/FixedProvider";
import useIsPageScrollbar from "@/shared/lib/hooks/useIsPageScrollbar";
import { defineNs } from "../../model/defineNs";

interface NavbarTouchProps {
    overlaid?: boolean;
    marginTop?: number;
    onBurgerButtonClick?: (isMenuOpen: boolean) => void;
    navbarBuild?: NavbarBuild;
    side?: 'left' | 'right';
    className?: string;
    navBarType?: NavBarType;
}

const NavbarTouchComponent = (props: NavbarTouchProps) => {

    const {
        overlaid = false,
        marginTop,
        navbarBuild,
        side = 'left',
        className = '',
        navBarType = "Default"
    } = props;


    const params = useParams();
    const lng = params.lng as string;

    const ns = defineNs(navBarType)

    const { t } = useClientTranslation(lng, ns);

    const {checkPermissionFor} = useUserPermissionsV2();
    const permissionToLogin = checkPermissionFor("login");
    const permissionToLogout = checkPermissionFor("logout");

    const permissionToSeeOwnClan = checkPermissionFor("clan:seeOwn");


    // todo looks like it should be moved to the feature layer
    const [logout] = useLogoutMutation();

    const { isFixed } = useFixed();
    const hasScrollbar = useIsPageScrollbar();

    const sidebarItemsList: ISidebarItem[] = useMemo(() => {
        return (navbarBuild?.menu || [])
            .map(item => {
                if (item.type === ItemType.navLink) {
                    return { path: item.path, name: t(`${item.name}`), type: sidebarItemType.ISidebarItemBasic };
                }
                if (item.type === ItemType.navDropDown) {
                    // Localize the elements within the dropdown, but skip if elementText equals "clanpage"
                    const localizedElements = item.elements
                        .map((element) => {
                            if (element.elementText == 'clanpage' && !permissionToSeeOwnClan.isGranted) {
                                return null; // Return null if elementText is "clanpage"
                            }
                            return {
                                ...element,
                                elementText: t(`${element.elementText}`), // Localize elementText
                            };
                        })
                        .filter(element => element !== null); // Filter out any null elements

                    // If there are no valid elements left, return null to skip this item
                    if (localizedElements.length === 0) {
                        return null;
                    }

                    return { name: t(`${item.name}`), elements: localizedElements, type: sidebarItemType.ISidebarItemDropDown };
                }

                return null;
            })
            .filter(item => item !== null) as ISidebarItem[];
    }, [navbarBuild, t]);

    const style: CSSProperties = marginTop
        ? { "marginTop": `${marginTop}px` }
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlaid && !isFixed,
        // [cls.overlayed]: overlaid,
        [cls.fixed]: isFixed,
    } as Record<string, boolean>;



    const sidebarMods: Record<string, boolean> = {
        [cls.left]: side === 'left',
        [cls.right]: side === 'right',
    };

    return (
        <nav className={classNames(cls.Navbar, mods, [className])} style={style}>
            <div
                className={classNames(cls.NavbarMobile__burger, sidebarMods)}
                onClick={() => props.onBurgerButtonClick && props.onBurgerButtonClick(true)}
            >
            </div>
            <Sidebar
                buttonClassName={classNames(cls.NavbarMobile__burger, sidebarMods)}
                sidebarClassName={cls.sidebar}
                sidebarItemsList={sidebarItemsList}
                side={side}
                closeOnClickOutside
                bottomItems={
                    <div className={cls.sidebarBottom}>
                        <LangSwitcher className={cls.langSwitcher} />
                        <div className={cls.authSection}>
                            {permissionToLogin.isGranted && (
                                <AppLink
                                    className={cls.authSectionLink}
                                    theme={AppLinkTheme.PRIMARY}
                                    to={navbarBuild?.namedMenu?.navAuthLogin?.path || ""}
                                    key={navbarBuild?.namedMenu?.navAuthLogin?.path || ""}
                                >
                                    <span>{t(`${navbarBuild?.namedMenu?.navAuthLogin?.name}`)}</span>
                                </AppLink>
                            )}
                            {permissionToLogout.isGranted && (
                                <div onClick={() => logout()}>{t(`logout`)}</div>
                            )}
                        </div>
                    </div>
                }
            />
            <AppLink
                className={cls.navLogo + ' ' + cls.NavbarMobile__center}
                theme={AppLinkTheme.PRIMARY}
                to={navbarBuild?.namedMenu?.navLogo?.path || ""}
            >
                <Image
                    loading={"eager"}
                    width={180}
                    src={navbarBuild?.namedMenu?.navLogo?.src || ''}
                    alt={navbarBuild?.namedMenu?.navLogo?.name || ''}
                />
            </AppLink>


            {hasScrollbar && (
                <FixedButton
                    className={cls.FixedButton}
                />
            )}
        </nav>
    )
};

NavbarTouchComponent.displayName = 'NavbarTouch';

export default memo(NavbarTouchComponent);
