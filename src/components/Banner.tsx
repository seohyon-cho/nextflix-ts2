import { FunctionComponent } from 'react';
import { useState, useEffect, useRef } from 'react';
import { Movie } from '../../types';
import Image from 'next/image';
import { baseURL } from '../../url';
import { FaPlay, FaInfoCircle, FaInfo } from 'react-icons/fa';
import { modalState, movieState } from '@/recoil/globalAtom';
import { useRecoilState } from 'recoil';

interface Props {
	original: Movie[];
}

const Banner: FunctionComponent<Props> = ({ original }) => {
	const loading = useRef<HTMLDivElement>(null);
	const [Movie, setMovie] = useState<Movie | null>(null);
	const [ShowModal, setShowModal] = useRecoilState(modalState);
	const [MovieInfo, setMovieInfo] = useRecoilState(movieState);

	useEffect(() => {
		const randomNum = Math.floor(Math.random() * original.length);
		setMovie(original[randomNum]);
	}, [original]);

	return (
		<section className='relative flex flex-col h-[60vh] justify-end px-4 pt-40 pb-5 space-y-4 md:h-[70vh] md:pd-15 md:space-y-8 lg:space-y-14 lg:h-[85vh] lg:pb-20'>
			{Movie && (
				<>
					{/* pic Frame */}
					<div className='absolute top-0 left-0 z-[1] w-full h-full opacity-70'>
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
					<p className='relative z-[3] text-xs md:text-lg lg:text-2xl lg:w-[60%]'>{Movie?.overview}</p>

					{/* button set */}
					<nav className='relative z-[3] flex gap-3'>
						<button
							className='bannerButton bg-[red]'
							onClick={() => {
								setShowModal(true);
								setMovieInfo(Movie);
							}}>
							<FaPlay />
							Play{' '}
						</button>
						<button className='bannerButton'>
							<FaInfoCircle /> More Info
						</button>
					</nav>
				</>
			)}
		</section>
	);
};

export default Banner;
