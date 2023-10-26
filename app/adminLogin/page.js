"use client";
import React, { useState } from "react";
import axios from "axios"; // Import Axios
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  faEye,
  faEyeSlash,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Request Data:", { username: email, password });

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username: email, // Assuming you use email as the username
          password: password,
        }
      );

      // Handle successful login here, e.g., store the token in localStorage or state.
      console.log("Authentication successful", response.data);
      const token = response.data.token;

      localStorage.setItem("authToken", token);
      localStorage.setItem("username", email); // Save the username

      router.push("/compList");
    } catch (error) {
      // Handle login error here, e.g., display an error message.
      console.error("Authentication failed", error);
    }
  };

  const backgroundImageUrl =
    "https://img.freepik.com/free-vector/simple-blue-blank-background-vector-business_53876-175738.jpg?w=1060&t=st=1697710227~exp=1697710827~hmac=2ab6a050d4771018bf7db10f8ffd2245b223c5a37195b37716e080c4a5f0cf5c";

  return (
    <>
      <section className=" bg-gray-50 dark:bg-gray-900">
        <div
          className="flex flex-col bg-no-repeat bg-cover items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
          style={{ backgroundImage: `url(${backgroundImageUrl})` }}
        >
          <div className=" w-full bg-white rounded-lg shadow dark:border md:mt-10 md:ml-12 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-1 md:space-y-6 sm:p-8">
              <div className="text-center">
                <Image
                  src="/images/logo-1.png"
                  alt="login"
                  width={70} // Set your desired width
                  height={10} // Set your desired height
                  className="mx-auto max-w-40 h-13"
                />
              </div>
              <h1 className="text-xl text-center font-bold leading-tight tracking-tight text-gray-900 md:text-3xl dark:text-white">
                Super Admin Login
              </h1>

              <form
                className="space-y-4 md:space-y-2"
                action="#"
                onSubmit={handleSubmit}
              >
                <div className="mb-0 mt-0">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>

                  {/* <input
                    type="email"
                    value={email} // Make sure to set the value attribute
                    onChange={(e) => setEmail(e.target.value)}
                    id="email-address"
                    name="username"
                    autoComplete="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Enter your email"
                    required
                  />  */}
                  <div className="relative">
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleEmailChange}
                      placeholder="Enter Your Email"
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring  focus:ring-indigo-400"
                    />
                    <span className="absolute right-3 top-2 transform -translate-y-0">
                      <FontAwesomeIcon
                        icon={faEnvelope}
                        className="text-gray-500"
                      />{" "}
                      {/* Email icon */}
                    </span>
                  </div>
                </div>
                <div className="mb-10">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="******"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                      className="w-full px-4 py-2 border rounded-md focus:ring focus:ring-indigo-400"
                    />
                    <span
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash} // Use the imported icons
                        className="text-gray-500"
                      />
                    </span>
                  </div>
                  {/* <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    autoComplete="current-password"
                    required
                    value={password} // Make sure to set the value attribute
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-indigo-400 dark:focus:border-blue-500"
                  /> */}
                </div>
                <div className="flex items-center justify-end">
                  <Link
                    href="/forgotPassword"
                    className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forgot password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-800 text-white font-medium w-full py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Login
                </button>
              </form>
               
            </div>
          </div>
          <footer className="text-center text-black-500 text-sm-mb-10 mt-10  ">
                &copy;AB Software Solution. All rights reserved.
           </footer> 
        </div>
           
      </section>
      

      {/* <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${backgroundImageUrl})` }}>
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-800">SuperAdmin Login</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <input type="hidden" name="role" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="email-address" className="sr-only">
                                    Email address
                                </label>
                                <input
                                    id="email-address"
                                    name="username"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Email address"
                                    value={email} // Make sure to set the value attribute
                                    onChange={(e) => setEmail(e.target.value)} // Update the email state
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Password"
                                    value={password} // Make sure to set the value attribute
                                    onChange={(e) => setPassword(e.target.value)} // Update the password state
                                />
                            </div>
                        </div>

                        <div className="flex items-center justify-end">
                            <div className="text-sm">
                                <Link href="/forgotPassword" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className='bg-gray-600 hover:bg-gray-800 text-white font-medium w-full py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div> */}
    </>
  );
};

export default LoginForm;
