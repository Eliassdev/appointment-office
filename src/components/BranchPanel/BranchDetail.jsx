import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetBranchByIdQuery } from '../../redux/modular/api/orgSlice'
import CreationNav from '../CreationNav/CreationNav'

export const BranchDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: bra = {}, isLoading, isSuccess } = useGetBranchByIdQuery(id)
  return (
    <div className="flex h-screen w-full bg-neutral-800 px-12">
      <CreationNav />
      <div className="ml-56  w-full py-8 px-12">
        <p className="mt-6 text-3xl text-purple-500">
          Detalles de la sucursal{' '}
          <span className="text-amber-500 underline underline-offset-8">
            {bra.branch_name}
          </span>
        </p>
        <h4 className="mt-6 text-lg text-amber-500">Nombre de Sucursal</h4>
        <p className="text-md mt-1 text-white">{bra.branch_name}</p>
        <h4 className="mt-2 text-lg text-amber-500">Direccion</h4>
        <p className="text-md mt-1 text-white">{bra.address}</p>
        <h4 className="mt-2 text-lg text-amber-500">Referencia</h4>
        <p className="text-md mt-1 text-white">{bra.address_references}</p>
        <h4 className="mt-2 text-lg text-amber-500">Ciudad</h4>
        <p className="text-md mt-1 text-white">{bra.city}</p>
        <h4 className="mt-2 text-lg text-amber-500">Provincia</h4>
        <p className="text-md mt-1 text-white">{bra.state}</p>
        <h4 className="mt-2 text-lg text-amber-500">Pais</h4>
        <p className="text-md mt-1 text-white">{bra.country}</p>
        <h4 className="mt-2 text-lg text-amber-500">Codigo Postal</h4>
        <p className="text-md mt-1 text-white">{bra.postal_code}</p>
        <h4 className="mt-2 text-lg text-amber-500">Telefono</h4>
        <p className="text-md mt-1 text-white">{bra.business_phone}</p>
        <h4 className="mt-2 text-lg text-amber-500">E-mail</h4>
        <p className="text-md mt-1 text-white">{bra.email}</p>
        <div className="mt-5 flex flex-row justify-start space-x-5">
          <button
            onClick={() => {
              navigate(`/dashboard/branch/update/${id}`)
            }}
            className="rounded-full border border-purple-600 px-4 py-2 text-purple-600"
          >
            Editar
          </button>
          <button
            onClick={() => {
              navigate('/dashboard/branches')
            }}
            className="rounded-full border border-purple-600 px-4 py-2 text-purple-600"
          >
            Regresar
          </button>
        </div>
      </div>
    </div>
  )
}
