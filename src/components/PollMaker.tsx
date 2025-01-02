import { createSignal, type Component, For } from "solid-js";
import Button from "./Button";
import Input from "./Input";

const MIN_OPTIONS = 2;
const MAX_OPTIONS = 8;

const PollMaker: Component = () => {
	const [newOption, setNewOption] = createSignal<string>("");
	const [title, setTitle] = createSignal("");
	const [options, setOptions] = createSignal<string[]>([]);
	let newOptionRef: HTMLInputElement | undefined;

	const addNewOption = () => {
		if (newOption()?.trim().length !== 0) {
			setOptions((prevOptions) => [...prevOptions, newOption()]);
			setNewOption("");
		}
	};

	const canAdd = () => options().length < MAX_OPTIONS;
	const canSubmit = () =>
		title().length > 0 &&
		options().length >= MIN_OPTIONS &&
		options().filter((option) => option.trim().length === 0).length === 0;

	return (
		<>
			<Input
				placeholder="Poll title"
				type="text"
				name="title"
				className="text-2xl font-bold"
				value={title()}
				onInput={(e) => setTitle(e.currentTarget.value)}
				onKeyDown={(e) => {
					if (e.key === "Enter") {
						e.preventDefault();
						newOptionRef?.focus();
					}
				}}
			/>
			<ul class="flex flex-col space-y-4">
				<For each={options()}>
					{(value, i) => (
						<li class="flex">
							<Input type="text" name={`option-${i()}`} value={value} />
						</li>
					)}
				</For>
				{canAdd() && (
					<li class="flex space-x-4">
						<Input
							ref={newOptionRef}
							type="text"
							name="option-new"
							placeholder="New option"
							value={newOption()}
							onInput={(e) => setNewOption(e.currentTarget.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault();
									if (newOption().length > 0) {
										addNewOption();
									}
								}
							}}
						/>
						<Button theme="light" onClick={addNewOption}>
							Add
						</Button>
					</li>
				)}
			</ul>
			<Button type="submit" disabled={!canSubmit()}>
				Create poll
			</Button>
		</>
	);
};

export default PollMaker;
