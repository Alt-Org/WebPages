import { render, screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { useClientTranslation } from '@/shared/i18n';
import useIsPageScrollbar from '@/shared/lib/hooks/useIsPageScrollbar';
import { CollapsedProvider } from '../../model/CollapsedProvider';
import { FixedProvider } from '../../model/FixedProvider';
import { getNavbarBuildByTypeAndSize } from '../../model/getNavbarBuildByTypeAndSize';
import NavbarDesktop from './NavbarDesktop';

jest.mock('@/shared/i18n', () => ({
    useClientTranslation: jest.fn(),
}));

jest.mock('@/entities/Auth', () => ({
    useLoginMutation: jest.fn(),
    useLogoutMutation: () => [jest.fn()],
    useUserPermissionsV2: () => ({
        checkPermissionFor: (what: string) => {
            if (what === 'login') return { isGranted: true };
            return { isGranted: false };
        },
    }),
}));

jest.mock('@/shared/lib/hooks/useIsPageScrollbar');

describe('Navbar', () => {
    beforeEach(() => {
        (useClientTranslation as jest.Mock).mockReturnValue({ t: jest.fn((key) => key) });
        (useIsPageScrollbar as jest.Mock).mockReturnValue(true);
    });

    test('render components', async () => {
        render(
            <FixedProvider>
                <CollapsedProvider>
                    <NavbarDesktop
                        navbarBuild={getNavbarBuildByTypeAndSize('Default', 'desktop')}
                    />
                </CollapsedProvider>
            </FixedProvider>,
        );

        expect(screen.getByRole('toggleFixButton')).toBeVisible();

        const toggleFix = screen.getByRole('toggleFixButton');
        await user.click(toggleFix);

        expect(screen.getByRole('collapseExpand')).toBeVisible();
        const toggleCollapse = screen.getByRole('collapseExpand');
        user.click(toggleCollapse);

        //wait for transitions
        waitFor(
            () => {
                expect(screen.getByRole('toggleFixButton')).not.toBeVisible();
            },
            { timeout: 500 },
        );

        user.click(toggleCollapse);

        waitFor(
            () => {
                expect(screen.getByRole('toggleFixButton')).toBeVisible();
            },
            { timeout: 500 },
        );
    });
});
