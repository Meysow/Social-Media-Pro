import { useEffect, useState } from 'react';

// Components //
import Input from './Input';
import Post from './Post';

// State //
import { useRecoilState } from 'recoil';
import { handlePostState, useSSRPostsState } from '../atoms/postAtom';

const Feed = ({ posts }) => {
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [useSSRPosts, setUseSSRPosts] = useRecoilState(useSSRPostsState);
  const [realtimePosts, setRealtimePosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/posts', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPosts(false);
    };
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handlePost]);

  return (
    <div className='space-y-6 pb-24 max-w-lg'>
      <Input />
      {/* Posts */}
      {!useSSRPosts
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
    </div>
  );
};

export default Feed;
