import {CSSProperties, memo} from "react";
import Image from 'next/image'
import {AppLink, AppLinkTheme} from "@/shared/ui/AppLink/AppLink";
import {classNames} from "@/shared/lib/classNames/classNames";
import cls from "./NavbarDesktop.module.scss";
import {NavbarMenu, PositionChecker} from "../../model/types/types";
import {
    isCenter,
    isLeftSide, isNavbarDropDownObject,
    isNavbarLinkFakeObject,
    isNavbarLinkObject,
    isNavLogoObject,
    isRightSide
} from "../../model/types/type.guards";
import {DropdownWrapper} from "@/shared/ui/DropdownWrapper";
import {navbarMenuLoginProfile} from "@/widgets/Navbar/model/data/navbarMenuDesktop";

import {useSelector} from "react-redux";
import {selectProfile, useLogoutMutation, useUserPermissions} from "@/entities/Auth";
import {LangSwitcher} from "@/features/LangSwitcher";
import {navLogoMobile} from "@/widgets/Navbar/model/data/navbarMenuMobile";



export interface NavbarProps {
    overlayed ?: boolean;
    marginTop?: number;
    className?: string;
    navbarMenu:  NavbarMenu

}

export const NavbarDesktop = ( props : NavbarProps) => {

    const {
        overlayed = false,
        marginTop,
        navbarMenu,
        className=''
    } = props;

    const style = marginTop
        ? ({ "marginTop": `${marginTop}px` } as CSSProperties)
        : {};

    const mods: Record<string, boolean> = {
        [cls.overlayed]: overlayed,
    } as Record<string, boolean>;

    const itemLinkClassname = cls.item + ' ' + cls.itemLink;
    const itemLogoClassname = cls.item + ' ' + cls.navLogo;
    const itemFakeLinkClassname = cls.item + ' ' + cls.fakeItemLink;
    const itemNavbarDropDownClassname = cls.item + ' ' + cls.itemNavbarDropDown;

    // const profile = useSelector(selectProfile);

    const {canI} = useUserPermissions();

    const [logout] = useLogoutMutation();

    return (
        // <nav className={classNames(cls.Navbar, mods, [className])} style={style}>
        <nav className={classNames(cls.Navbar, mods, [className])} style={style}>

            <div className={cls.NestedContainer}>

            <div className={cls.navMenu}>
                <div className={cls.leftSide}>
                    <NavbarItems
                        key={"isLeftSide"}
                        items={navbarMenu}
                        positionChecker={isLeftSide}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                        itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                    />
                </div>
                <div className={cls.center}>
                    <NavbarItems
                        key={"isCenter"}
                        itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                        items={navbarMenu}
                        positionChecker={isCenter}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                    />
                </div>
                <div className={cls.rightSide}>

                    <NavbarItems
                        key={"isRightSide"}
                        itemNavbarDropDownClassname={itemNavbarDropDownClassname}
                        items={navbarMenu}
                        positionChecker={isRightSide}
                        itemLinkClassname={itemLinkClassname}
                        itemLogoClassname={itemLogoClassname}
                        itemFakeLinkClassname={itemFakeLinkClassname}
                    />


                    <div className={cls.rightSideAuth}>
                        {
                            canI("canISeeLogin")
                                ? (
                                    <AppLink
                                        className={cls.rightSideAuthLink}
                                        theme={AppLinkTheme.PRIMARY}
                                        to={navbarMenuLoginProfile.login.path}
                                        key={navbarMenuLoginProfile.login.path}
                                    >
                                        <span>{navbarMenuLoginProfile.login.name}</span>
                                    </AppLink>
                                )
                                : canI("canISeeLogout")
                                    ? <div onClick={()=>logout()}>Logout</div>
                                    : null
                        }
                    </div>

                </div>
            </div>
            </div>
        </nav>
    );


};


NavbarDesktop.displayName = 'NavbarDesktop';
export default memo(NavbarDesktop);



interface NavbarItemsProps {
    items: NavbarMenu;
    positionChecker: PositionChecker;
    itemLinkClassname: string;
    itemLogoClassname: string;
    itemFakeLinkClassname: string;
    itemNavbarDropDownClassname: string
}

const NavbarItemsComponent  =
    ({
         items,
         positionChecker,
         itemLinkClassname,
         itemLogoClassname,
         itemFakeLinkClassname,
         itemNavbarDropDownClassname,
     }: NavbarItemsProps) => {

        return (
            <>
                {items
                    // @ts-ignore
                    .filter((item) => positionChecker(item.position))
                    .map((item) => {
                        if (isNavbarLinkObject(item)) {
                            return (
                                <AppLink
                                    theme={AppLinkTheme.PRIMARY}
                                    to={item.path}
                                    className={itemLinkClassname}
                                    key={item.path}
                                >
                                    <span>{item.name}</span>
                                </AppLink>
                            );
                        }

                        if (isNavbarDropDownObject(item)) {
                            return (
                                <DropdownWrapper
                                    // isDisabled={{status: true, reason: "Kirjaudu ensin"}}
                                    elements={item.elements}
                                    contentAbsolute={true}
                                    mouseOverLeaveMode={true}
                                    key={item.name}
                                    className={itemNavbarDropDownClassname}
                                    childrenWrapperClassName={cls.itemNavbarDropDownChildrenWrapper}
                                    contentClassName={cls.itemNavbarDropDownContentClassName}
                                >
                                    <div>{item.name}</div>
                                </DropdownWrapper>
                            );
                        }

                        if (isNavLogoObject(item)) {
                            return (
                                <AppLink
                                    theme={AppLinkTheme.PRIMARY}
                                    to={item.path}
                                    key={item.src}
                                >

                                    <Image
                                        src={navLogoMobile.src}
                                        alt={navLogoMobile.name}
                                        className={itemLogoClassname}
                                    />
                                </AppLink>


                            );
                        }

                        if (isNavbarLinkFakeObject(item)) {
                            return (
                                <div
                                    className={itemFakeLinkClassname}
                                    key={item.reactKey}
                                >
                                    {item.name}
                                </div>
                            );
                        }



                        return null;
                    })}
            </>
        );
    };

NavbarItemsComponent.displayName = 'NavbarItems';

const NavbarItems = memo(NavbarItemsComponent);


