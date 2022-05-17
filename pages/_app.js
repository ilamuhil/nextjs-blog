import '../styles/global.css';
//global styles can only be imported here..
export default function App({ Component, pageProps }) {
	return <Component {...pageProps} />;
}
