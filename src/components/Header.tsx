import Image from 'next/image';
import logo from '@/public/logo.svg';
import profile from '@/public/profile.png';
import { FaBell, FaSearch } from 'react-icons/fa';
import Link from 'next/link';
import { FunctionComponent } from 'react';
import getData from '@/hooks/useAuth';

const Header: FunctionComponent = () => {
	const { logout } = getData();
	return (
		<header className='w-full'>
			<div className='flex items-center space-x-2 md:space-x-10 '>
				<h1>
					<Image src={logo} alt='netflix' width={100} height={100} className='cursor-pointer' />
				</h1>

				<ul className='hidden space-x-4 md:flex'>
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
					{/* 프로필이미지 클릭시 로그아웃 함수 호출 */}
					<Image src={profile} width={32} height={32} alt='profile' className='rounded' onClick={logout} />
				</Link>
			</div>
		</header>
	);
};

export default Header;
