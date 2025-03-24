/* eslint-disable no-unused-vars */
import React from 'react'
import { useContext } from 'react'
import { useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { assets } from '../../assets/assets'
import { AppContext } from '../../context/AppContext'




const Dashboard = () => {
  const {aToken , getDashData , cancelAppointment , dashData} = useContext(AdminContext)
  const {slotDateFormat} = useContext(AppContext)
useEffect(()=>{
  if(aToken){
    getDashData()
  }

},[aToken])
  return dashData &&(
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.doctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointment_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>

        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashData.patient}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>

      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border '>
         <img src={assets.list_icon} alt="" />
         <p className='font-semibold'>Latest Booking</p>
        </div>
        <div className='pt-4 border border-t-0'>
          {
            dashData.latestAppointments.map((item , index)=>(
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
               <img className='rounded-full w-10' src={item.docData.image} alt="" />
               <div className='flex-1 text-sm'>
                <p className='text-gray-800 font-medium'>{item.docData.name}</p>
                <p className='text-gray-800'>{slotDateFormat(item.slotDate)}</p>
               </div>
               
              {item.cancelled ? <p className='text-red-500 font-medium text-xs'>Cancelled</p> : <button onClick={()=>cancelAppointment(item._id)} className='bg-red-500 text-white rounded-lg py-1 px-3 text-xs hover:bg-red-600 transition-all duration-200'>
                Cancel
              </button> }
              
              </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Dashboard
