import "../styles/globals.css";
import Layout from "../components/layout/Layout";

function MyApp({ Component, pageProps }) {
	return (
		<Layout>
			<Component {...pageProps} />
		</Layout>
	);
}

export default MyApp;

/**
*@MyApp - 👆 this component is a special component provided by NextJ.
- if we had 1000 pages, going around wrapping those pages would have been impossible.

- wrapping this component with whatever comoponent we wanna wrap every pages with, does the trick.

- This <Component> is our actual place where the pages will be rendered whenever we navigate to other pages.
*/
