import { FunctionComponent } from 'react';
import { Movie } from '../../types';
import Image from 'next/image';
import { baseURL } from '../../url';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useRef } from 'react';

interface Props {
	title: string;
	movies: Movie[];
}

interface ScrollProp {
	scrollLeft: number | null;
	clientWidth: number | null;
}

const List: FunctionComponent<Props> = ({ movies, title }) => {
	// listFrame에는 UL 요소가 담기도록 type 지정
	const listFrame = useRef<HTMLUListElement>(null);

	const handleClick = (direction: string) => {
		// listFrame으로 가져오는 DOM 속성 객체를 담을 타입을 추가 지정
		const scrollValue: ScrollProp | null = listFrame.current;
		// 각 객체값이 없을 때를 대비한 예외처리로 0값 옵셔널 처리
		const scrollLeft = scrollValue?.scrollLeft || 0;
		const clientWidth = scrollValue?.clientWidth || 0;

		// 좌우버튼 클릭 시, 인수로 전달되는 방향 값에 따라 가로축으로 이동할 타겟 위치값을 구해서 scrollTo로 이동처리
		// 현재 위치값에서 전체 브라우저 크기만큼 빼고 더하고 해서 움직이는 것.
		const targetPos = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
		listFrame.current?.scrollTo({ left: targetPos, behavior: 'smooth' });
	};
	return (
		// 특정 부모에 group지정시 자식요소에서 group-hover: 호버되는 영역을 지정 가능
		<article className='relative z-[5] pl-4  group'>
			<h2 className='mb-2 text-lg md:text-xl lg:text-2xl'>{title}</h2>
			<ul
				ref={listFrame}
				className='flex mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-[transparent] scrollbar-track-[transparent] md:mb-8 lg:mb-10 group-hover:scrollbar-thumb-[red] '>
				{movies.map((movie, idx) => {
					return (
						<li
							key={movie.id}
							className='min-w-[180px] min-h-[80px] relative cursor-pointer md:min-w-[200px] md:min-h-[100px] lg:min-w-[240px] lg:min-h-[120px] opacity-50 hover:opacity-100'>
							<Image src={`${baseURL}w300${movie.backdrop_path}`} alt={`${movie.title}` || `${movie.name}`} fill className='object-cover' />
						</li>
					);
				})}
			</ul>

			<FaAngleLeft
				className='absolute top-0 bottom-0 left-2 z-[5] m-auto h-12 cursor-pointer opacity-0 transition-opacity duration-[0.5s] group-hover:opacity-100'
				onClick={() => handleClick('left')}
			/>
			<FaAngleRight
				className='absolute top-0 bottom-0 right-2 z-[5] m-auto h-12 cursor-pointer opacity-0 transition-opacity duration-[0.5s] group-hover:opacity-100'
				onClick={() => handleClick('right')}
			/>
		</article>
	);
};

export default List;
