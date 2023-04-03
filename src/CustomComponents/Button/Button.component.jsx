export const BUTTON_TYPES = {
  main: 'main',
  inverted: 'inverted',
  disabled: 'disabled',
  warning: 'warning',
  green: 'green',
  red: 'red',
};

const BUTTON_TYPE_CLASSES = {
  main: 'bg-neutral-800 text-purple-400 hover:bg-purple-400 hover:text-neutral-800',
  inverted:
    'bg-purple-400 text-neutral-800 hover:bg-neutral-800 hover:text-purple-400',
  disabled: 'bg-neutral-800 text-purple-400 opacity-50',
  warning:
    'bg-red-400 text-neutral-800 hover:bg-neutral-800 mt-60 hover:text-red-400',
  green:
    'hover:bg-green-400 hover:text-neutral-800 bg-neutral-800 text-green-400',
  red: 'hover:bg-red-400 hover:text-neutral-800 bg-neutral-800 text-red-400',
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
