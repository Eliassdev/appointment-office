import axios from 'axios';
import React from 'react';
import { useFetchStylistQuery } from '../../redux/modular/api/orgSlice';

const StylistTable = () => {
  const { data: stylists = [], isLoading } = useFetchStylistQuery();
  console.log(stylists);

  return (
    <div>StylistTable
        <table>
            <thead>
                <tr>
                    <td>Nombre</td>
                    <td>Address</td>
                    <td>City</td>
                    <td>Country</td>
                    <td>Gender</td>
                    {/* <td></td>
                    <td></td>
                    <td></td> */}
                    <td>Marital Status</td>
                </tr>
            </thead>
            <tbody>
                  {stylists.map((sti) => {
                    console.log(sti)
                    return(

                        <tr>
                        <td>{sti.stylist_firstname} </td>
                        <td>{sti.address} </td>
                        <td>{sti.city} </td>
                        <td>{sti.country} </td>
                        <td>{sti.gender} </td>
                        {/* <td>{sti.is_active} </td> */}
                        {/* <td>{sti.latitude} </td>
                        <td>{sti.longitude} </td> */}
                        <td>{sti.marital_status} </td>
                        <button type='submit'>Upgrade </button>
                        <button type='reset'>Delete </button>
                    </tr>
                    )       
                })}
            </tbody>
                
                
            
        </table>
    </div>
  );
};

export default StylistTable;
