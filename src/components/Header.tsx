"use client";
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import Image from 'next/image'; // Import Image component

/**
 * logout handler
 * header for link login, dashboards, logout
 */
const Header = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const handleLogout = () => {
        signOut(); // delete session
        router.push('/users/login');
    };

    return (
        <header className="bg-sky-600 p-5 shadow-md fixed top-0 left-0 w-full">
            <nav className="flex flex-col md:flex-row justify-between items-center">
                <div className="flex items-center space-x-4 mb-4 md:mb-0">
                    <Image src="/assests/logo.png" alt="Naukari Logo" width={130} height={130} />
                    <p className="text-white font-bold text-xl md:text-2xl">{((session?.user as { role: string })?.role)}: {session?.user?.name}</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 pr-5">
                    {(session?.user as { role: string })?.role === 'job-seeker' && (
                        <Link href="/users/applied" className="bg-white text-blue-500 hover:bg-gray-200 transition duration-300 py-1 px-4 rounded-full shadow-md">
                            Applied
                        </Link>
                    )}
                    <button onClick={handleLogout} className="bg-red-500 text-white hover:bg-gray-200 transition duration-300 py-1 px-4 rounded-full shadow-md">
                        Logout
                    </button>
                    {(session?.user as { role: string })?.role === 'employer' && (
                        <Link href="/users/jobform" className="bg-green-500 text-white font-bold hover:bg-green-600 transition duration-300 py-1 px-4 rounded-full shadow-md">
                            Create Jobs
                        </Link>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default Header;