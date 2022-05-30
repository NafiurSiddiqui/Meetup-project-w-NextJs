//we will be fecthing the details dynamically with id, therefore the name should be wrapped withing square brackets.

import MeetupDetail from "../../components/meetups/MeetupDetail";

function MeetUpDetails() {
	return (
		<MeetupDetail
			image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
			title="First Meetup"
			address="Some Street 5, Some City"
			description="This is a first meetup"
		/>
	);
}

export async function getStaticPaths() {
	return {
		fallback: false,
		paths: [
			{
				params: {
					meetupId: "m1",
				},
			},
			{
				params: {
					meetupId: "m2",
				},
			},
		],
	};
}

export async function getStaticProps(context) {
	//fetch data for a single meetup
	//for this we need an ID
	const meetupId = context.params.meetupId;
	console.log(meetupId);
	//note that this console.log is ran during build time, so you will see it in the console but not in the Browser dev tools.
	return {
		props: {
			meetupData: {
				image:
					"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
				id: meetupId,
				title: "first meetup",
				address: "Some street 5, Some City",
				description: "This is a first meetup",
			},
		},
	};
}

export default MeetUpDetails;

/**
 * HERE WE NEED THE DATA, hence we will call the @getStaticProp
 * @context - here in the staticProps, we have access to the URL path / parameters. We could use the Router here, but router could not be used outside of the component function. Hence, we needed the context here.
 *
 * @getStaticPath - is needed if you are using a dynamic page and using a getStaticProp.
 */
