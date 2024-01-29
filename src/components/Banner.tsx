import { useState, useEffect, useRef } from 'react';
import { Movie } from '../../types';
import Image from 'next/image';
import { baseURL } from '../../url';
import type { NextPage } from 'next';

interface Props {
	original: Movie[];
}

const Banner: NextPage<Props> = ({ original }: Props) => {
	// useRef에는 초기값이 없을 수가 없으므로 직접 값을 수동으로 지정해야 하기 때문임.
	// useState와 다르게 useRef는 unionType을 지정하지 않더라도 인수로 지정한 초기값을 자동으로 유니온타입 설정
	// 돔을 담을 때에는 무조건 아래처럼 useRef<HTMLDivElement>(null) 로,
	// 만약 숫자값을 담을 거면 useRef<number>(0) 이런 식으로 응용하면 됨.
	const loading = useRef<HTMLDivElement>(null);
	// useState는 초기값을 집어넣지 않더라도 추후 담기는 값을 인지해서 타입을 추론함.
	// 반면 useState는 예외사항에 대한 값을 우리가 무조건 unionType으로 직접 지정해줘야 함.
	const [Movie, setMovie] = useState<Movie | null>(null);
	console.log(Movie);

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * original.length);
		setMovie(original[randomNum]);
	}, [original]);

	console.log(original);
	return (
		<section className='h-screen px-4 pb-20 pt-40 flex flex-col space-y-4'>
			{Movie && (
				<>
					{/* pic Frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full'>
						<Image
							src={`${baseURL}original${Movie.backdrop_path}`}
							alt={`${Movie.name}` || `${Movie.original_title}`}
							fill
							priority
							quality={70}
							sizes='(max-width: 768px) 100vw , (max-width: 1200px) 70vw, 100vw'
							className='object-cover'
							onLoadingComplete={() => loading.current?.remove()}
						/>
					</div>

					{/* gradient layer */}
					<div className='absolute z-[2] top-0 left-0 w-full h-full bg-gradient1 '></div>

					{/* loading bar */}
					<div
						ref={loading}
						className='w-[40px] h-[40px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] border-4 border-[orange] border-t-[transparent] rounded-[50%] z-[3] animate-ani-rotation '></div>

					{/* title */}
					<h1 className='relative z-[3] text-2xl font-bold md:text-4xl lg:text-7xl'>{Movie?.title || Movie?.name}</h1>

					{/* overview */}
					<p className='relative z-[3] text-xs md:text-lg lg:text-2xl'>{Movie?.overview}</p>
				</>
			)}
		</section>
	);
};

export default Banner;
