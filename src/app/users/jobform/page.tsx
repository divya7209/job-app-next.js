'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomFetch from '@/app/core/CustomFetch';
import { useSession } from 'next-auth/react';
import Header from '@/components/Header';
/**
 * form for create new job post by Employer
 * based on skills
 */
const JobForm = () => {
    const router = useRouter();
    const { data: session } = useSession()
    console.log('session', session)
    const initialValues = {
        title: '',
        companyName: '',
        description: '',
        location: '',
        experience: '',
        salary: '',
        employerId: (session?.user as { id: string })?.id || '',
        skills: ''
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Title is required'),
        companyName: Yup.string().required('Company Name is required'),
        description: Yup.string().required('Description is required'),
        location: Yup.string().required('Location is required'),
        experience: Yup.number().required('Experience is required').positive('Experience must be positive').integer('Experience must be an integer'),
        salary: Yup.string().required('Salary is required'),
        employerId: Yup.string().required('Employer ID is required'),
        skills: Yup.string().required('Employer ID is required'),
    });

    const onSubmit = async (values: any) => {
        try {
            const response = await CustomFetch('/addjobs', 'POST', values);
            console.log('response', response)
            toast.success('Job created successfully!');
            router.push('/users/jobs');
        } catch {
            toast.error('Failed to create job. Please try again.');
        }
    };
    return (
        <>
            <Header />
            <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-10">
                <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-center">Create New Job</h2>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        <Form>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="title" className="block text-gray-700">Title<span className="text-red-500">*</span></label>
                                    <Field name="title" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="companyName" className="block text-gray-700">Company Name<span className="text-red-500">*</span></label>
                                    <Field name="companyName" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <ErrorMessage name="companyName" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="skills" className="block text-gray-700">Skills<span className="text-red-500">*</span></label>
                                <Field name="skills" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <ErrorMessage name="skills" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="description" className="block text-gray-700">Description<span className="text-red-500">*</span></label>
                                <Field name="description" as="textarea" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div>
                                    <label htmlFor="location" className="block text-gray-700">Location<span className="text-red-500">*</span></label>
                                    <Field name="location" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                                <div>
                                    <label htmlFor="experience" className="block text-gray-700">Experience (years)<span className="text-red-500">*</span></label>
                                    <Field name="experience" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                    <ErrorMessage name="experience" component="div" className="text-red-500 text-sm mt-1" />
                                </div>
                            </div>
                            <div className="mb-4">
                                <label htmlFor="salary" className="block text-gray-700">Salary<span className="text-red-500">*</span></label>
                                <Field name="salary" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <ErrorMessage name="salary" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="employerId" className="block text-gray-700">Employer ID<span className="text-red-500">*</span></label>
                                <Field as="select" name="employerId" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" disabled>
                                    <option value={(session?.user as { id: string })?.id}>{(session?.user as { name: string })?.name}</option>
                                </Field>
                                <ErrorMessage name="employerId" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <button type="submit" className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                                Submit
                            </button>
                        </Form>
                    </Formik>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
};

export default JobForm;