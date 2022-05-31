//our-domain/meet-up
import { useRouter } from 'next/router';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';

function NewMeetupPage() {
	const router = useRouter();
	async function addMeetupHandler(enteredMeetupData) {
		//send data to DB
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		console.log(data);

		//To navigate user away to the home upon submission
		router.push('/');
	}

	return <NewMeetupForm onAddMeetup={addMeetupHandler} />;
}
export default NewMeetupPage;

/**
 * we DO NOT need the DATA here, hence we will not call the @getStaticProp
 *
 * @fetch - since this is inside our own server, no need to use a third or whole domain to another API, therefore, we used the absolute path.
 */
