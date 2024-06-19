import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { extractErrorMessage } from '../../../api/utils/error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import OAuth from '../components/OAuth.jsx';

{/*
*my- is to add space on the top and bottom
*p- is the padding
*max-w-lg ensure that in bigger screen it is not bigger than large (the widgth of the division)
*mx-auto to put all in the center
mt- margin at the top
*
*/}

export default function SignUp() {

    {/*
    *variable to store the inputs value and the function that can modify it
    */}
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

   {/*
    * Function to handle submiting the form to the database
    * The second part of the fetch is used to change the formData to String before sending it
    * The response is the converted to JSON
    */}
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      // Check if the response is ok
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`HTTP error! status: ${res.status} - ${errorText}`);
      }

       // Try to parse the JSON
      const data = await res.json();

      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }

      setLoading(false);
      setSuccess(data);
      setError(null);

      //If everything is alright navigate to the Sign(in page
      navigate('/sign-in');

    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex flex-col my-8">
        <h1 className="text-4xl text-center font-bold my-3">Sign Up</h1>
        <h1 className="text-sm text-center">
          Please enter your details to create an account!
        </h1>
      </div>

      {error && <div className="text-red-600 text-center">{extractErrorMessage(error)}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        <input
          type="text"
          placeholder="Username*"
          className="border p-3 rounded-lg"
          id="username"
          value={formData.username}
          onChange={handleChange}
        />

        <input
          type="email"
          placeholder="Email*"
          className="border p-3 rounded-lg"
          id="email"
          value={formData.email}
          onChange={handleChange}
        />

        <input
          type="password"
          placeholder="Password*"
          className="border p-3 rounded-lg"
          id="password"
          value={formData.password}
          onChange={handleChange}
        />

        <div className='flex flex-col gap-2'>
          <button
            disabled={loading}
            className="bg-slate-800 text-white p-2 rounded-lg uppercase hover:opacity-90 disabled:opacity-65"
            type="submit"
          >
            {loading ? 'Loading...' : 'Sign Up'}
          </button>

          <OAuth />
        </div>
      </form>

      <div className="flex gap-2 mt-3 font-bold">
        <p> Have an account?</p>

        <Link to="/sign-in">
          <span className="text-blue-700"> Sign in here.</span>
        </Link>

        <div className="relative group pl-52">
          <FontAwesomeIcon icon={faInfoCircle} className="text-gray-500 ml-2 cursor-pointer" />
          
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block w-64 p-2 bg-gray-800 text-white text-sm rounded">
            Password must contain at least 8 characters, including one uppercase letter, one lowercase letter, and one number.
          </div>
        </div>
      </div>
    </div>
  );
}
