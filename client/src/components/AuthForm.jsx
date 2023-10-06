const AuthForm = ({ onSubmit, title, bodyContent, footerContent}) => {
  return (
    <div className="bg-gray-100">
      <div className="h-[calc(100vh_-_50px)] max-w-[800px] mx-auto
       px-5 flex justify-center items-center">
        <div className="w-full bg-white rounded shadow-3xl flex justify-between 
        items-center max-sm:flex-col py-12 px-20 max-xl:px-12">
          <div className="sm:w-full">
            <img
              src="https://img.icons8.com/bubbles/200/000000/ableton.png"
              alt="auth" 
              className="rounded sm:w-full max-h-[220px] max-w-[220px]"
            />
          </div>

          <div className="w-full">
            <form className="flex flex-col my-2" onSubmit={onSubmit}>
              <h1 className="sm:text-[40px] text-[32px] font-bold font-lato text-center">
                {title}
              </h1>
              {bodyContent}
              <button className="button py-3 mt-6 rounded">{title}</button>
            </form>

            {footerContent}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthForm;
