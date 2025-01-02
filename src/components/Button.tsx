import { splitProps, type Component, type JSX } from "solid-js";

type ButtonProps = JSX.ButtonHTMLAttributes<HTMLButtonElement> & {
	theme?: "dark" | "light";
	className?: string;
};

const Button: Component<ButtonProps> = (props) => {
	const [local, others] = splitProps(props, ["theme", "className", "children"]);

	const colors = () =>
		local.theme === "dark"
			? "button-dark bg-black text-white shadow-blue-600"
			: "button-light bg-white text-blue-800 shadow-blue-200";

	return (
		<button
			type="button"
			class={`px-4 py-2 rounded-lg shadow hover:scale-105 disabled:hover:scale-100 disabled:grayscale disabled:opacity-50 disabled:cursor-not-allowed transition-transform ${colors()} ${local.className || ""}`}
			{...others}
		>
			{local.children}
		</button>
	);
};

export default Button;
