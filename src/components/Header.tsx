import Image from 'next/image';
import logo from '@/public/logo.svg';
const Header = () => {
	return (
		<header className='w-full'>
			<div className=' flex justify-between items-center space-x-2'>
				<h1>
					<Image src={logo} alt={'netflix'} width={100} height={100} className='cursor-pointer' />
				</h1>

				{/* tailwind에서는 반응형 작업 시, 기본적으로 mobile first임. (모바일 우선) */}
				<ul className='space-x-r1 hidden md:flex'>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
