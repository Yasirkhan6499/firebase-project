import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup,signOut } from "firebase/auth";
import { useState } from 'react';



export const Auth = () =>{

    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    console.log(auth?.currentUser?.email) //check the current user
    // sign in
    const signIn = async ()=>{
        try{
        await createUserWithEmailAndPassword(auth,email,password);
        }
        catch(err){
            console.log(err);
        }
    };

    // sign in with google 
    const signInWithGoogle = async ()=>{
        try{
        await signInWithPopup(auth,googleProvider);
        }
        catch(err){
            console.log(err);
        }
    };

    // singing out
    const signOutFunc = async ()=>{
        try{
        await signOut(auth);
        }
        catch(err){
            console.log(err);
        }
    };

    return(
        <div>
            <img src={auth?.currentUser?.photoURL} /> {/* profile image */}
            
             <input placeholder="Email..."
             onChange={(e)=>setEmail(e.target.value)}
             />{ /* username */}
            <input
            type="password"
            placeholder="password..."
            onChange={(e)=>setPassword(e.target.value)}
           /> {/* password*/}
            <button onClick={signIn}>Sign in</button>

            {/* sing in with google button */}
            <button onClick={signInWithGoogle}>Sign in with google</button>

            {/* singing out button */}
            <button onClick={signOutFunc}>SignOut</button>
        </div>
    );
}
