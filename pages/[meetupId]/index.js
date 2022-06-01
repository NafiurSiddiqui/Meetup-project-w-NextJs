//we will be fecthing the details dynamically with id, therefore the name should be wrapped withing square brackets.

import { MongoClient, ObjectId } from 'mongodb';
import Head from 'next/head';
import MeetupDetail from '../../components/meetups/MeetupDetail';

//--------------------------------------------------------------------------------------------------------------stage 1 (hard coded for test and first setup)

// function MeetUpDetails() {
// 	return (
// 		<MeetupDetail
// 			image="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg"
// 			title="First Meetup"
// 			address="Some Street 5, Some City"
// 			description="This is a first meetup"
// 		/>
// 	);
// }

// export async function getStaticPaths() {
// 	return {
// 		fallback: false,
// 		paths: [
// 			{
// 				params: {
// 					meetupId: "m1",
// 				},
// 			},
// 			{
// 				params: {
// 					meetupId: "m2",
// 				},
// 			},
// 		],
// 	};
// }

// export async function getStaticProps(context) {
// 	//fetch data for a single meetup
// 	//for this we need an ID
// 	const meetupId = context.params.meetupId;
// 	console.log(meetupId);
// 	//note that this console.log is ran during build time, so you will see it in the console but not in the Browser dev tools.
// 	return {
// 		props: {
// 			meetupData: {
// 				image:
// 					"https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg",
// 				id: meetupId,
// 				title: "first meetup",
// 				address: "Some street 5, Some City",
// 				description: "This is a first meetup",
// 			},
// 		},
// 	};
// }

// export default MeetUpDetails;

/**
 * HERE WE NEED THE DATA, hence we will call the @getStaticProp
 * @context - here in the staticProps, we have access to the URL path / parameters. We could use the Router here, but router could not be used outside of the component function. Hence, we needed the context here.
 *
 * @getStaticPath - is needed if you are using a dynamic page and using a getStaticProp.
 */

//--------------------------------------------------------------------------------------------------------------stage 2 ( getting the data from server now)

function MeetUpDetails(props) {
	return (
		<>
			<Head>
				<title>{props.meetupData.title}</title>
				<meta name="description" content={props.meetupData.description} />
			</Head>

			<MeetupDetail
				image={props.meetupData.image}
				title={props.meetupData.title}
				address={props.meetupData.address}
				description={props.meetupData.description}
			/>
		</>
	);
}
export async function getStaticPaths() {
	//connect to the DB
	const client = await MongoClient.connect(
		'mongodb+srv://jim:<pass>@meetupcluster.4lkto.mongodb.net/meetup?retryWrites=true&w=majority'
	);

	const db = client.db();

	const meetupsCollections = db.collection('meetups');

	const meetups = await meetupsCollections.find({}, { _id: 1 }).toArray();

	// 👆 Here we are interested in only ID, so tweak our find here.
	//--- first arg = the database field.
	//--- second arg = which field should be extracted for every document. So, the _id:1 means only extract the id but no other values.

	client.close();

	return {
		fallback: 'blocking',
		paths: meetups.map((meetup) => ({
			params: {
				meetupId: meetup._id.toString(),
			},
		})),
	};

	// 👆 with this we are generating our array of paths dinamically.

	/**
	 * @blocking - meaning the list of path might not be exahustive and there might be more valid pages.
	 * --- if the specified page is not generated yet, with this, nextJS won't respond with 404 but will generate that page and cache it. With this, page is pregenerated and returned with content, not an empty page.
	 *
	 * @true - setting it will achieve the same result but the user will be served the page and then the content will be served.
	 */
}

export async function getStaticProps(context) {
	//fetch data for a single meetup
	//for this we need an ID
	const meetupId = context.params.meetupId;
	console.log(meetupId);

	const client = await MongoClient.connect(
		'mongodb+srv://jim:<pass>@meetupcluster.4lkto.mongodb.net/meetup?retryWrites=true&w=majority'
	);

	const db = client.db();

	const meetupsCollections = db.collection('meetups');

	const selectedMeetup = await meetupsCollections.findOne({
		_id: ObjectId(meetupId),
	});
	// 👆 look for one single document.
	// --to find one, we need to pass an object.
	//--here we filter out the document
	//--  here if we had pass, title: "first meetup", it would have looked for that document, and return. Here we are interested in ID which  will match the ID provided by the params.id from the URL.
	/**
	 * @objectId - is used since the id that we get from database is an object provided by DB. But here we get the MEETUPID as string, hence, we needed to convert it to the object by importing OBJECTID from mongoDB and wrap it around our meetupID.
	 */

	client.close();

	return {
		//--------------------------------------------------------------------------------------------------------------stage 1 (hard coded for test)
		// props: {
		// 	meetupData: {
		// 		image:
		// 			'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
		// 		id: meetupId,
		// 		title: 'first meetup',
		// 		address: 'Some street 5, Some City',
		// 		description: 'This is a first meetup',
		// 	},
		// },
		//--------------------------------------------------------------------------------------------------------------stage 2 (dynamically)
		//but then again this would give you error since our ID is now object and our rendered data needs to be string.
		props: {
			meetupData: selectedMeetup,
		},

		//--------------------------------------------------------------------------------------------------------------stage 3 (Dynamically rendered)
		props: {
			meetupData: {
				id: selectedMeetup._id.toString(),
				title: selectedMeetup.title,
				image: selectedMeetup.image,
				address: selectedMeetup.address,
				description: selectedMeetup.description,
			},
		},
	};
}

export default MeetUpDetails;
