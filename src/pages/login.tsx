import Head from 'next/head';
import Image from 'next/image';
import { FunctionComponent } from 'react';
import { BounceLoader } from 'react-spinners';
import { useState } from 'react';
import logo from '@/public/logo.svg';
import { SubmitHandler, useForm } from 'react-hook-form';
// npm i react-hook-form

interface Inputs {
	email: string;
	password: string;
}

const Login: FunctionComponent = () => {
	const [IsLoading, setIsLoading] = useState<boolean>(true);
	const [Login, setLogin] = useState<boolean>(false);

	// register : 원하는 input 요소를 전개연산자로 등록해서, 해당 input의 값을 관리
	// handleSubmit : 실제 submit 이벤트 발생 시, register에 등록되어있는 input 값들의 인증처리 핸들러 함수를 콜백으로 전달받음.
	// formState : 인증 실패 시, 커스텀 에러 메세지를 등록할 수 있는 객체.
	const {
		register,
		handleSubmit,
		formState: { errors } // formState 객체 값에서 다시 errors에 등록되어 있는 에러메세지만 추출.
	} = useForm<Inputs>();

	// 인증 성공 시, handleSubmit에 의해서 자동으로 실행될 콜백 함수.
	const join: SubmitHandler<Inputs> = async ({ email, password }) => {
		console.log('email', email);
		console.log('password', password);
	};

	return (
		<main>
			<Head>
				<title>Nextflix | Login</title>
				<link rel='icon' href='/favicon.ico' />
			</Head>

			{/* frame */}
			<div className='relative flex items-center justify-center w-full h-screen p-10 overflow-hidden md:p-0'>
				{/* bg */}
				<Image
					src='https://rb.gy/p2hphi'
					fill
					priority
					alt='login Page'
					className='w-full h-screen z-[1] opacity-50 object-cover hidden md:block'
					onLoadingComplete={() => setIsLoading(false)}
				/>

				{/* loader */}
				<BounceLoader
					size={100}
					loading={IsLoading}
					color='orange'
					className='absolute top-[50%] left-[50%] ml-[-50px] mt-[-50px] z-[2] opacity-100'
				/>

				{/* logo */}
				<Image width={150} height={150} src={logo} alt='nextflix' className='absolute left-4 top-4 cursor-pointer md:left-10 md:top-6 z-[3]' />

				{/* submit 이벤트 발생 시, handleSubmit이 인증처리를 해주고, 인증의 결과값을 등록된 콜백함수에 전달.  */}
				<form onSubmit={handleSubmit(join)} className='relative z-[5] bg-black/70 py-10 px-6 space-y-8'>
					<h1 className='text-4xl font-semibold'>Sign In</h1>

					<div className='space-y-4'>
						<input
							type='text'
							placeholder='Email'
							className='input'
							{...register('email', { required: true, minLength: 5, maxLength: 20, pattern: /@/ })} // 정규표현식으로 @ 포함 시키기
						/>
						{/* 인증 실패 시, 비구조화 할당으로 뽑아낸 errors 객체에 전달한 property 명으로 에러값 전달 */}
						{errors.email && <span>Enter a valid Email</span>}
						<input
							type='password'
							placeholder='Password'
							className='input'
							// 정규표현식으로 특수문자+영문+숫자 포함시키기. (이 상태에서는 조건 나열하는 순서도 중요함. 아래 식 기준으로는 특문+영문+숫자 순서여야만 인증됨.)
							{...register('password', { required: true, minLength: 4, maxLength: 10, pattern: /[~!@#$%^&*()]+[a-zA-Z]+[0-9]/ })}
						/>
						{errors.password && <span>Enter a valid Password</span>}
					</div>

					<button className='w-full rounded bg-[red] py-3 font-semibold'>Sign In</button>

					<div className='text-[gray]'>
						New to Nextflix?
						<button className='ml-4 text-white hover:underline'>Sign Up Now</button>
					</div>
				</form>
			</div>
		</main>
	);
};

export default Login;
