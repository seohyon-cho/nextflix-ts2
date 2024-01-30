import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// initializeApp(configOption): firebase 인증 객체 처음 생성 시 필요한 초기 인증 정보값을 등록
// getApp : 초기 firebase 객체를 생성
// getApps : firebase로 생성된 서비스 앱의 배열을 반환

const firebaseConfig = {
	apiKey: process.env.NEXT_PUBLIC_FIREBASE,
	authDomain: 'next2024-b145a.firebaseapp.com',
	projectId: 'next2024-b145a',
	storageBucket: 'next2024-b145a.appspot.com',
	messagingSenderId: '509375898729',
	appId: '1:509375898729:web:dc4f7b637a4798e3736ef8'
};

// 초기에 firebase앱 생성 시, 기존에 사용되고 있는 앱이 이미 있다면 이미 존재하는 그 앱을 불러오고, 없다면 처음 초기 셋팅을 시작함.
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(); // 인증함수의 결과값인, 반환된 인증 정보 객체를 반환

// app 객체와 인증객체를 export로 내보냄.
export default app;
export { auth };
