import Head from 'next/head';
import type { NextPage } from 'next';
import Header from '@/components/Header';
import requests from '@/utils/request';
import { Movie } from '../../types';
import Banner from '@/components/Banner';
import List from '@/components/List';

// npm i tailwind-scrollbar tailwind-scrollbar-hide

// 확장기능 중 Headwind 설치 (tailwind구문에서 최적화된 순서에 맞게 자동으로 구문 순서를 재배치해주는 것.)
// command + shift + T 하면 headwind 기능 활성화됨.

interface Props {
	original: Movie[];
	top: Movie[];
	sf: Movie[];
	drama: Movie[];
	fantasy: Movie[];
	comedy: Movie[];
	action: Movie[];
}

// 기본 Next Page 컴포넌트에 적용할 타입을, 미리 Next에서 자체 등록 및 제공되고 있는 NextPage을 가져와서 페이지 타입 지정
// 해당 pageType을 우리가 만든 것이 아니기 때문에 해당 페이지에 전달되는 props의 타입을 제네릭으로 지정

// Page 컴포넌트에 대한 타입은 Next에서 이미 제공하고 있는 함수 관련 타입을 쓰고 있고, 제네릭으로 prop을 전달하고 있기 때문에, 함수의 파라미터에 중복해서 타입을 전달할 필요가 없음.
// 하지만 만약에 Home 뒤에 : NextPage<Props> 라는 기본 제공 타입을 연결하지 않는다면, 파라미터 뒤에 (props: Props) 로 타입 전달해야 함.
const Home: NextPage<Props> = props => {
	return (
		// w-screen : 100vw, h-screen : 100vh , w-full : 100% , h-full : 100%
		<div className='relative w-full h-screen overflow-x-hidden scrollbar-thin scrollbar-thumb-[red] scrollbar-track-[transparent]'>
			<Head>
				<title>NETFLIX</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Header />
			<main className='relative'>
				<Banner original={props.original} />
				{Object.values(props).map((category, idx) => (
					<List key={idx} movies={category} title={Object.keys(props)[idx]} />
				))}
			</main>
		</div>
	);
};

export const getStaticProps = async () => {
	// Promise.all([promise객체, promise객체]).then(()=>배열에 인수로 전달될 모든 promise 객체의 상태가 pending이 아닌 fulfilled나 rejected가 되어야지만 이곳의 then 구문이 동기적으로 실행됨. )
	const [original, top, sf, drama, fantasy, comedy, action] = await Promise.all([
		fetch(requests.original).then(res => res.json()),
		fetch(requests.top).then(res => res.json()),
		fetch(requests.sf).then(res => res.json()),
		fetch(requests.drama).then(res => res.json()),
		fetch(requests.fantasy).then(res => res.json()),
		fetch(requests.comedy).then(res => res.json()),
		fetch(requests.action).then(res => res.json())
	]);
	return {
		props: {
			original: original.results,
			top_rated: top.results,
			sf: sf.results,
			drama: drama.results,
			fantasy: fantasy.results,
			comedy: comedy.results,
			action: action.results
		},
		revalidate: 60 * 60 * 60 * 24
	};
};

export default Home;
