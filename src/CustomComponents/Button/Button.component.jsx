export const BUTTON_TYPE_CLASSES = {
  main: 'bg-neutral-800 text-purple-400',
  inverted: 'bg-purple-400 text-neutral-800',
  disabled: 'bg-neutral-800 text-purple-400 opacity-50',
  warning: 'bg-red-400 text-neutral-800',
};

const BUTTON_BASE_CLASS = 'h-12 m-2 cursor-pointer w-56 rounded-md';

const Button = ({ children, buttonType, ...otherProps }) => {
  return (
    <button
      className={`${BUTTON_BASE_CLASS} ${
        buttonType ? BUTTON_TYPE_CLASSES[buttonType] : BUTTON_TYPE_CLASSES.main
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
