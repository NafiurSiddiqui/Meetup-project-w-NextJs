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

//--------------------------------------------------------------------------------------------------------------stage 3

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
	};
}

export default HomePage;

/**
@getStaticProps - we can prerender a page with the data, for which we have to wait. For a second cycle like this. refer to the PC nextJs >
page renering file for more IMPORTANT Info.
---always returns an object
--- the props from here are sent to any component that needs this data. Therefore we set the props as an argument in the home page.
--- Hence, we do not need the useState and useEffect here anymore.
**/
