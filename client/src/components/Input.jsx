const Input = ({ 
  label, 
  type, 
  id, 
  placeholder, 
  errors, 
  register, 
  required,
}) => {
  return (
    <>
      <label htmlFor={id} className="sr-only">{label}</label>
        <input 
          type={type} 
          id={id}
          placeholder={placeholder} 
          className={`input-login text-[14px] mt-3 
          ${errors[id]
            ? "border-pink-500 focus:border-pink-500 focus:ring-pink-500"  
            : "border-[#ccc]"}`}
          {...register(id, { required })}
        />
        {errors[id] && (
          <p className="text-red-500 text-sm mt-2">
            {errors[id]?.message}
          </p>
        )}
    </>
  )
};

export default Input;
