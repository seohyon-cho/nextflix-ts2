import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

// 해당 코드는 firebase 객체를 직접 가져와서 설정값을 초기화한 뒤, 초기화 설정이 완료된 firebase 객체 자체를 export로 내보내는 것.
// 원하는 컴포넌트에서 firebase객체를 import 하기만 하면, 내부의 로그인/로그아웃 정보 값을 확인할 수 있음.
const firebaseConfig = {
	apiKey: 'AIzaSyBZqnQ2yNS39pncLsfSgmMhJdOD_Jjc3Yc',
	authDomain: 'next2024-b145a.firebaseapp.com',
	projectId: 'next2024-b145a',
	storageBucket: 'next2024-b145a.appspot.com',
	messagingSenderId: '509375898729',
	appId: '1:509375898729:web:dc4f7b637a4798e3736ef8'
};

firebase.initializeApp(firebaseConfig);

export default firebase;
