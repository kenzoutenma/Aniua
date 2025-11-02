import { UserIcon } from '@/shared/icons';
import Image from 'next/image';
import styles from "./pfp.module.css"

const ProfilePicture = ({ avatar }: { avatar?: string }) => {
  return (
    <div className={styles.pfp}>
      {avatar ? (
        <Image
          src={avatar}
          fill
          alt="profile picture"
        />
      ) : (
        <UserIcon />
      )}
    </div>
  );
};

export default ProfilePicture;
