"use client";

import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faSignOutAlt,
  faBars,
  faTableCellsLarge,
  faBuilding,
  faAngleDown,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SuperNavbar = () => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isEmployeeOpen, setEmployeeOpen] = useState(false);
  const [isAdminOpen, setAdminOpen] = useState(false);

  const router = useRouter();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("username");
    localStorage.removeItem("empUsername");
    localStorage.removeItem("subUsername");
    router.push("/login");
  };

  useEffect(() => {
    const closeDropdown = (event) => {
      if (isDropdownOpen) {
        if (
          event.target.closest(".dropdown") === null &&
          event.target.closest(".dropdown-toggle") === null
        ) {
          setDropdownOpen(false);
        }
      }
    };

    if (typeof window !== "undefined") {
      document.addEventListener("click", closeDropdown);
    }

    return () => {
      if (typeof window !== "undefined") {
        document.removeEventListener("click", closeDropdown);
      }
    };
  }, [isDropdownOpen]);

  const handleProfilePictureUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("profilePicture", file);
      const response = await axios.post(
        "http://localhost:5000/api/task/upload-profile-picture",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setProfilePictureURL(response.data.profilePictureURL);
      setDropdownOpen(false);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleProfilePictureClick = (e) => {
    e.preventDefault();
    const fileInput = document.getElementById("profilePictureUpload");
    fileInput.click();
  };

  const handleProfilePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleProfilePictureUpload(file);
    }
  };
  const toggleSidebar = () => {
    // Function to toggle the sidebar
    setSidebarOpen(!isSidebarOpen);
  };
  const toggleAdmin = () => {
    setAdminOpen(!isAdminOpen);
  };

  const toggleEmployee = () => {
    setEmployeeOpen(!isEmployeeOpen);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-gradient-to-r from-red-500 to-yellow-500 text-gray-600 body-font z-50">
      
        <div className="container mx-auto flex flex-nowrap p-4  items-center justify-between">
        <button className="md:hidden  mt-4 pr-10" onClick={toggleSidebar}>
          {" "}
          {/* Hamburger icon for mobile */}
          <FontAwesomeIcon
            icon={faBars}
            className="text-white text-xl cursor-pointer"
          />
        </button>
      
      
          <div className="relative title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
            <span className="ml-3 text-xl text-white pr-24 pl-10 pt-80">SuperAdmin</span>
          </div>
        
        
          <div className="relative inline-block text-left dropdown">
            <button
              onClick={toggleDropdown}
              className="dropdown-toggle text-white flex items-center focus:outline-none"
            >
              {profilePictureURL ? (
                <Image
                  src={profilePictureURL}
                  alt="Profile"
                  width={32} // Set your desired width
                  height={32} // Set your desired height
                  className="rounded-full cursor-pointer"
                  onClick={handleProfilePictureClick}
                />
              ) : (
                <Image
                  src="/images/man.png"
                  alt="User"
                  width={32} // Set your desired width
                  height={32} // Set your desired height
                  className="rounded-full cursor-pointer"
                  onClick={handleProfilePictureClick}
                />
              )}

              <span className="ml-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4 inline-block"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </span>
            </button>
            {isDropdownOpen && (
              <div className="origin-top-right absolute right-0 mt-3 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <Link
                    href="#"
                    onClick={handleProfilePictureClick}
                    className="px-4 py-1 text-sm text-gray-700 hover:bg-gray-300 hover:text-gray-900 flex items-center font-light"
                  >
                    <FontAwesomeIcon icon={faUser} className="mr-2" />
                    User Profile Picture
                  </Link>
                  <button
                    onClick={logout}
                    className="px-4 py-1 w-full text-left text-sm text-gray-700 hover:bg-gray-300  hover:text-gray-900 flex items-center font-medium"
                    role="menuitem"
                  >
                    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
          <input
            type="file"
            id="profilePictureUpload"
            accept="image/*"
            style={{ display: "none" }}
            onChange={handleProfilePictureChange}
          />
        </div>
        {isSidebarOpen && (
          <div className="fixed top-0 left-0 h-screen w-64 bg-gray-200 text-black p-4 mt-32">
            {/* Add your sidebar content here */}
            <>
              <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-900 border border-gray-200">
                <ul className="space-y-2 font-medium">
                  <li>
                    <Link
                      href="/compList"
                      className="flex items-center p-2 text-gray-950 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                    >
                      {/* Dashboard */}
                      {/* <img src='/images/dashboard.png' alt='list' /> */}
                      <FontAwesomeIcon
                        icon={faTableCellsLarge}
                        size="xl"
                        style={{ color: "#3ca8be", marginLeft: "5px" }}
                        onClick={() => handleDeleteClick(company._id)}
                      />

                      {/* <Image src='/images/dashboard.png' alt='img' width={25} height={25} style={{ margin: "3px" }} /> */}

                      <span className="ml-3">Dashboard</span>
                    </Link>
                  </li>

                  <li>
                    <button
                      onClick={toggleAdmin}
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                    >
                      {/* <img src='/images/add.png' alt='list' /> */}
                      {/* <Image src='/images/add.png' alt='img' width={25} height={25} style={{ margin: "3px" }} /> */}
                      <FontAwesomeIcon
                        icon={faBuilding}
                        size="xl"
                        style={{ color: "red", marginLeft: "8px" }}
                      />
                      <span className="ml-3 pl-1">Company</span>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`w-5 h-5 ml-auto ${
                          isAdminOpen ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </button>

                    {isAdminOpen && (
                      <ul className="ml-6 space-y-2 font-medium">
                        <li>
                          <Link
                            href="/compList"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                          >
                            {/* <img src='/images/list_main.png' alt='list' className='mx-3' /> */}
                            {/* <Image src='/images/list_main.png' alt='img' width={25} height={25} style={{ margin: "3px" }} /> */}
                            <FontAwesomeIcon
                              icon={faListUl}
                              size="xl"
                              style={{ color: "red", marginLeft: "5px" }}
                            />
                            <span className="ml-3">Companies List</span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/company"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                          >
                            {/* <img src='/images/add.png' alt='list' className='mx-3' /> */}
                            {/* <Image src='/images/add.png' alt='img' width={25} height={25} style={{ margin: "3px" }} /> */}
                            <FontAwesomeIcon
                              icon={faSquarePlus}
                              size="xl"
                              style={{ color: "red", marginLeft: "5px" }}
                            />
                            <span className="ml-3 pl-1">Add Company</span>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>

                  <li>
                    <button
                      onClick={toggleEmployee}
                      className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                    >
                      {/* <img src='/images/user.png' alt='list' /> */}
                      {/* <Image src='/images/user.png' alt='img' width={25} height={25} style={{ margin: "3px" }} /> */}
                      <FontAwesomeIcon
                        icon={faUser}
                        size="xl"
                        style={{ color: "#3ca8be", marginLeft: "5px" }}
                        onClick={() => handleDeleteClick(company._id)}
                      />

                      <span className="ml-3 pl-2">Admin</span>
                      <FontAwesomeIcon
                        icon={faAngleDown}
                        className={`w-5 h-5 ml-auto ${
                          isEmployeeOpen ? "rotate-0" : "rotate-180"
                        }`}
                      />
                    </button>
                    {isEmployeeOpen && (
                      <ul className="ml-6 space-y-2 font-medium">
                        <li>
                          <Link
                            href="/empList"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 group"
                          >
                            {/* <img src='/images/list_main.png' alt='list' className='mx-3' /> */}
                            {/* <Image src='/images/list_main.png' alt='img' width={25} height={25} style={{ margin: "3px" }} /> */}
                            <FontAwesomeIcon
                              icon={faClipboardList}
                              size="xl"
                              style={{ color: "blue", marginLeft: "12px" }}
                              onClick={() => handleDeleteClick(company._id)}
                            />
                            <span className="pl-3 ml-1">Admin List </span>
                          </Link>
                        </li>
                        <li>
                          <Link
                            href="/employee"
                            className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-200 dark:hover-bg-gray-700 group"
                          >
                            {/* <img src='/images/addEmp.png' alt='list' className='mx-3' /> */}
                            {/* <Image src='/images/addEmp.png' alt='img' width={25} height={25} style={{ margin: "3px" }} /> */}

                            <FontAwesomeIcon
                              icon={faUserPlus}
                              size="xl"
                              style={{ color: "blue", marginLeft: "8px" }}
                              onClick={() => handleDeleteClick(company._id)}
                            />
                            <span className="pl-1 ml-1"> Add Admin</span>
                          </Link>
                        </li>
                      </ul>
                    )}
                  </li>
                </ul>
              </div>
            </>
          </div>
        )}
        
      </nav>
    </> 
  );
};

export default SuperNavbar;
