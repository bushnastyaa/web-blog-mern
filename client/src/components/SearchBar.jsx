import React, { useEffect, useState } from 'react';
import ReactSelect from "react-select";
import axios from 'axios';

const SearchBar = ({ 
    title, 
    setTitle, 
    selectedTags, 
    setSelectedTags, 
}) => {
  const [availableTags, setAvailableTags] = useState([]);

  useEffect(() => {
    const fetchTags = async () => {
      const { data } = await axios.get('http://localhost:5000/api/posts/tags');
      setAvailableTags(data);
    }
    fetchTags();
  }, []);

  return (
    <form className="flex justify-between gap-3 
    max-sm:flex-col bg-[#F5F5F5] p-3">
      <div className="w-full">   
        <label 
          htmlFor="default-search" 
          className="mb-2 text-sm font-medium 
          text-gray-900 sr-only dark:text-white"
        >
          Search
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex 
          items-center pl-3 pointer-events-none">
            <i className="w-4 h-4 text-gray-500 
            dark:text-gray-400 fas fa-search" />
          </div>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            type="search" 
            id="default-search" 
            className="p-2 pl-10 font-sans text-sm text-gray-900 input-login" 
            placeholder="Search posts..." 
            required />
        </div>
      </div>
      <ReactSelect  
        className="w-full text-sm text-gray-900" 
        placeholder="Choose tags"
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
        isMulti
      />
    </form>
  )
};

export default SearchBar;
