'use client';
import styles from './header.module.css';

import { Button, Dropdown, ProfilePicture } from '@/shared/ui';
import clsx from 'clsx';
import { useState } from 'react';

import useUserProfile from '@/features/user/hooks/useUserProfile';
import { getAccount, paths, pathsProfile } from '@/shared/constants/headersconst';
import { useScrollDirection } from '@/shared/hooks/useScrollDirection';
import { MenuIcon } from '@/shared/icons';
import { getTranslatedText } from '@/shared/lib';
import { useSettingsStore } from '@/shared/state/settings-store';
import Link from 'next/link';
import React from 'react';
import SearchBar from './search-bar/search-bar';

export default function Header() {
  const [isMenuOpened, setMenuOpened] = useState(false);
  const { userStoredData } = useUserProfile();

  const hideHeader = useSettingsStore((state) => state.settings?.hide_header);
  const scrollingDown = useScrollDirection(!hideHeader);
  const shouldHideHeader = hideHeader && scrollingDown && !isMenuOpened;

  const menuHandler = () => {
    document.body.classList.toggle('body-shifted');
    setMenuOpened((prev) => !prev);
  };

  const menuHide = () => {
    document.body.classList.remove('body-shifted');
    setMenuOpened(false);
  };

  const objectToButtons = (obj: Record<string, string>, namespace = 'header') => {
    return Object.entries(obj).map(([key, action]) => (
      <Button as={Link} variant="link" href={action} key={key} onClick={menuHide}>
        {getTranslatedText(`${namespace}.${key}`)}
      </Button>
    ));
  };

  const AccountBlock = userStoredData?.username
    ? ProfileBlock
    : () => <>{objectToButtons(getAccount, 'header')}</>;

  return (
    <header
      className={clsx(styles.header, shouldHideHeader ? '-translate-y-full' : '-translate-y-0')}
    >
      <nav className={styles.headerTop}>
        <MenuIcon
          onClick={() => {
            menuHandler();
          }}
        />
        <Button variant="link" className="font-semibold" as={Link} href={paths.home}>
          ANIUA
        </Button>
        <Button variant="link" as={Link} href={paths.list}>
          {getTranslatedText(`paths.list`)}
        </Button>
        <SearchBar handle={menuHide} />
        <div className="hidden md:flex ml-auto flex gap-[20px] items-center flex-row justify-center">
          <AccountBlock userStoredData={userStoredData} />
        </div>
      </nav>
      {/* SIDE MENU */}
      <nav className={clsx(!isMenuOpened ? styles.hidden : styles.sideMenu)}>
        <div className="w-full justify-between flex pt-2">
          <MenuIcon
            onClick={() => {
              menuHandler();
            }}
          />
          <SearchBar variant="icon" handle={menuHide} />
        </div>
        {objectToButtons({ ...paths, ...pathsProfile }, 'paths')}
        <div className="flex justify-between w-full mt-auto p-2">
          <AccountBlock userStoredData={userStoredData} />
        </div>
      </nav>
    </header>
  );
}

const ProfileBlock = React.memo(({ userStoredData }: { userStoredData: UserProfileInterface }) => (
  <>
    {/* <Dropdown currentState={userStoredData?.money?.toString()} isLeft={false}>
      {Object.entries(pathsMoney).map((path, index) => (
        <Dropdown.optionUrl
          key={index}
          href={path[1]}
          state={getTranslatedText('paths', path[0])}
        />
      ))}
    </Dropdown> */}
    <Dropdown customElement={<ProfilePicture avatar={userStoredData?.avatar} />} position="right">
      {Object.entries(pathsProfile).map((path, index) => (
        <Button key={index} as={Link} href={path[1]}>
          {getTranslatedText(`paths.${path[0]}`)}
        </Button>
      ))}
    </Dropdown>
  </>
));
ProfileBlock.displayName = 'ProfileBlock';
