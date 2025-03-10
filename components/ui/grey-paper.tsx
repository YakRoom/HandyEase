const GreyPaper = ({ children, ...props }) => {
  return (
    <div
      className=" bg-gray-100 border-1 rounded-lg shadow-md p-4 m-1 flex flex-col  gap-4"
      {...props}
    >
      {children}
    </div>
  );
};

export default GreyPaper;
