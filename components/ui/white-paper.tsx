const WhitePaper = ({ children, ...props }) => {
  return (
    <div
      className="mx-auto bg-white border-1 rounded-lg shadow-md p-4 w-full"
      {...props}
    >
      {children}
    </div>
  );
};

export default WhitePaper;
