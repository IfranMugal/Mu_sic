"use client"
import { signIn, signOut, useSession } from "next-auth/react";

export function Appbar(){
    const session = useSession();
    return (<>
        <div className="flex justify-between px-5 py-2 m-2 bg-blue-300">
            <div className="font-extrabold text-3xl">Bajaoo</div>
            <div>
                {session.data?.user && <button onClick={()=> signOut()} className="p-2 bg-blue-500 border rounded-3xl border-b-indigo-700">Signout</button>}
                {!session.data?.user && <button onClick={()=> signIn()} className="p-2 bg-blue-500 border rounded-3xl border-b-indigo-700">Signin</button>} 
            </div>
        </div>
    </>)
}