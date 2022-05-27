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

function HomePage() {
	const [loadedMeetups, setLoadedMeetups] = useState([]);
	//fetch data from backend
	useEffect(() => {
		//fetch data
		setLoadedMeetups(DUMMY_MEETUPS);
	}, []);

	return <MeetupList meetups={loadedMeetups} />;
}
export default HomePage;

/**
* NOTE that we will have two component render cycle here. 
first cycle - intiial component render cycle.
-- at this stage the useState has no data, therefore we initiated with an empty array.
*/
