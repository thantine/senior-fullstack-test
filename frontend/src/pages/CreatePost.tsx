import React, { useState } from "react";
import { RootState, useAppDispatch, useAppSelector } from "../store";
import { createPost } from "../store/postsSlice";
import { useNavigate } from "react-router-dom";

const CreatePost: React.FC = () => {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const dispatch = useAppDispatch();
  const { error, status } = useAppSelector((state: RootState) => state.posts);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(createPost({ content })).then(() => setContent(""));
  };

  const handleHomePageRedirect = () => {
    navigate("/"); // Redirect to the login page
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Create Post</h2>
        {status === "failed" && error && (
          <p className="text-red-500 mb-4">{error}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700"
            >
              Post content
            </label>
            <textarea
              id="body"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={4}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Post
          </button>

          {status === "loading" && (
            <p className="text-blue-500 mt-2">Submitting...</p>
          )}
        </form>
        <div className="mt-4 text-center">
          <button
            onClick={handleHomePageRedirect}
            className="mt-2 text-blue-500 hover:text-blue-700"
          >
            Back to home page
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
