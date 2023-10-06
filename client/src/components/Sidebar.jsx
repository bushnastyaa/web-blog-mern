import { useState, useEffect } from 'react';
import axios from 'axios';
import SidebarPost from "./SidebarPost.jsx";
import computer from '../images/retro-computer.jpg'

const Sidebar = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await axios.get('http://localhost:5000/api/posts/popular');
      setPosts(data);
    }
    fetchPosts();
  }, []);

  return (
    <div className="w-full max-w-[300px] text-[15px] max-md:hidden rounded-md mb-20">
      <div className="flex flex-col items-center">
        <span className="w-full bg-beige font-palanquin font-bold text-center leading-7 py-2">
          ABOUT US
        </span>
        <img 
          src={computer}
          alt="search-hands"
          className="w-full max-w-[250px] max-h-[250px] mt-8"
        />
        <p className="p-6">
          This blog helps you to gain new knowledge and improve your development skills. 
          Stay tuned for more content!
        </p>
      </div>

      <div className="flex flex-col items-center">
        <span className="w-full bg-beige font-palanquin font-bold text-center leading-7 py-2">
          POPULAR
        </span>
        {posts.map((post) => (
          <div key={post._id} className="last:border-none w-full p-6 flex flex-col items-start border-b">
            <SidebarPost post={post} />
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center">
        <span className="w-full bg-beige font-palanquin font-bold text-center leading-7 py-2">
          FOLLOW US
        </span>
        <div className="mt-7 flex items-center justify-center gap-2">
          <i className="fab fa-vk"></i>
          <i className="fab fa-pinterest"></i>
          <i className="fab fa-telegram"></i>
          <i className="fab fa-youtube"></i>
        </div>
      </div>
    </div>
  )
}

export default Sidebar;
