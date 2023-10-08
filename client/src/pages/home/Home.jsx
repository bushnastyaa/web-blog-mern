import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import PostCard from '../../components/PostCard.jsx';
import Sidebar from '../../components/Sidebar.jsx';
import workplace from '../../images/workplace.png';
import SearchBar from '../../components/SearchBar.jsx';
import { apiPath } from '../../routes/index.js';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get(`${apiPath}/posts`);
      setPosts(data);
    }
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter(post => {
      return (
        (title === "" ||
          post.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            post.tags.some(postTag => postTag.id === tag.id)
          ))
      )
    })
  }, [title, selectedTags, posts])

  return (
    <>
      <div className="mt-[74px]">
        <div className="flex flex-col items-center font-lora text-primary">
          <span className="absolute top-24 text-4xl max-sm:text-2xl max-sm:top-32">React & Node</span>
          <span className="pb-2 absolute top-36 text-8xl text-[#DEB259] max-sm:text-[64px]">WebBlog</span>
        </div>
        <img
          className="w-full h-[450px] object-cover object-left mt-20"
          src={workplace}
        />
      </div>

      <div className="px-5 pt-9 mb-16 max-container">
        <SearchBar 
          title={title}
          setTitle={setTitle}
          selectedTags={selectedTags}
          setSelectedTags={setSelectedTags}
        />
  
        <div className="flex gap-10 mt-9">
          <div className="flex flex-wrap gap-10 w-full max-w-[860px] h-fit">
            {filteredPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Sidebar />
        </div>
      </div>
    </>
  )
};

export default Home;
