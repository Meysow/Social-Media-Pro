import { atom } from 'recoil';

// Posts States //
export const handlePostState = atom({
  key: 'handlePostState',
  default: false,
});

export const getPostState = atom({
  key: 'getPostState',
  default: {},
});

export const useSSRPostsState = atom({
  key: 'useSSRPostsState',
  default: true,
});
