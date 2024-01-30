import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import { auth } from '@/firebase';

// 전역 Context에 전달할 인증 정보 타입
interface IAuth {
	UserInfo: User | null;
	signIn: (email: string, password: string) => Promise<void>;
	signUp: (email: string, password: string) => Promise<void>;
	signOut: () => Promise<void>;
	Errors: string | null;
	Loading: boolean;
}

// 전역 State provider에 전달할 Props 타입
interface AuthProviderProps {
	children: React.ReactNode;
}

// firebase로부터 전달 받아서 전역 Context에 전달할 객체 모음
const AuthContext = createContext<IAuth>({
	UserInfo: null,
	signUp: async () => {},
	signIn: async () => {},
	signOut: async () => {},
	Errors: null,
	Loading: false
});

// 전체 컴포넌트를 감싸줄 wrapping 컴포넌트 (전역 Provider) (전역 데이터를 모든 컴포넌트에 전달하는 최상위 부모 컴포넌트)
export const AuthProvider = ({ children }: AuthProviderProps) => {
	const [Loading, setLoading] = useState<boolean>(false); // 초기값으로 false가 설정되어 있어 초기값이 없을 수 없으므로 마찬가지로 유니온 타입 안 써도 됨.
	const [UserInfo, setUserInfo] = useState<User | null>(null);
	const [Errors, setErrors] = useState<string>(''); // 빈문자열로 초기값이 들어가있으므로 유니온타입 안 써도 됨. 빈문자열로 초기값 안 넣어둘 거면 | null 로 유니온타입 설정하고 초기값 칸에 null 넣으면 됨.
	const [InitialLoading, setInitialLoading] = useState<boolean>(true);
	const router = useRouter();

	useEffect(() => {
		// firebase로부터 전달되는 Auth 상태값이 변경될 때마다 해당 useEffect 실행
		onAuthStateChanged(auth, user => {
			// 인증 상태가 변경될 때마다, 해당 상태를 감지해서,
			// 전달받은 인증 정보가 있는 경우
			if (user) {
				setUserInfo(user);
				setLoading(false);
				router.push('/');
			} // 전달받은 인증 정보가 없는 경우
			else {
				setUserInfo(null);
				setLoading(true);
				router.push('/login');
			}
			// 한 번이라도 인증 로직이 실행되면, 초기 상태를 false로 변경
			setInitialLoading(false);
		});
	}, [router]); // 전역 컴포넌트로 전달되기 때문에 이 구문 없이는 페이지 이동을 인지 못 하므로, 내부적으로 페이지가 현재 이동하고 있는지 아닌지를 인지할 수 있음. -> 페이지 이동 시마다 인증처리가 된 상태인지 체크.

	// 회원가입 함수
	const signUp = async (email: string, password: string) => {
		setLoading(true);
		await createUserWithEmailAndPassword(auth, email, password)
			.then(userInfo => {
				setUserInfo(userInfo.user);
				router.push('/');
				setInitialLoading(false);
			})
			.catch(err => alert(err.message))
			.finally(() => setLoading(false));
	};

	//로그인함수
	const signIn = async (email: string, password: string) => {
		await signInWithEmailAndPassword(auth, email, password)
			.then(userInfo => {
				setUserInfo(userInfo.user);
				router.push('/');
			})
			.catch(err => alert(err.message));
	};

	//로그아웃 함수
	const logout = async () => {
		signOut(auth)
			.then(() => {
				setUserInfo(null);
			})
			.catch(err => alert(err.message));
	};

	return <AuthContext.Provider value={{ UserInfo, signIn, signOut, signUp, Loading, Errors }}>{children}</AuthContext.Provider>;
};
