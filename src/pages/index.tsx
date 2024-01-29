import Head from 'next/head';
import type { NextPage } from 'next';
import Header from '@/components/Header';

const Home: NextPage = () => {
	return (
		// w-screen : 100vw, h-screen : 100vh , w-full : 100% , h-full : 100%
		<div className='relative w-full'>
			<Head>
				<title>NETFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			<main className='relative'>
				<h1 className=''>Main Page</h1>
			</main>
		</div>
	);
};

export default Home;
