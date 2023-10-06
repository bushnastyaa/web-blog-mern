import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  return (
    <div className="2xl:max-w-[385px] w-full">
      {post.img && (
        <img
          src={post.img}
          alt="postImg"
          className="w-full h-[280px] object-cover rounded-md"
        />
      )}

      <div className="flex flex-col items-center">
        <div className="text-sm font-montserrat text-gold 
        mt-4 flex flex-wrap justify-center">
          {post.tags.map((tag) => (
            <span key={tag.id} className="pr-2">#{tag.label}</span>
          ))}
        </div>
        <Link to={`/post/${post._id}`} className="mt-2 text-center">
          <span className="text-2xl text-center font-palanquin font-bold cursor-pointer">
            {post.title}
          </span>
        </Link>
        <div className="mt-4 font-montserrat text-pale-gray text-sm">
          <span className="pr-4">{new Date(post.createdAt).toDateString()}</span>
        </div>
      </div>

      <p className="font-varela text-[15px] leading-6 mt-4 
      text-primary line-clamp-4 text-ellipsis">
        {post.desc}
      </p>
    </div>
  )
}

export default PostCard;
