import {signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword} from 'firebase/auth'
import {auth, db, googleProvider} from "../../firebase-config.js";
import {useRef} from "react";
import {toast, ToastContainer} from "react-toastify";
import {setDoc, doc} from 'firebase/firestore'

import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const signInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
            toast('Logged in with Google Account', {theme: 'dark'})
        } catch (error) {
            console.error(error)
        }
    }

    const createUserWithEmail = async (event) => {
        try {
            event.preventDefault()
            const email = emailRef.current.value
            const password = passwordRef.current.value
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)

            await setDoc(doc(db, 'users', userCredential.user.uid), {
                email: userCredential.user.email,
                name: email,
                uid: userCredential.user.uid,
                position: 'Something',
                company: 'Good one'
            })
            toast('Successfully created user', {theme: 'dark'})
        } catch (error ){
            toast('Incorrect credentials', {theme: 'dark'})
            console.error(error)
        }
    }

    const loginWithEmail = async (event) => {
        try {
            event.preventDefault()
            const email = emailRef.current.value
            const password = passwordRef.current.value
            await signInWithEmailAndPassword(auth, email, password)
            toast('Successfully logged in', {theme: 'dark'})
        } catch (error) {
            toast('Incorrect credentials', {theme: 'dark'})
            console.error(error.message)
        }
    }

    return (
        <div className='h-screen bg-black text-white flex justify-center items-center flex-col gap-3.5'>
            <h1 className='font-bold text-lg'>Sign in with Continue</h1>
            <form className='w-full max-w-sm flex flex-col gap-1.5'>
                <input
                    ref={emailRef}
                    type="email"
                    name='email'
                    placeholder='email'
                    className="bg-zinc-900 border border-zinc-700 text-zinc-400 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                />
                <input
                    ref={passwordRef}
                    type="password"
                    name='password'
                    placeholder='password'
                    className="bg-zinc-900 border border-zinc-700 text-zinc-400 text-sm rounded-lg focus:ring-gray-900 focus:border-gray-900 block w-full p-2.5"
                />
                <div className='flex flex-col gap-3.5'>
                    <button type='button' className='mt-5 px-5 py-3 bg-amber-900 rounded-lg' onClick={createUserWithEmail}>Register With Email
                    </button>
                    <button type='submit' className='px-5 py-3 bg-green-900 rounded-lg' onClick={loginWithEmail}>Login With Email
                    </button>
                </div>
            </form>
            <button type='button' className='mt-10 px-5 py-3 bg-blue-900 rounded-lg w-[390px]' onClick={signInWithGoogle}>Sign in With Google
            </button>
            <ToastContainer/>
        </div>
    );
};

export default SignIn;
