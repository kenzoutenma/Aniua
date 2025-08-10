'use client';

import { Button } from '@/components/UI/UIComponents';
import Link from 'next/link';

export default function GlobalError() {
  const reportLink = process.env.NEXT_PUBLIC_REPORT_LINK || '/';
  return (
    <div
      style={{
        padding: 20,
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
      }}
    >
      <h1>Oh, something went wrong with server. Error code is 500 (if you know you know)</h1>
      <h2>
        Please, leave this error code{' '}
        <Button variant="link" as={Link} href={reportLink}>
          here.
        </Button>
      </h2>
      <Button variant="link" as={Link} href={reportLink}>
        <img src="/report.gif" style={{ margin: '0 auto' }}></img>
      </Button>
    </div>
  );
}
