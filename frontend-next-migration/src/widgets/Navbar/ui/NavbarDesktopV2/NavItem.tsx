
// 'use client';
// import Image from 'next/image';
// import { memo } from 'react';
// import { useUserPermissionsV2 } from '@/entities/Auth';
// import { useClientTranslation } from '@/shared/i18n';
// import { classNames } from '@/shared/lib/classNames/classNames';
// import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
// import { NavbarMenuItem } from '../../model/types';
// import cls from './NavbarDesktop.module.scss';

// type NavItemProps = {
//     item: NavbarMenuItem;
//     className?: string;
//     currentPath?: string;
// };

// const NavItem = memo((props: NavItemProps) => {
//     const { item, className = '', currentPath = '' } = props;
//     const { type: itemType } = item;
//     const { t } = useClientTranslation('navbar');
//     const { checkPermissionFor } = useUserPermissionsV2();

//     if (itemType === 'navLink') {
//         return (
//             <li
//                 key={item.path}
//                 className={classNames(cls.navItem, { [cls.active]: currentPath === item.path }, [
//                     className,
//                 ])}
//             >
//                 <AppLink className={cls.link}
//                     theme={AppLinkTheme.PRIMARY}
//                     to={item.path}
//                     key={item.path}
//                 >
//                     <div className={cls.navItem}>{t(`${item.name}`)}</div>
//                 </AppLink>
//             </li>
//         );
//     }
    

//     if (itemType === 'navDropDown') {
//         const canUserSeeOwnClan = checkPermissionFor('clan:seeOwn').isGranted;
//         const localizedElements = item.elements
//             .map((element) => {
//                 // @ts-ignore
//                 if (element.elementText === 'clanpage' && !canUserSeeOwnClan) {
//                     return null;
//                 }
//                 // @ts-ignore
//                 const transformedElement = {
//                     // @ts-ignore
//                     ...element,
//                     // @ts-ignore
//                     elementText: t(`${element.elementText}`),
//                     // @ts-ignore
//                     contentItemClassName: cls.dropdownElement,
//                     contentItemClassName: classNames(cls.dropdownElement, {
//                     //     // @ts-ignore
//                         [cls.active]: currentPath === element?.link?.path,
//                     }),
//                     // @ts-ignore
//                     active: currentPath === element?.link?.path,
//                 };

//                 return transformedElement;
//             })
//             .filter((element) => element !== null);

//         // console.log(localizedElements)

//         const isDropdownActive = localizedElements.some((element) => element.active);

//     return (
//                     <li
//                         key={item.name}
//                         className={classNames(cls.navItem, { [cls.active]: isDropdownActive }, [className])}
//                     >
//                         <div className={cls.navItem}>{t(`${item.name}`)}</div>
//                         <ul className={cls.itemNavbarDropDownContent}>
//                             {localizedElements.map((element) => (
//                                 <li key={element.elementText} className={classNames({ [cls.active]: element.active })}>
//                                     <AppLink
//                                         theme={AppLinkTheme.SECONDARY}
//                                         to={element.link.path}
//                                     >
//                                         {element.elementText}
//                                     </AppLink>
//                                 </li>
//                             ))}
//                         </ul>
//                     </li>
//                 );
//             }
        

//     if (itemType === 'navLogo') {
//         return (
//             <li
//                 key={item.src}
//                 className={classNames(cls.navItem, {}, [className])}
//                 // className={className}
//             >
//                 <AppLink
//                     theme={AppLinkTheme.PRIMARY}
//                     to={item.path}
//                     className={classNames(cls.appLink, {}, [cls.appLinkLogo])}
//                 >
//                     <Image
//                         priority={true}
//                         loading={'eager'}
//                         alt={item.name || ''}
//                         src={item.src || ''}
//                         width={120}
//                         height={0}
//                         className={cls.itemLogoImg}
//                     />
//                 </AppLink>
//             </li>
//         );
//     }
// });

// NavItem.displayName = 'NavItem';

// export default NavItem;
'use client';
import Image from 'next/image';
import { memo } from 'react';
import { useUserPermissionsV2 } from '@/entities/Auth';
import { useClientTranslation } from '@/shared/i18n';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from '@/shared/ui/AppLink/AppLink';
// import { DropdownWrapper } from '@/shared/ui/   ';
import { NavbarMenuItem } from '../../model/types';
import cls from './NavbarDesktop.module.scss';
import { DropdownWrapper } from '@/shared/ui/DropdownWrapperV2';

type NavItemProps = {
    item: NavbarMenuItem;
    className?: string;
    currentPath?: string;
};

const NavItem = memo((props: NavItemProps) => {
    const { item, className = '', currentPath = '' } = props;
    const { type: itemType } = item;
    const { t } = useClientTranslation('navbar');
    const { checkPermissionFor } = useUserPermissionsV2();

    if (itemType === 'navLink') {
        return (
            <li
                key={item.path}
                className={classNames(cls.navItem, { [cls.active]: currentPath === item.path }, [
                    className,
                ])}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    key={item.path}
                >
                    <span className={cls.navItem}>{t(`${item.name}`)}</span>
                </AppLink>
            </li>
        );
    }

    if (itemType === 'navDropDown') {
        const canUserSeeOwnClan = checkPermissionFor('clan:seeOwn').isGranted;
        const localizedElements = item.elements
            .map((element) => {
                // @ts-ignore
                if (element.elementText === 'clanpage' && !canUserSeeOwnClan) {
                    return null;
                }
                // @ts-ignore
                const transformedElement = {
                    // @ts-ignore
                    ...element,
                    // @ts-ignore
                    elementText: t(`${element.elementText}`),
                    // @ts-ignore
                    // contentItemClassName: cls.dropdownElement,
                    // contentItemClassName: classNames(cls.dropdownElement, {
                    //     // @ts-ignore
                    //     [cls.active]: currentPath === element?.link?.path,
                    // }),
                    // @ts-ignore
                    active: currentPath === element?.link?.path,
                };

                return transformedElement;
            })
            .filter((element) => element !== null);

        // console.log(localizedElements)

        const isDropdownActive = localizedElements.some((element) => element.active);

        return (
            <li
                key={item.name}
                className={classNames(cls.navItem, { [cls.active]: isDropdownActive }, [className])}
            >
                <DropdownWrapper
                    elements={localizedElements}
                    contentAbsolute={false}
                    mouseOverLeaveMode={false}
                    contentClassName={cls.itemNavbarDropDownContent}
                >
                    <div className={cls.navItem}>{t(`${item.name}`)}</div>
                </DropdownWrapper>
            </li>
        );
    }

    if (itemType === 'navLogo') {
        return (
            <li
                key={item.src}
                className={classNames(cls.navItem, {}, [className])}
                // className={className}
            >
                <AppLink
                    theme={AppLinkTheme.PRIMARY}
                    to={item.path}
                    className={classNames(cls.appLink, {}, [cls.appLinkLogo])}
                >
                    <Image
                        priority={true}
                        loading={'eager'}
                        alt={item.name || ''}
                        src={item.src || ''}
                        width={120}
                        height={0}
                        className={cls.itemLogoImg}
                    />
                </AppLink>
            </li>
        );
    }
});

NavItem.displayName = 'NavItem';

export default NavItem;
