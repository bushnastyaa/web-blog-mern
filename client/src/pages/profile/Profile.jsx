import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../../hooks/useAuth';
import ProfilePost from "../../components/ProfilePost.jsx";
import Sidebar from "../../components/Sidebar.jsx";
import Modal from '../../components/Modal';
import { apiPath } from '../../routes';

const Profile = () => {
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [userPosts, setUserPosts] = useState([]);
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    const getUser = async () => {
      const { data } = await axios.get(`${apiPath}/users/${id}`);
      setUser(data.user);
      setUserPosts(data.userPosts);
    };
    getUser();
  }, []);

  const handleDelete = async () => {
    if (window.confirm('Are you really wanna delete your account?')) {
      try {
        await axios.delete(`${apiPath}/users/${auth.user._id}`, {
          data : {username: auth.user.username}
        });
        auth.logOut()
        navigate('/');
      } catch (err) {
        throw err;
      }
    }
  };

  return (
    <div className="px-5 pt-7 pb-12 max-container flex gap-10">
      <div className="w-full max-w-[860px]">
        <div className="px-5 py-5 rounded-lg shadow-3xl">
          <div className="flex justify-between items-start gap-x-5 max-sm:flex-col mt-2">
            <img
              src={user.profileImg 
                ? user.profileImg
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt="user"
              width={120}
              className="rounded-3xl h-[120px] object-cover"
            />

            {auth.user._id === user?._id && (
              <div className="flex gap-2 flex-wrap max-sm:mt-5">
                <Modal user={user} />
                <button onClick={handleDelete} className="button py-3 cursor-pointer">
                  Delete
                </button>
              </div>
            )}
          </div>
    
          <div>
            <p className="font-montserrat text-xl font-bold mt-5 mb-2">{user.username}</p>
            {user.desc && 
              <p className="font-varela text-primary text-[15px]">{user.desc}</p>
            }
          </div>
          <hr className="w-full mt-5 border-gold" />
          <p className="inline-block text-gold font-palanquin 
          text-2xl text-bold pt-2">
            Posts
          </p>
        </div>
  
        {userPosts.length === 0 ? (
          <div className="h-[30vh] flex justify-center items-center">
            <p className="text-xl text-gray-500">User has no posts</p> 
          </div>
        ) : (
          <>
            {userPosts.map((post) => (
              <ProfilePost key={post._id} post={post} />
            ))}
          </>
        )}
      </div>

      <Sidebar />
    </div>
  )
};

export default Profile;
