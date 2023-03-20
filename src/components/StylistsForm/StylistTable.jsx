import axios from 'axios';
import React from 'react';
import { useFetchStylistQuery } from '../../redux/modular/api/orgSlice';

const StylistTable = () => {
  const { data: stylists = [], isLoading } = useFetchStylistQuery();
  console.log(stylists);

  return (
    <div>
      StylistTable
      <table>
        <thead>
          <tr>
            <td>sti.address</td>
            <td>sti.city</td>
            <td>sti.country</td>
            <td>sti.gender</td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {stylists?.map((sti) => {
            console.log(sti);
            return (
              <tr>
                <td>{sti.stylist_firstname} </td>
                <td>{sti.address} </td>
                <td>{sti.city} </td>
                <td>{sti.country} </td>
                <td>{sti.gender} </td>
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
