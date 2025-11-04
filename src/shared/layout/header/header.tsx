'use client';
import styles from './header.module.css';

import { Button, Dropdown, ProfilePicture } from '@/shared/ui';
import clsx from 'clsx';

import useUserProfile from '@/features/user/hooks/useUserProfile';
import { getAccount, paths, pathsProfile } from '@/shared/constants/headersconst';
import { useScrollDirection } from '@/shared/hooks/useScrollDirection';
import { getTranslatedText } from '@/shared/lib';
import { useSettingsStore } from '@/shared/state/settings-store';
import Link from 'next/link';
import React from 'react';
import SearchBar from './search-bar/search-bar';

export default function Header() {
  const { userStoredData } = useUserProfile();

  const hideHeader = useSettingsStore((state) => state.settings?.hide_header);
  const scrollingDown = useScrollDirection(!hideHeader);
  const shouldHideHeader = hideHeader && scrollingDown;

  const AccountBlock = userStoredData?.username ? ProfileBlock : AuthBlock;

  return (
    <header
      className={clsx(styles.header_wrap, shouldHideHeader ? styles.header_hidden : '')}
    >
      <nav className={styles.header}>
        <Button variant="link" as={Link} href={paths.home}>
          {getTranslatedText(`header.app`)}
        </Button>
        <Button variant="link" as={Link} href={paths.list}>
          {getTranslatedText(`paths.list`)}
        </Button>
        <SearchBar />
        <div className={styles.header_account_block}>
          <AccountBlock userStoredData={userStoredData} />
        </div>
      </nav>
    </header>
  );
}

const ProfileBlock = React.memo(({ userStoredData }: { userStoredData: UserProfileInterface }) => (
  <>
    <Dropdown trigger={<ProfilePicture avatar={userStoredData?.avatar} />} align="right">
      {Object.entries(pathsProfile).map((path, index) => (
        <Button key={index} as={Link} href={path[1]}>
          {getTranslatedText(`paths.${path[0]}`)}
        </Button>
      ))}
    </Dropdown>
  </>
));

const AuthBlock = () => {
  return <>
    <Button
      as={Link}
      variant="link"
      href={getAccount.registration}
      key="registration_button_header"
    >
      {getTranslatedText(`header.registration`)}
    </Button>
    <Button as={Link} variant="primary" href={getAccount.login} key="login_button_header">
      {getTranslatedText(`header.login`)}
    </Button>
  </>
}

ProfileBlock.displayName = 'ProfileBlock';
