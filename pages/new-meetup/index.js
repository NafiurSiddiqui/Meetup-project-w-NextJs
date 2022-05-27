//our-domain/meet-up

import NewMeetupForm from "../../components/meetups/NewMeetupForm";

function NewMeetupPage() {
	const addMeetUpHandler = (enteredMeetup) => {
		console.log(enteredMeetup);
	};

	return <NewMeetupForm onAddMeetup={addMeetUpHandler} />;
}
export default NewMeetupPage;
