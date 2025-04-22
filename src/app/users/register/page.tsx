'use client';
import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomFetch from '@/app/core/CustomFetch';
import Link from 'next/link';
/**
 * user and admin register page
 * with form validation formik yup
 */

interface IFormInput {
    name: string;
    email: string;
    password: string;
    mobile: number;
    role: string;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Enter your name'),
    email: Yup.string().email('Invalid email address').required('Enter your email'),
    password: Yup.string().required('Enter password'),
    mobile: Yup.number().required('Enter 10 digit mobile number'),
    role: Yup.string().required('Select a role'), // Add role validation
});

const RegisterForm: React.FC = () => {
    const router = useRouter();

    const initialValues: IFormInput = {
        name: '',
        email: '',
        password: '',
        mobile: 0,
        role: '',
    };

    const onSubmit = async (values: IFormInput) => {
        try {
            const response = await CustomFetch('/register', 'POST', values);
            console.log('response', response)
            toast.success('Successfully registered!');
            router.push('/users/login');
        } catch {
            toast.error('Registration failed. Please try again.');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Register For Naukari</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    <Form>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="name" className="block text-gray-700">Name<span className="text-red-500">*</span></label>
                                <Field name="name" type="text" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-gray-700">Email<span className="text-red-500">*</span></label>
                                <Field name="email" type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <label htmlFor="password" className="block text-gray-700">Password<span className="text-red-500">*</span></label>
                                <Field name="password" type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                            <div>
                                <label htmlFor="mobile" className="block text-gray-700">Mobile<span className="text-red-500">*</span></label>
                                <Field name="mobile" type="number" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                                <ErrorMessage name="mobile" component="div" className="text-red-500 text-sm mt-1" />
                            </div>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="role" className="block text-gray-700">Role<span className="text-red-500">*</span></label>
                            <div className="mt-1 flex space-x-4">
                                <label className="inline-flex items-center">
                                    <Field type="radio" name="role" value="admin" className="form-radio" />
                                    <span className="ml-2">Admin</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <Field type="radio" name="role" value="employer" className="form-radio" />
                                    <span className="ml-2">Employer</span>
                                </label>
                                <label className="inline-flex items-center">
                                    <Field type="radio" name="role" value="job-seeker" className="form-radio" />
                                    <span className="ml-2">Job Seeker</span>
                                </label>
                            </div>
                            <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
                        </div>
                        <button type="submit" className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:bg-sky-600 focus:ring-offset-2">Register</button>
                        <p className='pt-2.5'>
                            Do you have an account? Click here to{" "}
                            <Link href="/users/login" className="text-blue-600">
                                Login
                            </Link>
                        </p>
                    </Form>
                </Formik>
                <ToastContainer />
            </div>
        </div>
    );
};

export default RegisterForm;