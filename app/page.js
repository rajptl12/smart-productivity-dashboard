"use client";

import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center 
  bg-gradient-to-br from-[#5693cf] via-[#eef2f7] to-[#9db5d6] px-4">
      
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        
        {/* LOGO */}
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full 
            bg-slate-800 flex items-center justify-center 
            text-white font-semibold tracking-wide">
            SD
          </div>

          <h1 className="text-2xl font-semibold text-gray-800">
            Smart Dashboard
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Secure access to your workspace

          </p>
        </div>

        {/* EMAIL */}
        <div className="mb-4">
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            defaultValue="admin@gmail.com"
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 
              rounded-lg bg-gray-50 
              focus:ring-2 focus:ring-slate-400 
              focus:border-transparent outline-none"
          />
        </div>

        {/* PASSWORD */}
        <div className="mb-6">
          <label className="text-sm text-gray-600">Password</label>
          <input
            type="password"
            defaultValue="password"
            className="mt-1 w-full px-4 py-2.5 border border-gray-300 
              rounded-lg bg-gray-50 
              focus:ring-2 focus:ring-slate-400 
              focus:border-transparent outline-none"
          />
        </div>

        {/* BUTTON */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full bg-slate-800 text-white py-2.5 
            rounded-lg font-medium 
            hover:bg-slate-900 transition-all"
        >
          Login to Dashboard
        </button>

        {/* FOOTER */}
        <p className="text-xs text-center text-gray-400 mt-6">
          This is a preview environment

        </p>
      </div>
    </div>
  );
}
