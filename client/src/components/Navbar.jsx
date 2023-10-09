import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid';
import useAuth from '../hooks/useAuth';

const Login = ({ handleClick }) => {
  const auth = useAuth();

  return (
    <ul className="flex justify-between items-center gap-5 
    max-lg:hidden font-montserrat text-lg text-slate-gray">
      <li><Link to="/"><i className="text-lg fas fa-search" /></Link></li>
      {auth.loggedIn ? (
        <>
          <li><Link to="/addPost">Create new post</Link></li>
          <li><Link to={`/profile/${auth.user._id}`}>Profile</Link></li>
          <li><button onClick={handleClick}>Logout</button></li>
        </>
      ) : (
        <>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </>
      )}
    </ul>
  );
};

const Navbar = () => {
  const auth = useAuth();
  const navigate = useNavigate();
  const [isMenuToggled, setIsMenuToggled] = useState(false);

  const handleClick = () => {
    auth.logOut();
    navigate('/');
  };

  return (
    <div className="sticky top-0 bg-white shadow z-50">
      <header className="max-container px-5 py-1">
        <nav className="flex justify-between items-center">
          <Link to="/" className="font-palanquin text-3xl block">
            WebBlog
          </Link>

          <Login handleClick={handleClick} />

          <div className="hidden max-lg:flex items-center gap-5">
            <Link to="/"><i className="text-lg fas fa-search" /></Link>
            <button 
              onClick={() => setIsMenuToggled(!isMenuToggled)} 
              className="border border-gold h-10 w-10 rounded-full 
              p-2 flex justify-center items-center"
            >
              <Bars3Icon className="h-6 w-6 text-gold" />
            </button>
            {isMenuToggled && (
              <div className="fixed right-0 bottom-0 z-40 h-full w-[300px] bg-beige drop-shadow-xl">
                <div className="flex justify-end p-12">
                  <button onClick={() => setIsMenuToggled(!isMenuToggled)}>
                    <XMarkIcon className="h-6 w-6 text-slate-gray" />
                  </button>
                </div>

                <div>
                  <ul className="ml-[25%] text-xl font-montserrat text-slate-gray">
                    {auth.loggedIn ? (
                      <>
                        <li className="pb-7"><Link to="/" className="text-gold">Home</Link></li>
                        <li className="pb-7"><Link to="/addPost">Create new post</Link></li>
                        <li className="pb-7"><Link to={`/profile/${auth.user._id}`}>Profile</Link></li>
                        <li><button onClick={handleClick}>Logout</button></li>
                      </>
                    ) : (
                      <>
                        <li className="pb-7"><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>

        </nav>
      </header>
    </div>
  )
};

export default Navbar;
