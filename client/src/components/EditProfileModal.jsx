import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { apiPath } from '../routes';

const EditProfileModal = ({ user, onClose }) => {
  const navigate = useNavigate();
  const [image, setImage] = useState(user.profileImg);
  const [updatedUser, setUpdatedUser] = useState({
    username: user.username,
    desc: user.desc,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userUpd = {
        username: updatedUser.username,
        desc: updatedUser.desc,
        profileImg: image
      }
      await axios.put(
        `${apiPath}/users/${user._id}`, 
        userUpd
      );
      navigate(0);
      onClose();
    } catch (err) {
      alert('Error while updating a user');
    }
  };

  const handleChange = (e) => {
    setUpdatedUser({ ...updatedUser, [e.target.name]: e.target.value });
  };

  const handleChangeFile = async (e) => {
    try {
      const data = new FormData();
      const file = e.target.files[0];
      data.append("file", file);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dcsblcloa/image/upload",
        data
      );
      const { url } = uploadRes.data;
      setImage(url);
    } catch (err) {
      throw new Error(err)
    }
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <div className="flex items-center my-5 mx-0">
        {image
          ? <img 
              src={image} 
              alt="user"
              width={150}
              className="rounded-3xl h-[150px] object-cover"
            /> 
          : (
            <div className="flex justify-center border-2 border-dashed
             rounded-md px-7 py-16">
              <p className="text-xl text-center">Add photo</p>
            </div>
          )
        }
        <label htmlFor="fileInput">
          <i className="cursor-pointer far fa-user-circle w-[25px] h-[25px] rounded-full
          bg-coral-red text-white flex items-center justify-center ml-2"></i>
        </label>
        <input type="file" id="fileInput" className="hidden" onChange={handleChangeFile} />
      </div>

      <div>
        <label htmlFor="username" className="font-montserrat text-lg">
          Username
        </label>
        <input 
          name="username" 
          type="text" id="username" 
          className="input" 
          placeholder="username" 
          onChange={handleChange}
          value={updatedUser.username} 
        />
        <label htmlFor="desc" className="font-montserrat text-lg">
          Description
        </label>
        <textarea
          name="desc" 
          id="desc" 
          placeholder="user's description"
          className="textarea"
          onChange={handleChange}
          value={updatedUser.desc} 
        />
      </div>

      <div className="mt-5">
        <button type="submit" className="button py-4">
          Submit
        </button>
      </div>
    </form>
  )
};

export default EditProfileModal;
