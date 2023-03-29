import React from 'react';

function DetailElement({ title, value }) {
  return (
    <div>
      <h4 className="mt-6 text-lg text-amber-500">{title}</h4>
      <p className="text-md mt-1 text-white">{value}</p>
    </div>
  );
}

export default DetailElement;
