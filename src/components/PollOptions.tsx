import { For, type Component } from "solid-js";

interface PollOptionsProps {
	options: string[];
	votes: number[];
	vote: number | null;
	setVote: (option: number) => void;
}

const PollOptions: Component<PollOptionsProps> = (props) => {
	const totalVotes = () => props.votes.reduce((a, b) => a + b, 0);
	const mostVotes = () => Math.max(...props.votes);

	return (
		<ul class="flex flex-col space-y-4">
			<For each={props.options}>
				{(option, i) => {
					const currentVotes = () => props.votes[i()] || 0;
					const percentage = () => {
						const total = totalVotes();
						return total > 0 ? (currentVotes() / total) * 100 : 0;
					};

					return (
						<li>
							<div class="relative w-full min-h-[40px] border rounded-md border-black flex">
								<div
									class={`absolute top-0 left-0 bottom-0 rounded-md transition-all duration-500 z-10 ${
										currentVotes() === mostVotes() && currentVotes() > 0
											? "vote-bg-winning"
											: props.vote === i()
												? "vote-bg-own"
												: "vote-bg"
									}`}
									style={{
										width: props.vote === null ? "0" : `${percentage()}%`,
									}}
								/>
								<div class="select-none w-full flex items-center justify-between px-4 z-20">
									<button
										type="button"
										onClick={() => props.setVote(i())}
										class={`flex flex-1 text-left py-2 ${
											props.vote === null ? "cursor-pointer" : "cursor-default"
										} ${
											props.vote !== null &&
											currentVotes() === mostVotes() &&
											currentVotes() > 0
												? "font-bold"
												: ""
										}`}
										disabled={props.vote !== null}
									>
										<span>{option}</span>
									</button>
									{props.vote !== null && <span>{currentVotes()}</span>}
								</div>
							</div>
						</li>
					);
				}}
			</For>
		</ul>
	);
};

export default PollOptions;
