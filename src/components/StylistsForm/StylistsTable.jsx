import axios from 'axios';
import React from 'react';
import { useGetStylistQuery } from '../../redux/modular/api/stylists.slice.js';


const StylistTable = () => {
  const { data: stylists = [], isLoading } = useGetStylistQuery();
  console.log(stylists);

  return (
    <div className="flex h-full w-full px-12 py-8">
      <div class="pb-25 h-full w-full bg-neutral-900 px-8 pb-20 pt-2 text-center">
        <h1 className="mb-2 mt-4 font-serif text-3xl uppercase text-purple-600">
          StylistTable
        </h1>
        <div className="flex h-full w-full flex-col overflow-hidden rounded-t-lg bg-neutral-800">
          <table className="border-colapse w-full table-auto  bg-neutral-700">
            <thead className="w-full bg-amber-500 text-left text-white">
              <tr>
                <th className=" px-2 py-2 text-lg">Name</th>
                <th className=" px-2 py-2 text-lg">Address</th>
                <th className=" px-2 py-2 text-lg">City</th>
                <th className=" px-2 py-2 text-lg">State</th>
                <th className=" px-2 py-2 text-lg">Country</th>
                <th className=" px-2 py-2 text-lg">Gender</th>
                <th className=" px-2 py-2 text-lg">Email</th>
                <th className=" px-2 py-2 text-lg">Edit</th>
                <td className="text-center">Detalles</td>
                <td className="text-center">Editar</td>
                <td className="text-center">Eliminar</td>
              </tr>
            </thead>

            <tbody className="text-left">
              {stylists?.map((sti) => {
                console.log(sti);
                return (
                  <tr class="... border border-slate-300">
                    <td className="  px-2 py-1 text-white">
                      {sti.stylist_firstname}{' '}
                    </td>
                    <td className="  px-2 py-1 text-white">
                      {sti.address}{' '}
                    </td>
                    <td className="  px-2 py-1 text-white">
                      {sti.city}{' '}
                    </td>
                    <td className="  px-2 py-1 text-white">
                      {sti.state}{' '}
                    </td>
                    <td className="  px-2 py-1 text-white">
                      {sti.country}{' '}
                    </td>
                    <td className="  px-2 py-1 text-white">
                      {sti.gender}{' '}
                    </td>
                    <td className="  px-2 py-1 text-white">
                      {sti.email}{' '}
                    </td>
                    <td className=" px-2 py-1 text-center text-white">
                      <button
                        className="rounded-full bg-neutral-800 px-2 py-1"
                        onClick={() => {
                          navigate(`/dashboard/stylist/${sti.stylist_id}`);
                        }}
                      >
                        Ver detalles
                      </button>
                    </td>
                    <td className=" px-2 py-1 text-center text-white">
                      <button className="rounded-full bg-purple-600 px-2 py-1"
                      onClick={() => {
                        navigate(`/dashboard/stylist/update/${sti.stylist_id}`);
                      }}>
                        Editar
                      </button>
                    </td>
                    <td className=" px-2 py-1 text-center text-white">
                      <button
                        className="rounded-full bg-red-700 px-2 py-1"
                        onClick={() => {
                          navigate(
                            `/dashboard/stylist/delete/${sti.stylist_id}`
                          );
                        }}
                      >
                        Eliminar
                      </button>
                    </td>
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
      </div>
    </div>
  );
};

export default StylistTable;
