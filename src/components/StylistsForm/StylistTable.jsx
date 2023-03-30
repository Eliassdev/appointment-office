import axios from 'axios';
import React from 'react';
import { useGetStylistQuery } from '../../redux/modular/api/stylists.slice.js';

const StylistTable = () => {
  const { data: stylists = [], isLoading } = useGetStylistQuery();
  console.log(stylists);

  return (
    <div class="text-center">
      <h1 class="mx-5 my-5 font-serif text-2xl text-fuchsia-400">
        StylistTable
      </h1>
      <table class="mx-6">
        <thead>
          <tr>
            <th class="border border-slate-300 text-neutral-50">Name</th>
            <th class="border border-slate-300 text-neutral-50">Address</th>
            <th class="border border-slate-300 text-neutral-50">City</th>
            <th class="border border-slate-300 text-neutral-50">State</th>
            <th class="border border-slate-300 text-neutral-50">Country</th>
            <th class="border border-slate-300 text-neutral-50">Gender</th>
            <th class="border border-slate-300 text-neutral-50">Email</th>
            <th class="border border-slate-300 text-neutral-50">Edit</th>
          </tr>
        </thead>

        <tbody>
          {stylists?.map((sti) => {
            console.log(sti);
            return (
              <tr class="... border border-slate-300">
                <td class="border border-slate-300 text-amber-500">
                  {sti.stylist_firstname}{' '}
                </td>
                <td class="border border-slate-300 text-amber-500">
                  {sti.address}{' '}
                </td>
                <td class="border border-slate-300 text-amber-500">
                  {sti.city}{' '}
                </td>
                <td class="border border-slate-300 text-amber-500">
                  {sti.state}{' '}
                </td>
                <td class="border border-slate-300 text-amber-500">
                  {sti.country}{' '}
                </td>
                <td class="border border-slate-300 text-amber-500">
                  {sti.gender}{' '}
                </td>
                <td class="border border-slate-300 text-amber-500">
                  {sti.email}{' '}
                </td>
                <button className="mx-2 text-sky-400" type="submit">
                  Upgrade
                </button>{' '}
                <button className="mx-2 text-red-400" type="reset">
                  Delete
                </button>
                {/* // <td>{sti} </td>
                        // <td>{sti} </td>
                        // <td>{sti} </td>
                        // <td>{sti} </td> */}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default StylistTable;
