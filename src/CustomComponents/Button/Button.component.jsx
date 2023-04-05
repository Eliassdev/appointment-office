export const BUTTON_TYPES = {
  main: 'main',
  inverted: 'inverted',
  disabled: 'disabled',
  warning: 'warning',
  green: 'green',
  red: 'red',
};

const BUTTON_TYPE_CLASSES = {
  main: 'bg-neutral-800 text-purple-400 hover:bg-purple-400 hover:text-neutral-800 active:bg-purple-300 active:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50',
  main_selected: 'outline-none ring-2 ring-purple-400 ring-opacity-50',
  inverted:
    'bg-purple-400 text-neutral-800 hover:bg-neutral-800 hover:text-purple-400 active:bg-purple-300 active:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50',
  inverted_selected: 'outline-none ring-2 ring-purple-400 ring-opacity-50',
  disabled: 'bg-neutral-800 text-purple-400 opacity-50',
  warning:
    'bg-red-400 text-neutral-800 hover:bg-neutral-800 hover:text-red-400 active:bg-red-300 active:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50',
  warning_selected: 'outline-none ring-2 ring-red-400 ring-opacity-50',
  green:
    'hover:bg-green-400 hover:text-neutral-800 bg-neutral-800 text-green-400 active:bg-green-300 active:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50',
  green_selected: 'outline-none ring-2 ring-green-400 ring-opacity-50',
  red: 'hover:bg-red-400 hover:text-neutral-800 bg-neutral-800 text-red-400 active:bg-red-300 active:text-neutral-800 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50',
  red_selected: 'outline-none ring-2 ring-red-400 ring-opacity-50',
};

const BUTTON_BASE_CLASS = 'h-12 m-2 cursor-pointer w-56 rounded-md';

const Button = ({
  children,
  buttonType,
  name,
  selectedButton,
  ...otherProps
}) => {
  return (
    <button
      className={`${BUTTON_BASE_CLASS} ${
        buttonType ? BUTTON_TYPE_CLASSES[buttonType] : BUTTON_TYPE_CLASSES.main
      } ${
        selectedButton === name
          ? BUTTON_TYPE_CLASSES[`${buttonType}_selected`]
          : ''
      }`}
      {...otherProps}
    >
      {children}
    </button>
  );
};

export default Button;
