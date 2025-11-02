'use client';

import FI from '@/app/api';
import useUserProfile from '@/features/user/hooks/useUserProfile';
import chartDataExtractor from '@/features/user/utils/chart-data-extract';
import { userAPIConstant } from '@/shared/constants/api-endpoints.constant';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Typography } from '@/shared/ui';
import styles from './profile.module.css';
import Section from '@/shared/layout/section/section';

export default function ProfileComponent() {
  const { userStoredData } = useUserProfile();
  const [chart, setChart] = useState<chartData[]>([]);

  useEffect(() => {
    const fetchChart = async () => {
      const request = await FI.fetch<AnimeGenre[]>(userAPIConstant['chart'], {
        to: 'self',
        method: 'GET',
        cache: 'no-store',
      });
      if (!request.ok) return null;

      const chart = chartDataExtractor({ genres: request.data });
      console.log(chart);
      setChart(chart);
    };

    fetchChart();
  }, []);

  return (
    <Section typeOfSection={'OneColSection'}>
      {userStoredData ? (
        <>
          <div className={styles.profileRowUp}>
            <div>
              {userStoredData.username && (
                <Typography variant="h1"> {userStoredData.username} </Typography>
              )}
              <h2 className="text">
                {userStoredData.first_name ? userStoredData.first_name : '...'}
              </h2>
              <h2 className="subText">
                {userStoredData.description ? userStoredData.description : '...'}
              </h2>
            </div>
            {userStoredData.avatar ? (
              <Image
                className="rounded-xl size-32 md:size-64 object-cover"
                alt="pfp"
                src={userStoredData.avatar}
                width={256}
                height={256}
              />
            ) : (
              <div className="size-32 md:size-64 bg-black rounded-xl"></div>
            )}
          </div>

          <div className={styles.profileRowDown}>
            <div></div>
            {chart.length > 0 && <div className={`size-64 rounded-xl`}></div>}
          </div>
        </>
      ) : (
        <h1>Any user founded</h1>
      )}
    </Section>
  );
}
