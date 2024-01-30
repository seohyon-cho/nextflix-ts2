import { FunctionComponent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import profile from '@/public/profile.png';
import logo from '@/public/logo.svg';
import { FaBell, FaSearch } from 'react-icons/fa';

const Header: FunctionComponent = () => {
	return (
		<header className='w-full'>
			<div className='flex items-center justify-between space-x-2 md:space-x-10'>
				<h1>
					<Image src={logo} alt={'netflix'} width={100} height={100} className='cursor-pointer' />
				</h1>

				{/* tailwind에서는 반응형 작업 시, 기본적으로 mobile first임. (모바일 우선) */}
				<ul className='hidden space-x-r1 md:flex'>
					<li className='headerLink'>HOME</li>
					<li className='headerLink'>TV Show</li>
					<li className='headerLink'>Movies</li>
					<li className='headerLink'>New & Popular</li>
					<li className='headerLink'>My List</li>
				</ul>
			</div>

			<div className='flex items-center space-x-4 text-sm font-light'>
				<FaSearch className='w-6' />
				<p className='hidden lg:inline'>Kids</p>
				<FaBell className='w-6' />
				<Link href='/'>
					<Image src={profile} width={32} height={32} alt='profile' className='rounded' />
				</Link>
			</div>
		</header>
	);
};

export default Header;
