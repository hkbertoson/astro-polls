import { splitProps, type Component, type JSX } from "solid-js";

type InputProps = JSX.InputHTMLAttributes<HTMLInputElement> & {
	className?: string;
};

const Input: Component<InputProps> = (props) => {
	const [local, others] = splitProps(props, ["className"]);

	return (
		<input
			type="text"
			class={`w-full rounded-lg border border-gray-200 placeholder-blue-400 p-2 px-4 ${local.className || ""}`}
			{...others}
		/>
	);
};

export default Input;
