"use client";
import { IJob } from '@/app/constants/types';
import CustomFetch from '@/app/core/CustomFetch';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useEffect, useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessCenterTwoToneIcon from '@mui/icons-material/BusinessCenterTwoTone';
import { useSession } from 'next-auth/react';
import { toast, ToastContainer } from 'react-toastify';
import { useRouter } from 'next/navigation';
import Loading from '@/app/loading';

const Jobs = () => {
    const [jobs, setJobs] = useState<IJob[]>([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    useEffect(() => {
        const fetchJobs = async () => {
            setLoading(true)
            try {
                const response = await CustomFetch('/jobs');
                console.log('response', response);
                setJobs(response.data);
                setLoading(false)
            } catch (error) {
                console.error('Error fetching jobs:', error);
                setLoading(false)

            }
        };
        fetchJobs();
    }, []);

    const filteredJob = jobs.filter((job) => {
        const filterLocation = job?.location?.toLowerCase().includes(search.toLowerCase());
        const filterSkills = job?.skills?.toLowerCase().includes(search.toLowerCase());
        const filterTitle = job?.title?.toLowerCase().includes(search.toLowerCase());
        return filterLocation || filterSkills || filterTitle;
    });

    const applyForJob = async (jobId: string) => {
        try {
            const response = await CustomFetch('/apply', 'POST', {
                jobId,
                jobSeekerId: (session?.user as { id: string })?.id,
            });
            if (response.success) {
                toast.success('Successfully applied for the job!');
                router.push('/users/applied');
            } else {
                toast.error('Failed to apply for the job. Please try again.');
            }
        } catch (error) {
            toast.error('Error applying for the job. Please try again.');
            console.error('Error applying for job:', error);
        }
    };
    // delete jobs
    const deleteJob = async (jobId: string) => {
        try {
            const response = await CustomFetch(`/delete/${jobId}`, 'DELETE');
            console.log(response)
            if (response.message === 'Quiz deleted successfully') {
                toast.success('Job deleted successfully!');
                setJobs(jobs.filter(job => job._id as unknown !== jobId));
            } else {
                toast.error('Failed to delete the job. Please try again.');
            }
        } catch (error) {
            toast.error('Error deleting the job. Please try again.');
            console.error('Error deleting job:', error);
        }
    };
    return (
        <>
            <Header />
            <div className="container mx-auto p-4">
                <h1 className="text-3xl font-bold mb-6 text-center">Job Listings</h1>
                <div className="mb-4 mt-11">
                    <input
                        type="text"
                        placeholder="Search by Location, Skills and Title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                </div>
                {loading ? <Loading /> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {filteredJob?.map((job) => (
                        <div key={job?._id as string} className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold mb-1">Job Title: {job.title}</h2>
                            <p className="text-blue-700 mb-1"><strong>Company name:</strong> {job.companyName}</p>
                            <p className="text-gray-700 mb-2"><strong>Skills:</strong> {job.skills}</p>
                            <p className="text-gray-700 text-sm mb-1"><strong>Description:</strong> {job.description}</p>
                            <div className="flex mb-2 items-center">
                                <LocationOnIcon />
                                <p className="text-gray-700 ml-2">{job.location}</p>
                                <BusinessCenterTwoToneIcon className="ml-10" />
                                <p className="text-gray-700 ml-2">{job.experience} yrs</p>
                            </div>
                            <p className="text-gray-700 mb-2"><strong>Salary:</strong> ₹{job.salary}</p>
                            <div className="flex flex-row justify-between items-center">
                                <p className="text-gray-700 text-sm mb-1">{new Date(job.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric',
                                })}</p>
                                {(session?.user as { role: string })?.role === 'job-seeker' && (
                                    <button onClick={() => applyForJob(job._id as string)} className="bg-sky-500 text-white py-2 px-4 rounded-full hover:bg-sky-600 transition duration-300">Apply</button>
                                )}
                                {(session?.user as { role: string })?.role === 'employer' && (
                                    <button onClick={() => deleteJob(job._id as unknown as string)} className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300">Delete</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>}
            </div>
            <Footer />
            <ToastContainer />
        </>
    );
};

export default Jobs;