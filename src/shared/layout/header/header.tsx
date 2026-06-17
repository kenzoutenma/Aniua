'use client';

import { Button, Dropdown, ProfilePicture } from '@/shared/ui';
import styles from './header.module.scss';

import useUserProfile from '@/features/user/hooks/useUserProfile';
import { getAccount, pathsProfile } from '@/shared/constants/headersconst';
import { getTranslatedText } from '@/shared/lib';
import Link from 'next/link';
import React from 'react';

export default function Header() {
  const { userStoredData } = useUserProfile();

  const AccountBlock = userStoredData?.username ? ProfileBlock : AuthBlock;

  return (
    <header className={styles.header}>
      <nav>
        <div className={styles.header_left}>
          <Button as={Link} href={'/'}>
            {getTranslatedText(`header.app`)}
          </Button>
          <ul>
            <li>
              <Button as={Link} href={'/list'}>
                {getTranslatedText(`paths.list`)}
              </Button>
            </li>
            <li>
              <Button as={Link} href={'/explore'}>
                Popular
              </Button>
            </li>
            <li>
              <Button as={Link} href={'/explore'}>
                Top
              </Button>
            </li>
          </ul>
        </div>
        <ul>
          <AccountBlock userStoredData={userStoredData} />
        </ul>
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
  return (
    <>
      <li>
        <Button
          as={Link}
          variant="link"
          href={getAccount.registration}
          key="registration_button_header"
        >
          {getTranslatedText(`header.registration`)}
        </Button>
      </li>
      <li>
        <Button as={Link} variant="primary" href={getAccount.login} key="login_button_header">
          {getTranslatedText(`header.login`)}
        </Button>
      </li>
    </>
  );
};

ProfileBlock.displayName = 'ProfileBlock';
