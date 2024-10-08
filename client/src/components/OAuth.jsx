import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom';
 

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleGoogleAuthentification = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app);

            const result = await signInWithPopup(auth, provider);

             const res = await fetch('http://localhost:3000/api/auth/google', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                  name: result.user.displayName,
                  email: result.user.email,
                  photo: result.user.photoURL,
                }),
            });

            const data = await res.json();
            dispatch(signInSuccess(data));
            console.log('here here here');
            navigate('/');

            console.log(result);
        } catch (error) {
            console.log('Could not sign in with google', error);
        }
    }

  return (
    <button onClick={handleGoogleAuthentification} type='button' className='bg-red-600 text-white p-2 rounded-lg uppercase hover:opacity-90'>
        Continue with Google
    </button>
  )
};
