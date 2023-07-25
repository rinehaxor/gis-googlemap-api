import React, { useState } from 'react';

import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../api/firebase';
import { useRouter } from 'next/router';
function Login() {
   const router = useRouter(); // gunakan useRouter
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');
   const onSubmit = async (event) => {
      event.preventDefault(); // prevent page refresh

      try {
         const userCredential = await signInWithEmailAndPassword(auth, email, password);
         const user = userCredential.user;
         console.log('Pengguna berhasil masuk:', user);

         router.push('/add-category'); // gunakan router.push
      } catch (error) {
         console.error('Terjadi kesalahan saat masuk:', error);
      }
   };

   return (
      <>
         {/* <Nav /> */}
         <div className="flex bg-gradient-to-r from-purple-400 to-blue-300 ">
            <div className="flex-auto w-full md:w-1/2">
               <div className="relative flex flex-col items-center justify-center h-screen">
                  <div className="container mx-auto px-4 ">
                     <div className="w-1/2  md:w-2/3 lg:w-1/3 mx-auto px-5 m-5 bg-white" style={{ height: 330, borderRadius: 10 }}>
                        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
                           <div className="mx-auto">
                              <div className="mb-2 block pt-10 ">
                                 <label htmlFor="email1" className="font-bold ">
                                    Email
                                 </label>
                              </div>
                              <input className="  bg-blue-200 h-8 w-60  rounded-lg" type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
                           </div>
                           <div className="mx-auto">
                              <div className="mb-2 block">
                                 <label htmlFor="password" className="font-bold">
                                    Password
                                 </label>
                              </div>
                              <input type="password" className="bg-blue-200 h-8 w-60 rounded-lg" value={password} onChange={(event) => setPassword(event.target.value)} />
                           </div>
                           <button type="submit" className="bg-blue-600 w-60 h-8 rounded-lg text-white mt-5 mx-auto">
                              Masuk
                           </button>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
}

export default Login;
