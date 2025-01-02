import { PARTYKIT_HOST } from "astro:env/client";
import type { Poll } from "../types";
import { createSignal, onMount, onCleanup, type Component } from "solid-js";
import PartySocket from "partysocket";
import PollOptions from "./PollOptions";

interface PollUIProps {
	id: string;
	options: string[];
	initialVotes?: number[];
}

const PollUI: Component<PollUIProps> = (props) => {
	const [votes, setVotes] = createSignal<number[]>(props.initialVotes ?? []);
	const [vote, setVote] = createSignal<number | null>(null);
	let socket: PartySocket;

	// Load saved vote from localStorage
	const loadSavedVote = () => {
		try {
			const saved = localStorage?.getItem(`poll:${props.id}`);
			if (saved !== null) {
				const savedVote = Number.parseInt(saved);
				if (
					!Number.isNaN(savedVote) &&
					savedVote >= 0 &&
					savedVote < props.options.length
				) {
					setVote(savedVote);
					return true;
				}
			}
		} catch (error) {
			console.error("Error loading saved vote:", error);
		}
		return false;
	};

	onMount(() => {
		// Initialize PartySocket
		socket = new PartySocket({
			host: PARTYKIT_HOST,
			room: props.id,
		});

		// Handle incoming messages
		socket.addEventListener("message", (event) => {
			const message = JSON.parse(event.data) as Poll;
			if (message.votes) {
				setVotes(message.votes);
			}
		});

		// Load saved vote on mount
		loadSavedVote();

		// Cleanup on unmount
		onCleanup(() => {
			socket.close();
		});
	});

	const sendVote = (option: number) => {
		// Check if user hasn't voted yet and socket is available
		if (vote() === null && socket) {
			try {
				// Send vote to server
				socket.send(JSON.stringify({ type: "vote", option }));

				// Update local state
				setVote(option);

				// Save to localStorage
				localStorage?.setItem(`poll:${props.id}`, option.toString());

				console.log("Vote saved for poll:", props.id, "option:", option);
			} catch (error) {
				console.error("Error saving vote:", error);
			}
		}
	};

	return (
		<PollOptions
			options={props.options}
			votes={votes()}
			vote={vote()}
			setVote={sendVote}
		/>
	);
};

export default PollUI;
