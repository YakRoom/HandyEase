import Header from "../AuthHeader";

const GreyPaper = ({ children, ...props }) => {
  return (
    <div
      className="border-1 rounded-3xl bg-gray-50 shadow-md p-4 m-1 flex flex-col  gap-4 min-h-[calc(100vh-8px)]"
      {...props}
    >
      <Header />
      {children}
    </div>
  );
};

export default GreyPaper;
