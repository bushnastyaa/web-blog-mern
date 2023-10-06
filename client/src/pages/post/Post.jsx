import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from "rehype-raw";
import axios from 'axios';
import Sidebar from '../../components/Sidebar.jsx';
import useAuth from '../../hooks/useAuth.jsx';

const Post = () => {
  const [post, setPost] = useState({});
  const [userPost, setUserPost] = useState({});
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getPost = async () => {
      const { data } = await axios.get(`http://localhost:5000/api/posts/${id}`);
      setPost(data.post);
      setUserPost(data.userPost);
    };
    getPost();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`);
      navigate('/');
    } catch (err) {
      throw err;
    }
  };

  return (
    <div className="px-5 py-7 max-container flex gap-10">
      <div className="w-full max-w-[860px]">
        {post.img && (
          <img
            src={post.img}
            alt="postImg"
            className="w-full max-h-[320px] rounded-md object-cover"
          />
        )}

        <div className="mt-2 flex flex-col items-center text-center">
          <h1 className="font-lato font-extrabold sm:text-3xl text-[22px]">
            {post.title}
          </h1>
          <div className="text-sm font-montserrat text-gold">
            {post.tags && post.tags.map((tag) => (
              <span key={tag.id} className="pr-2">#{tag.label}</span>
            ))}
          </div>
        </div>
        <div className="font-montserrat flex justify-between items-center max-sm:mt-3">
          <div className="flex items-center gap-2">
            {userPost.profileImg && (
              <img
                src={userPost.profileImg}
                alt="user"
                width={50}
                className="rounded-full h-[50px] object-cover max-xs:hidden"
              />
            )}
            <Link to={`/profile/${userPost._id}`}>
              <span className="text-lg font-bold max-sm:text-sm hover:underline">
                {userPost.username}
              </span>
            </Link>
          </div>
          <span className="text-pale-gray max-sm:text-sm">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>

        <p className="font-varela text-gray-700 leading-7 my-4">
          <ReactMarkdown 
            className="markdown" 
            rehypePlugins={[rehypeRaw]} 
            children={post.desc} />
        </p>

        {post.userId === user?._id && (
          <div className="sm:text-lg text-base">
            <Link to={`/post/${post._id}/edit`}>
              <i className="far fa-edit cursor-pointer text-teal-500 mr-2"></i>
              <span className="text-sm text-pale-gray">Edit</span>
            </Link>
            <i 
              className="far fa-trash-alt cursor-pointer text-red-500 mx-2" 
              onClick={handleDelete}>
            </i>
            <span className="text-sm text-pale-gray">Delete</span>
          </div>
        )}
      </div>

      <Sidebar />
    </div>
  )
}

export default Post;
