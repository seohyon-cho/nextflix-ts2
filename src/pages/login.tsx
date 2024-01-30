import Head from 'next/head';
import { FunctionComponent } from 'react';
import Image from 'next/image';

const Login: FunctionComponent = () => {
	return (
		<main>
			<Head>
				<title>NextFlix | Login</title>
				<link rel='icon' href='/public/favicon.ico' />
			</Head>

			<Image src='https://rb.gy/p2hphi' alt='login Page' fill priority className='w-full h-screen z-[10] opacity-50 object-cover' />
		</main>
	);
};

export default Login;
