import { IconButton } from '@mui/joy';
import {  CircleArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

export default function GoBackButton() {
  const router = useRouter();

  const handleGoBack = () => {

    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/'); // Fallback to home page if no previous page exists
    }
  };

  return (
    <Fragment>


      <IconButton variant="soft" color="primary" size="sm" onClick={handleGoBack} className='flex justify-center items-center gap-2'>

        <CircleArrowLeft />

      </IconButton>



    </Fragment>
  );
}
