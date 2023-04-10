import React from 'react';
import { ORGANIZATIONS_FORM_TYPE } from '../../components/Organizations/OrganizationsForm';

const InputElement = ({
  title,
  name,
  id,
  type,
  formType,
  value,
  onChange,
  onBlur,
  formik,
  required,
}) => {
  return (
    <div className="mb-2 flex flex-col px-4">
      <label className="mb-1 text-neutral-100" htmlFor="short_name">
        {title}
      </label>
      <input
        name={name}
        type={type}
        id={id}
        className="h-8 w-full rounded border-transparent bg-neutral-700  p-2 text-white outline-2 outline-transparent ring-2 ring-transparent focus:border-purple-500 focus:outline-purple-500 focus:ring-purple-500"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={formType === ORGANIZATIONS_FORM_TYPE.read}
      />
      {formik?.touched && formik?.errors ? (
        <span className="text-red-600">{formik.errors}</span>
      ) : null}
    </div>
  );
};

export default InputElement;
