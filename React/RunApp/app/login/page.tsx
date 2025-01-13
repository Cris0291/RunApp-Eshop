import Link from "next/link";
import LoginFrom from "../features/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-purple-500 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          className="absolute left-[calc(50%-4rem)] top-10 h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%-18rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="rgba(255, 255, 255, 0.1)"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
        </svg>
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl relative z-10">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
          <p className="text-gray-600">
            Enter your credentials to access your account
          </p>
        </div>
        <LoginFrom/>
        <div className="text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link className="text-indigo-600 hover:underline" href="/register">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

