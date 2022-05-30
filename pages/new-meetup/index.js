//our-domain/meet-up

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
	const addMeetUpHandler = (enteredMeetupData) => {
		console.log(enteredMeetupData);
	};

	return <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
}
export default NewMeetupPage;

/**
 * we DO NOT need the DATA here, hence we will not call the @getStaticProp
 */
