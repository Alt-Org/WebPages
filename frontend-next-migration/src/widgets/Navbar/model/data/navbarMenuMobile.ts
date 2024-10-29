import { NavbarBuilder } from '@/widgets/Navbar/model/data/NavbarBuilder';
import { dropdowns } from '@/widgets/Navbar/model/data/dropdowns';
import { ArtGameSections } from '@/entities/PresentationPackages/model/data/artGameSections';
import { CookiesSections } from '@/entities/PresentationPackages/model/data/cookiesSections';
import { PrivacySections } from '@/entities/PresentationPackages/model/data/privacySections';
import {
    getRouteMainPage,
    getRouteAllNewsPage,
    getRouteTeamPage,
    getRouteLoginPage,
} from '@/shared/appLinks/RoutePaths';
import img from '@/shared/assets/images/altLogo.png';

const navbarBuilder = new NavbarBuilder();
navbarBuilder.addLink('main', getRouteMainPage(), false);
navbarBuilder.addLink('news', getRouteAllNewsPage(), true);
navbarBuilder.addDropDown('game', false, dropdowns.game);
navbarBuilder.addDropDown('gallery', false, dropdowns.gallery);
navbarBuilder.addDropDown('gameart', false, dropdowns.gameart);
navbarBuilder.addDropDown('community', false, dropdowns.community);
navbarBuilder.addLink('team', getRouteTeamPage(), false);
navbarBuilder.addLogo('main', img as unknown as string, getRouteMainPage());
navbarBuilder.addAuthProfile('profile', dropdowns.profile);
navbarBuilder.addAuthLogin('login', getRouteLoginPage());

export const navbarMenuMobile = navbarBuilder.build();

const navbarGameArtBuilder = new NavbarBuilder();
navbarGameArtBuilder.addLogo('main', img as unknown as string, getRouteMainPage());
navbarGameArtBuilder.addLink('main', getRouteMainPage(), false);
ArtGameSections.forEach((section) => {
    navbarGameArtBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarGameArtMobile = navbarGameArtBuilder.build();

const navbarCookiesBuilder = new NavbarBuilder();
navbarCookiesBuilder.addLogo('main', img as unknown as string, getRouteMainPage());
navbarCookiesBuilder.addLink('main', getRouteMainPage(), false);
CookiesSections.forEach((section) => {
    navbarCookiesBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarCookiesMobile = navbarCookiesBuilder.build();

const navbarPrivacyBuilder = new NavbarBuilder();
navbarPrivacyBuilder.addLogo('main', img as unknown as string, getRouteMainPage());
navbarPrivacyBuilder.addLink('main', getRouteMainPage(), false);
PrivacySections.forEach((section) => {
    navbarPrivacyBuilder.addLink(section.label, `#${section.id}`, false);
});

export const navbarPrivacyMobile = navbarPrivacyBuilder.build();
