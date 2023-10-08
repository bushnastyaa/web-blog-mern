import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { v4 as uuidV4 } from 'uuid';
import CreatableReactSelect from 'react-select/creatable';
import SimpleMDE from 'react-simplemde-editor';
import useAuth from '../../hooks/useAuth.jsx';
import { apiPath } from '../../routes/index.js';

const AddPost = () => {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();
  const auth = useAuth();
  const [value, setValue] = useState('');
  const [image, setImage] = useState('');
  const [title, setTitle] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await axios.get(`${apiPath}/posts/tags`);
      setAvailableTags(data);
    }
    fetchTags();
  }, []);

  const onChange = useCallback((value) => {
    setValue(value);
  }, []);

  const options = useMemo(
    () => ({
      spellChecker: false,
      maxHeight: '400px',
      autofocus: false,
      placeholder: 'Write something...',
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
      },
    }),
    [],
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "upload");
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dcsblcloa/image/upload",
        data
      );
      const { url } = uploadRes.data;

      const newPost = {
        title,
        desc: value,
        img: url,
        userId: auth.user._id,
        tags: selectedTags,
      };

      const res = isEditing 
      ? await axios.put(`${apiPath}/posts/${id}`, newPost)
      : await axios.post(`${apiPath}/posts`, newPost);

      const _id = isEditing ? id : res.data._id

      navigate(`/post/${_id}`);
    } catch (err) {
      alert('Error while creating a post');
    }
  };

  useEffect(() => {
    if (id) {
      axios.get(`${apiPath}/posts/${id}`)
        .then(({ data }) => {
          setTitle(data.post.title);
          setValue(data.post.desc);
          setSelectedTags(data.post.tags);
          setImage(data.post.img);
        })
        .catch((err) => {
          console.warn(err)
          alert('Error while getting a post');
        });
    }
  }, []);

  return (
    <div className="max-w-[960px] mx-auto px-5 py-7">
      <form onSubmit={handleSubmit}>
        <input 
          name="photoInput"
          type="file" 
          id="photoInput" 
          className="hidden"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <label htmlFor="photoInput" className="cursor-pointer">
          {image 
            ? <img 
                src={isEditing ? image : URL.createObjectURL(image)} 
                className="w-full max-h-[320px] rounded-md object-cover" 
                alt="postImage"
              /> 
            : (
              <div className="flex justify-center border-2 border-dashed 
              border-gold rounded-md p-32 hover:bg-slate-50">
                <p className="text-xl text-gold text-center">Add picture</p>
              </div>
            )
          }
        </label>
          
        <input
          name="title" 
          type="text" 
          id="title" 
          placeholder="Post title..." 
          autoFocus={true}
          className="mt-5 w-full text-2xl leading-normal 
          outline-none placeholder-[#A3A3A3]"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />
        <label htmlFor="title" className="sr-only">Post title</label>

        <CreatableReactSelect 
          isMulti 
          placeholder="Select tags" 
          className="mt-5 text-[14px]"
          onCreateOption={label => {
            const newTag = { id: uuidV4(), label }
            setAvailableTags(prev => [...prev, newTag])
            setSelectedTags(prev => [...prev, newTag])
          }}
          value={selectedTags.map(tag => {
            return { label: tag.label, value: tag.id }
          })}
          options={availableTags.map(tag => {
            return { label: tag.label, value: tag.id }
          })}
          onChange={tags => {
            setSelectedTags(tags.map(tag => {
              return { label: tag.label, id: tag.value }
            }))
          }}
        />
        <SimpleMDE className="my-5 mx--5" value={value} onChange={onChange} options={options} />
        <button
          className="mb-4 button"
          type="submit">
            {isEditing ? "Edit" : "Publish"}
        </button>
      </form>
    </div>
  )
}

export default AddPost;
