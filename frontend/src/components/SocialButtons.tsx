import { useAppDispatch } from "../store";
import { Post, postToFacebook } from "../store/postsSlice";

interface Props {
  post: Post;
}

const SocialButtons = ({ post }: Props) => {
  const dispatch = useAppDispatch();

  const disabled = !!post.fbPostId;

  const handlePostToFacebook = () => {
    dispatch(postToFacebook(post.id));
  };

  return (
    <div className="flex space-x-4 items-center">
      <span className="mr-2">like: {post.like || 0}</span>
      <span className="mr-2">share: {post.share || 0}</span>
      <button
        disabled={disabled}
        title={disabled ? "Already posted to facebook" : "Post to facebook"}
        className={`inline-flex items-center text-white px-4 py-2 rounded-full shadow-md ${
          disabled ? "bg-gray-600" : "bg-blue-600"
        }`}
        onClick={handlePostToFacebook}
      >
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M22 12.07c0-5.62-4.58-10.2-10.2-10.2-5.62 0-10.2 4.58-10.2 10.2 0 5.04 3.72 9.2 8.65 10.14v-7.18h-2.62v-2.96h2.62v-2.18c0-2.6 1.54-4.02 3.86-4.02 1.1 0 2.24.1 2.24.1v2.46h-1.26c-1.24 0-1.62.77-1.62 1.57v1.8h2.77l-.44 2.96h-2.33v7.18c4.93-.94 8.65-5.1 8.65-10.14z" />
        </svg>
      </button>

      {/* <button
        title="post on linkedin"
        className="inline-flex items-center bg-blue-700 text-white px-4 py-2 rounded-full shadow-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <svg
          className="h-5 w-5"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.447 20.447h-3.998v-5.844c0-1.39-.03-3.177-1.934-3.177-1.934 0-2.231 1.512-2.231 3.073v5.948h-4v-11.95h3.825v1.628h.053c.532-.952 1.835-1.954 3.777-1.954 4.043 0 4.792 2.672 4.792 6.146v5.772zM5.33 8.488c-1.362 0-2.466 1.103-2.466 2.464 0 1.361 1.104 2.464 2.466 2.464s2.466-1.103 2.466-2.464c0-1.361-1.104-2.464-2.466-2.464zm1.999 11.959h-3.998v-11.95h3.998v11.95zM6.329 6.727c-1.38 0-2.329.977-2.329 2.174 0 1.196.949 2.174 2.329 2.174 1.379 0 2.328-.977 2.328-2.174 0-1.197-.949-2.174-2.328-2.174z" />
        </svg>
      </button> */}
    </div>
  );
};

export default SocialButtons;
