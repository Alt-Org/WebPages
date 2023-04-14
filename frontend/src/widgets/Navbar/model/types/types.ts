export type Position = "left" | "right" | "center"


export interface NavbarLinkFakeObject{
    name: string;
    type: 'navLinkFake';
    position: Position;
    reactKey: string;
}

export interface NavbarLinkObject {
    name: string;
    path: string;
    isActive: boolean;
    type : 'navLink';
    position: Position
}

export interface NavLogoObject{
    name: string;
    src: string;
    path: string;
    type : 'navLogo'
    position: Position
}

export type PositionChecker = (position: Position) => boolean;

export type NavbarMenu = ReadonlyArray<(NavbarLinkObject | NavLogoObject | NavbarLinkFakeObject)>;


// touch

export interface NavLogoMobileObject {
    name: string;
    path: string;
    src: string;
}

export interface NavbarMenuMobileItem {
    name: string;
    path: string;
}

export interface NavbarMenuMobile extends ReadonlyArray<NavbarMenuMobileItem> {}
