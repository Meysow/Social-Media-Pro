import { getSession, useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { AnimatePresence } from 'framer-motion';
import { connectToDatabase } from '../utils/mongodb';

// Components //
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import Feed from '../components/Feed';
import Modal from '../components/Modal';
import Widgets from '../components/Widgets';

// State //
import { useRecoilState } from 'recoil';
import { modalState, modalTypeState } from '../atoms/modalAtom';

export default function Home({ posts, articles }) {
  console.log(posts, 'posts');
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  const router = useRouter();
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      // Handle user unAuth :
      router.push('/home');
    },
  });

  return (
    <div className='bg-[#f3f2ef] dark:bg-black dark:text-white h-screen overflow-y-scroll md:space-y-6'>
      <Head>
        <title>Feed | LinkedIn</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />

      <main className='flex justify-center gap-x-5 px-4 sm:px-12'>
        <div className='flex flex-col md:flex-row gap-5'>
          <SideBar />

          <Feed posts={posts} />
        </div>
        <Widgets articles={articles} />
        <AnimatePresence>
          {modalOpen && <Modal handleClose={() => setModalOpen(false)} type={modalType} />}
        </AnimatePresence>
      </main>
    </div>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        permanent: false,
        destination: '/home',
      },
    };
  }

  // Get Posts on SSR
  const { db } = await connectToDatabase();
  const posts = await db.collection('posts').find().sort({ timestamp: -1 }).toArray();

  // Get News
  const results = await fetch(
    `https://newsapi.org/v2/top-headlines?country=fr&category=business&apiKey=${process.env.NEWS_API_KEY}`
  ).then((res) => res.json());

  return {
    props: {
      session,
      articles: results.articles,
      posts: posts.map((post) => ({
        ...post,
        _id: post._id.toString(),
        timestamp: post.timestamp.toString(),
      })),
    },
  };
};
