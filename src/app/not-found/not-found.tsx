// app/not-found.tsx (Next.js 13+)

import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='flex flex-col h-dvh justify-center items-center'>
      <h1>404 - Page Not Found</h1>
      <p>Sorry, the page you were looking for could not be found.</p>
      <Link href="/">
        <p  className='bg-[#0070f3] my-5 py-2 px-4 rounded text-white'>Go back to Home</p>
      </Link>
    </div>
  );
}

