"use client"

import FetchServiceInstance from '@/app/api';
import { Button, Dropdown } from '@/components/UI/UIComponents';
import { useUserStore } from '@/stores/user-profile-store';
import { getTranslatedText } from '@/utils';
import toast from 'react-hot-toast';

function AddToCollectionButton({ slug }: { slug: string }) {
  const userStoredData = useUserStore((state) => state.user);
  const storedList = userStoredData.anime_lists

  const addToList = async ({ list }: { list: string }) => {
    const data = await FetchServiceInstance.fetchHelper('lists/add/anime', {
      to: 'out',
      body: {
        anime_slug: slug,
        list_id: list,
      },
      method: 'POST',
    });

    if (data && data.message) {
      toast.success(data.message);
    }
  };

  return storedList && storedList.length > 0 ? (
    <Dropdown currentState={getTranslatedText('info.addToList')} position="center">
      {storedList.map((e) => {
        return (
          <Button variant='button' onClick={() => addToList({ list: e.id || '' })} key={e.id}>
            {e.title}
          </Button>
        );
      })}
    </Dropdown>
  ) : (
    <Button as={"button"} variant='outline' onClick={() => toast.error(getTranslatedText('info.notLogginedUser'))}>{getTranslatedText('info.addToList')}</Button>
  );
}

export default AddToCollectionButton;
