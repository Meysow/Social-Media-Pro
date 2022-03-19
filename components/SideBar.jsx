import Image from 'next/image';
import { signOut } from 'next-auth/react';
import { Avatar } from '@mui/material';

// Icons //
import BookmarkOutlinedIcon from '@mui/icons-material/BookmarkOutlined';
import AddRoundedIcon from '@mui/icons-material/AddRounded';

const SideBar = () => {
  return (
    <div className='space-y-2 min-w-max max-w-lg'>
      {/* Top */}
      <div className='bg-white dark:bg-[#1D2226] rounded-lg overflow-hidden relative flex flex-col items-center text-center border border-gray-300 dark:border-none'>
        <div className='relative w-full h-14'>
          <Image src='https://rb.gy/i26zak' layout='fill' priority alt='background' />
        </div>
        <Avatar
          onClick={signOut}
          // src={session?.user?.image}
          src='https://s2.qwant.com/thumbr/0x380/5/4/77173e5c8debbdc0bec5e84fa16b4aad3492d11eb4c063367f070c0fd97c27/.jpg?u=https%3A%2F%2Fd7hftxdivxxvm.cloudfront.net%2F%3Fresize_to%3Dfit%26width%3D1594%26height%3D1600%26quality%3D50%26src%3Dhttps%3A%252F%252Fd32dm0rphc51dk.cloudfront.net%252FeP9B7431EZY4cBx3EZQ2XA%252Fnormalized.jpg&q=0&b=1&p=0&a=0'
          className='!h-14 !w-14 !border-2 !absolute !top-4 !cursor-pointer'
        />
        <div className='mt-5 py-4 space-y-0.5 '>
          <h4 className='hover:underline decoration-purple-700 underline-offset-1 cursor-pointer'>
            Meysow
          </h4>
          <p className='text-black/60 dark:text-white/75 text-sm'>meysow@email.com</p>
        </div>

        <div className='hidden md:inline text-left dark:text-white/75 text-sm'>
          <div className='font-medium sidebarButton space-y-0.5'>
            <div className='flex justify-between space-x-2'>
              <h4>Who viewed your profile</h4>
              <span className='text-blue-500'>321</span>
            </div>
            <div className='flex justify-between space-x-2'>
              <h4>Views of your post</h4>
              <span className='text-blue-500'>1,892</span>
            </div>
          </div>

          <div className='sidebarButton'>
            <h4 className='leading-4 text-xs'>Access exclusive tools & insights</h4>
            <h4 className='dark:text-white font-medium'>
              <span className='w-3 h-3 bg-gradient-to-tr from-yellow-700 to-yellow-200 inline-block rounded-sm mr-1' />{' '}
              Try Premium for free
            </h4>
          </div>

          <div className='sidebarButton flex items-center space-x-1.5'>
            <BookmarkOutlinedIcon className='!-ml-1' />
            <h4 className='dark:text-white font-medium'>My items</h4>
          </div>
        </div>
      </div>
      {/* Bottom */}
      <div className='hidden md:flex bg-white dark:bg-[#1D2226] text-black/70 dark:text-white/75 rounded-lg overflow-hidden flex-col space-y-2 pt-2.5 sticky top-20 border border-gray-300 dark:border-none'>
        <p className='sidebarLink'>Groups</p>
        <div className='flex items-center justify-between'>
          <p className='sidebarLink'>Events</p>
          <AddRoundedIcon className='!h-5' />
        </div>
        <p className='sidebarLink'>Followed Hashtags</p>
        <div className='sidebarButton text-center'>
          <h4 className='dark:text-white font-medium text-sm'>Discover More</h4>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
