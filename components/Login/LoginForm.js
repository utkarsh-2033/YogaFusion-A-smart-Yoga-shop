import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import jwt from "jsonwebtoken";

const LoginForm = ({ type }) => {
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [error,setError]=useState('');

    const router=useRouter();
  const isLogin = type === "login";

  const submitHandler=async(e)=>{
    e.preventDefault();
    const url=isLogin? '/api/auth/login':'/api/auth/signup';
    const body=isLogin? {email,password}:{name,email,password};

    try{
        const res=await fetch(url,{
          method:'POST',
          headers: { 'Content-Type': 'application/json' },
          body :JSON.stringify(body)
        })
        const data=await res.json();
        console.log('api',data)
        if(!data.success){
          setError(data.message);
        }
        else if(data.success && isLogin){
          localStorage.setItem('token',data.token);
          const decodedtoken=jwt.decode(data.token);
          localStorage.setItem('isAdmin',decodedtoken.isAdmin)
          router.push('/');
        }
        else if(data.success && !isLogin){
          router.push('/login');
        }
    }catch(error){
      console.log(error)
      setError("Something went wrong!")
    }
  }

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      {error && <p className="font-bold text-red-800 text-center">{error}</p>}
      <form onSubmit={submitHandler}>
        {!isLogin && (
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e)=>setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition duration-200"
        >
          {isLogin ? "Login" : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-gray-600 mt-4">
        {isLogin ? (
          <>
            Don&apost have an account?{" "}
            <Link href="/signup" className="text-blue-500">
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500">
              Login
            </Link>
          </>
        )}
      </p>
    </div>
  );
};

export default LoginForm;
