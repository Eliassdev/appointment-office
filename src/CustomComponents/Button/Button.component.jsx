export const BUTTON_TYPE_CLASSES = {
  main: "bg-neutral-800 w-56 h-12 m-2 text-purple-400 rounded-md",
  inverted: "bg-purple-400 w-56 h-12 m-2 text-neutral-800 rounded-md",
  disabled:
    "bg-neutral-800 w-56 h-12 m-2 text-purple-400 rounded-md opacity-50",
};

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
