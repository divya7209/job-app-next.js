"use client"
import { useEffect, useState } from 'react';
import CustomFetch from '@/app/core/CustomFetch';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { IJob } from '@/app/constants/types';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import { useSession } from 'next-auth/react';
import Loading from '@/app/loading';

const AppliedJobs = () => {
    const [appliedJobs, setAppliedJobs] = useState<IJob[]>([]);
    console.log('appliedJobs', appliedJobs)
    // const router = useRouter();
    const { data: session, status } = useSession();

    useEffect(() => {
        const fetchAppliedJobs = async () => {
            try {
                const response = await CustomFetch(`/apply/${(session?.user as { id: string })?.id}`);
                console.log('response', response)
                setAppliedJobs(response.data);
            } catch (error) {
                console.error('Error fetching applied jobs:', error);
            }
        };
        fetchAppliedJobs();
    }, []);
    // loading before page load
    if (status === 'loading') return <Loading />

    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Applied Jobs</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {appliedJobs?.map((job) => (
                        <div key={(job?.jobId as unknown as { _id: string })?._id as string} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-l font-bold mb-1">Job Title: {(job?.jobId as unknown as { skills: string })?.skills}</h2>
                            <p className="text-gray-700 mb-2"><strong>Salary:</strong> {(job?.jobId as unknown as { skills: string })?.skills}</p>

                            <p className="text-blue-700 mb-1"><strong>Company name:</strong><strong> {(job?.jobId as unknown as { companyName: string })?.companyName}</strong></p>
                            <p className="text-gray-700 text-sm mb-1"><strong>Description:</strong> {(job?.jobId as unknown as { description: string }).description}</p>
                            <div className="flex mb-2">
                                <LocationOnIcon />
                                <p className="text-gray-700 mb-2"> {(job?.jobId as unknown as { location: string })?.location}</p>
                                <BusinessCenterTwoToneIcon className='ml-10' />
                                <p className="text-gray-700 mb-1"> {(job?.jobId as unknown as { experience: string })?.experience} yrs</p>
                            </div>
                            <p className="text-gray-700 mb-2"><strong>Salary:</strong> ₹{(job?.jobId as unknown as { salary: string })?.salary}</p>
                            <div className='flex flex-row justify-between items-center'>
                                {/* <p className="text-gray-700 text-sm mb-1">{new Date(job?.jobId?.updatedAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                })}</p> */}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AppliedJobs;