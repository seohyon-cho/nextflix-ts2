import Image from 'next/image';
import logo from '@/public/logo.svg';
const Header = () => {
	return (
		<header className='w-full'>
			<div className=' flex justify-between items-center space-x-2'>
				<h1>
					<Image src={logo} alt={'netflix'} width={100} height={100} className='cursor-pointer' />
				</h1>

				<ul className='flex gap-8'>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
					<li className='headerLink'>menu</li>
				</ul>
			</div>
		</header>
	);
};

export default Header;
