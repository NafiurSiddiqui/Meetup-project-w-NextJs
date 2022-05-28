//our-domain/
import { useState } from "react";
import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
	{
		id: "m1",
		title: "A First Meetup",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
		address: "Some address 5, 12345 Some City",
		description: "This is a first meetup!",
	},
	{
		id: "m2",
		title: "A Second Meetup",
		image:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
		address: "Some address 10, 12345 Some City",
		description: "This is a second meetup!",
	},
];

// function HomePage() {
// 	return <MeetupList meetups={DUMMY_MEETUPS} />;
// }
// export default HomePage;

//--------------------------------------------------------------------------------------------------------------stage 2

// function HomePage() {
// 	const [loadedMeetups, setLoadedMeetups] = useState([]);
// 	//fetch data from backend
// 	useEffect(() => {
// 		//fetch data
// 		setLoadedMeetups(DUMMY_MEETUPS);
// 	}, []);

// 	return <MeetupList meetups={loadedMeetups} />;
// }

// export default HomePage;

/**
* NOTE that we will have two component render cycle here. 
first cycle - intiial component render cycle.
-- at this stage the useState has no data, therefore we initiated with an empty array.

-- Second cycle - here is where the data arrives.
-- POTENTIAL CARE: with this two rendered cycle, even though the data instantly arrives,the list is empty therefore SEO wont find anything here. Because, nextJS prerender content renders the whatever the first cycle contains.
**/

//--------------------------------------------------------------------------------------------------------------stage 3 (SSG)

function HomePage(props) {
	return <MeetupList meetups={props.meetups} />;
}

export async function getStaticProps() {
	//we can run any server side code here which only is executed during build process.
	//FETCH Data from the API
	return {
		props: {
			meetups: DUMMY_MEETUPS,
		},
		revalidate: 10,
	};
}

export default HomePage;

/**
@getStaticProps - we can prerender a page with the data, for which we have to wait. For a second cycle like this. refer to the PC nextJs >
page renering file for more IMPORTANT Info.
---always returns an object
--- the props from here are sent to any component that needs this data. Therefore we set the props as an argument in the home page.
--- Hence, we do not need the useState and useEffect here anymore.
--- @revalidate - add this extra property if the data is frequently changing and needs to be re-evaluated.
**/

//-------------------------------------------------------------------------------------------------------------- SSR ( WE DO NOT NEED SSR here, just to show how it works )

// function HomePage(props) {
// 	return <MeetupList meetups={props.meetups} />;
// }

// export async function getServerSideProps(context) {
// 	//fetch data from API
// 	//access file system
// 	//work with credentials

// 	const req = context.req;
// 	const res = context.res;

// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

// export default HomePage;

/**
 * @getServerSideProps -Here this code will always run on the server
 * @context - this argument comes in as optional if you need it.
 * @req - can be very useful for things like if you have to check for authentication, session cookies like that. you can get various of data from the req. header, body, all sort.
 */
