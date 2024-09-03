import React, { useEffect } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { countFacebookMetrics, getPosts } from "../store/postsSlice";
import { Link } from "react-router-dom";
import SocialButtons from "./SocialButtons";

const Posts: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts,
    status,
    jobStarted,
    postToFacebookError: error,
  } = useAppSelector((state: RootState) => state.posts);

  useEffect(() => {
    dispatch(getPosts());
  }, []);

  const handleCountMetrics = () => {
    dispatch(countFacebookMetrics());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold mb-4">Posts</h1>
        <div>
          <Link to="/create-post">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Create Post
            </button>
          </Link>

          <button
            disabled={jobStarted}
            className={`ml-3 text-white py-2 px-4 rounded-md shadow-md ${
              jobStarted ? "bg-gray-500" : "bg-green-500"
            }`}
            onClick={handleCountMetrics}
          >
            Start Cronjob
          </button>
        </div>
      </div>
      <hr className="pb-4" />
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p className="text-red-500 mb-4">{error}</p>}
      <ul className="space-y-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="bg-white p-4 rounded-lg shadow-md flex justify-between"
          >
            <p className="text-gray-700 mt-2">{post.content}</p>
            <SocialButtons post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Posts;
