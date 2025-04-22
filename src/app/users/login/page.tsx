'use client';
import React, { useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Link from 'next/link';
import { signIn, SignInOptions, useSession } from 'next-auth/react';
import Image from 'next/image';

/**
 * login form with validation schema
 */
interface ILoginFormInput {
  email: string;
  password: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('enter your email Id'),
  password: Yup.string().required('enter your valid password'),
});

const LoginForm: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const initialValues: ILoginFormInput = {
    email: '',
    password: '',
  };

  useEffect(() => {
    if (session) {
      router.replace('/users/jobs');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  const onSubmit = async (values: ILoginFormInput) => {
    try {
      signIn("credentials", values as unknown as SignInOptions);
    } catch {
      toast.error('Login failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col gap-10 md:flex-row w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <div className="hidden md:block md:w-1/2">
          <Image
            src="/assests/naukariLogin.jpg"
            alt="Login Image"
            layout="responsive"
            width={500}
            height={500}
            className="rounded-lg"
          />
        </div>
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl font-bold text-center mb-6">Login for Naukri</h2>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            <Form>
              <div className="mb-4">
                <label htmlFor="email" className="text-gray-700 flex justify-center items-center ">Email<span className="text-red-500">*</span></label>
                <Field name="email" type="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="text-gray-700 flex justify-center items-center ">Password<span className="text-red-500">*</span></label>
                <Field name="password" type="password" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" />
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>
              <button type="submit" className="w-full bg-sky-500 text-white py-2 px-4 rounded-md hover:bg-sky-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Login</button>
              <p className='pt-2.5'>
                Don&apos;t have an account? Click here to{" "}
                <Link href="/users/register" className="text-blue-500">
                  Register
                </Link>
              </p>
            </Form>
          </Formik>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;