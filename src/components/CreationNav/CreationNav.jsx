import React from 'react';

const CreationNav = ({ setStep }) => {
  const options = [
    { name: 'overview', key: '1' },
    { name: 'branch', key: '2' },
    { name: 'stylist', key: '3' },
    { name: 'services', key: '4' },
  ];
  return (
    <div>
      {options.map((opt) => {
        return (
          <button
            onClick={() => {
              setStep(opt.name);
            }}
            key={opt.key}
          >
            {opt.name}
          </button>
        );
      })}
    </div>
  );
};

export default CreationNav;
