import { useState, useEffect } from 'react';
import { Movie } from '../../types';
import Image from 'next/image';
import { baseURL } from '../../url';

interface Props {
	original: Movie[];
}

export default function Banner({ original }: Props) {
	const [Movie, setMovie] = useState<Movie | null>(null);
	console.log(Movie);

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * original.length);
		setMovie(original[randomNum]);
	}, [original]);

	console.log(original);
	return (
		<section className=' h-screen px-4 pb-20 pt-40 flex flex-col space-y-4'>
			{Movie && (
				<>
					<div className='absolute top-0 left-0 z-[1] w-full h-full'>
						<Image
							src={`${baseURL}original${Movie.backdrop_path}`}
							// alt 값은 기본적으로 문자만 전달받도록 타입이 강제되어 있으므로, 템플릿 리터럴 안 쪽에서 변수값이 문자로 반환되도록 처리
							alt={`${Movie.name}` || `${Movie.original_title}`}
							fill
							priority
							quality={70}
							sizes='(max-width: 768px) 100vw , (max-width: 1200px) 50vw, 30vw'
							className='object-cover'
						/>
					</div>
				</>
			)}
		</section>
	);
}
