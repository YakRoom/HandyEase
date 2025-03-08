"use client";
export default function AuthHeader({
  isLogin,
}: Readonly<{
  isLogin: boolean;
}>) {
  return (
    <div className="flex justify-between mb-4 border-b pb-2 items-center">
      <span>B</span>
      <div>
        <button
          className={`px-4 py-2 font-medium ${
            isLogin ? "border-b-2 border-black" : "text-gray-500"
          }`}
          //   onClick={() => setIsLogin(true)}
        >
          Log In
        </button>
        <button
          className={`px-4 py-2 font-medium ${
            !isLogin ? "border-b-2 border-black" : "text-gray-500"
          }`}
          //   onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
}
