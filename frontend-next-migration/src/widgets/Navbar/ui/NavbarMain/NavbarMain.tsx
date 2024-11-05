'use client';
/* This code snippet is defining a React functional component called `NavbarMain`. It imports necessary
dependencies such as `memo` from React, and components like `NavbarDesktopV2` and `NavbarMobileV2`.
It also imports some types and functions related to the navbar. */
import { memo, useMemo } from 'react';
import { FixedProvider } from '@/widgets/Navbar/model/FixedProvider';
import useSizes from '@/shared/lib/hooks/useSizes';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import { NavBarType } from '../../model/types';
import NavbarDesktopV2 from '../NavbarDesktopV2/NavbarDesktopV2';
import NavbarMobileV3 from '../NavbarMobileV3/NavbarMobileV3';
import { CollapsedProvider } from '../../model/CollapsedProvider';

interface NavbarMainProps {
    marginTop?: number;
    className?: string;
    navBarType?: NavBarType;
}

export const NavbarMain = memo((props: NavbarMainProps) => {
    const { marginTop, className, navBarType = 'Default' } = props;

    const { isMobileSize, isTabletSize } = useSizes();
    const size = useMemo(
        () => (isMobileSize || isTabletSize ? 'mobile' : 'desktop'),
        [isMobileSize, isTabletSize],
    );
    const navbarBuild = useMemo(
        () => getNavbarBuildByTypeAndSize(navBarType, size),
        [navBarType, size],
    );
    if (!navBarType) return null;

    return (
        <FixedProvider>
            <CollapsedProvider>
                {isMobileSize || isTabletSize ? (
                    <NavbarMobileV3
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarBuild}
                        navBarType={navBarType}
                    />
                ) : (
                    <NavbarDesktopV2
                        marginTop={marginTop}
                        className={className}
                        navbarBuild={navbarBuild}
                        navBarType={navBarType}
                    />
                )}
            </CollapsedProvider>
        </FixedProvider>
    );
});

NavbarMain.displayName = 'NavbarMain';
