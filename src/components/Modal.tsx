import { FunctionComponent } from 'react';
import { modalState, movieState } from '@/recoil/globalAtom';
import { useRecoilState, useRecoilValue } from 'recoil';
import Image from 'next/image';
import { baseURL } from '../../url';

const Modal: FunctionComponent = () => {
	const [_, setShowModal] = useRecoilState(modalState);
	const MovieData = useRecoilValue(movieState);
	return (
		<aside className='fixed top-0 left-0 z-50 flex items-center justify-center w-full h-screen p-10 bg-black/90'>
			<article className='w-[600px] h-full'>
				<h2 className='w-full text-4xl'>{MovieData?.original_title || MovieData?.origin_name}</h2>
				<div className='w-full h-[50%] overflow-hidden relative'>
					<Image src={`${baseURL}original${MovieData?.backdrop_path}`} alt='image' priority fill className='object-cover' />
				</div>
				<span className='absolute text-base font-bold text-white cursor-pointer top-10 right-10' onClick={() => setShowModal(false)}>
					close
				</span>
			</article>
		</aside>
	);
};

export default Modal;
