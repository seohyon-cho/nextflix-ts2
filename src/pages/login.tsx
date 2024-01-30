import Head from 'next/head';
import { FunctionComponent } from 'react';
import Image from 'next/image';
import { BounceLoader } from 'react-spinners';
import { useState } from 'react';

const Login: FunctionComponent = () => {
	const [IsLoading, setIsLoading] = useState(true);
	return (
		<main>
			<Head>
				<title>NextFlix | Login</title>
				<link rel='icon' href='/public/favicon.ico' />
			</Head>

			<div className='flex items-center justify-center w-full h-screen '>
				<Image
					onLoadingComplete={() => setIsLoading(false)}
					src='https://rb.gy/p2hphi'
					alt='login Page'
					fill
					priority
					className='object-cover w-full h-screen opacity-50'
				/>

				<BounceLoader size={100} color='orange' loading={IsLoading} />
			</div>
		</main>
	);
};

export default Login;
// npm install react-spinners --save
