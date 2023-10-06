const SidebarPost = ({ post }) => {
  return (
    <>
      <span className="text-lg font-palanquin font-bold cursor-pointer">
        <a href={`/post/${post._id}`}>{post.title}</a>
      </span>
      <div className="mt-2 font-montserrat text-pale-gray text-xs">
        <span className="pr-4">{new Date(post.createdAt).toDateString()}</span>
      </div>
      <div className="text-xs font-montserrat text-gold mt-2">
        {post.tags.map((tag) => (
          <span key={tag.id} className="pr-2">#{tag.label}</span>
        ))}
      </div>
    </>
  )
};

export default SidebarPost;