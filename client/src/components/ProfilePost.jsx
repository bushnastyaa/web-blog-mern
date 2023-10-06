import { Link } from 'react-router-dom';

const ProfilePost = ({ post }) => {
  return (
    <div className="mt-5 rounded-lg shadow-3xl">
      {post.img && (
        <img
          src={post.img}
          alt="postImg"
          className="w-full max-h-[320px] rounded-md object-cover"
        />
      )}
      <div className="p-8">
        <Link to={`/post/${post._id}`}>
          <span className="text-2xl font-palanquin font-bold cursor-pointer mt-4">
            {post.title}
          </span>
        </Link>
        <div className="mt-2 font-montserrat text-pale-gray text-sm">
          <span className="pr-4">{new Date(post.createdAt).toDateString()}</span>
        </div>
        <div className="text-sm font-montserrat text-gold mt-2">
          {post.tags && post.tags.map((tag) => (
            <span key={tag.id} className="pr-2">#{tag.label}</span>
          ))}
        </div>
  
        <p className="font-varela text-[15px] leading-6 mt-4 text-primary line-clamp-4 text-ellipsis">
          {post.desc}
        </p>
      </div>
    </div>
  )
}

export default ProfilePost;
