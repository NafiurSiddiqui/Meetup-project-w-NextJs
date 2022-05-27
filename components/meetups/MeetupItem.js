import Card from "../ui/Card";
import classes from "./MeetupItem.module.css";
import { useRouter } from "next/router";

function MeetupItem(props) {
	const router = useRouter();

	const showDetailsHandler = () => {
		router.push("/" + props.id);
	};

	return (
		<li className={classes.item}>
			<Card>
				<div className={classes.image}>
					<img src={props.image} alt={props.title} />
				</div>
				<div className={classes.content}>
					<h3>{props.title}</h3>
					<address>{props.address}</address>
				</div>
				<div className={classes.actions}>
					<button onClick={showDetailsHandler}>Show Details</button>
				</div>
			</Card>
		</li>
	);
}

export default MeetupItem;

/**
*@showDetails - we could also just simply render a <Link> here. 
- The button is used to show prgrammatically things are done.
- @useRouter - The way we would navigate around.
- @push - method. pushes new pages on the stack of pages. This is equivalent of the <link> component.
 - expects a path, so, to handle the path dynamically we can do this.
*/
