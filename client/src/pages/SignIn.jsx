import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { extractErrorMessage } from '../../../api/utils/error';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice'


{/*
*my- is to add space on the top and bottom
*p- is the padding
*max-w-lg ensure that in bigger screen it is not bigger than large (the widgth of the division)
*mx-auto to put all in the center
mt- margin at the top
*
*/}

export default function SignIn() {

    {/*
    *variable to store the inputs value and the function that can modify it
    */}
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

  const { loading, error} = useSelector((state) => state.user);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();


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

    dispatch(signInStart());
    setSuccess(null);

    try {
      const res = await fetch('http://localhost:3000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
        dispatch(signInFailure(data.message));
        return;
      }

      dispatch(signInSuccess(data))
      setSuccess(data);

      //If everything is alright navigate to the Sign(in page
      navigate('/');

    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  };

  console.log(formData);

  return (
    <div className="p-3 max-w-lg mx-auto">
      <div className="flex flex-col my-8">
        <h1 className="text-4xl text-center font-bold my-3">Sign In</h1>
        <h1 className="text-sm text-center">
          Please enter your details to login to your account!
        </h1>
      </div>

      {error && <div className="text-red-600 text-center">{extractErrorMessage(error)}</div>}
      {success && <div className="text-green-600 text-center">{success}</div>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
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

        <button
          disabled={loading}
          className="bg-slate-800 text-white p-3 rounded-lg uppercase hover:opacity-90 disabled:opacity-65"
          type="submit"
        >
          {loading ? 'Loading...' : 'Sign In'}
          
        </button>
      </form>

      <div className="flex gap-2 mt-3 font-bold">
        <p> No account yet?</p>
        <Link to="/sign-up">
          <span className="text-blue-700"> Sign up here.</span>
        </Link>
      </div>
    </div>
  );
}
