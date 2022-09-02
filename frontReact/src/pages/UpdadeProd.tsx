import '../css/helper.css';
import { participants } from "../data/mock";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function UpdadeProd() {
  const navegat = useNavigate()
  const [page, setPage] = useState<boolean>(true)

  function toglePage() {
    setPage(!page)
  }
  function EndSession() {
    navegat('/')
  }
  function back() {
    navegat('/s')
  }

  function print() {
    return participants.map(p =>
      <div key={p.id + "p"} className="flex justify-between items-center shadow-bot">
        <p className='text-xl m-3 ml-5 '>{p.name}</p>
        <label className='mr-5'>
          <input
            className='m-2 h-5 w-5 text-fuchsia-400'
            type="checkbox"
          />
          Will Partcipate
        </label>
      </div>)
  }

  return (
    <div className="shadowScreen p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className=' flex items-center justify-center gap-6 p-3'>
        <button onClick={back} className='start px-2 py-2 rounded-md mt-3 text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300' >
          Back
        </button>
        <p className='flex text-3xl font-bold'>Updade Product</p>

      </div>
      <div className='felx  justify-around'>
        <label className='block text-lg' >
          Name   
          <input
            className='bg-white p-2 shadow-bot m-2'
            placeholder='Name Product '
          />
        </label>
        <label className=' block text-lg'>
          Value
          <input
            className='bg-white p-2 shadow-bot m-2 '
            placeholder='Value Product '
          />
        </label>
      </div>

      <div className='flex justify-evenly'>

      </div>
      <div className='show p-2 mt-4 h-[60%]'>
        {print()}
      </div>
      <div className='flex justify-around gap-2'>
        <button className='start px-2 py-2 rounded-md mt-3 text-3xl "border-gray-300 border-solid border-b-4 bg-green-400' onClick={EndSession} >
          Create
        </button>
        <button className='start px-2 py-2 rounded-md mt-3 text-3xl "border-gray-300 border-solid border-b-4 bg-blue-400' onClick={EndSession} >
          Update
        </button>
        <button className='start px-2 py-2 rounded-md mt-3 text-3xl "border-gray-300 border-solid border-b-4 bg-red-400' onClick={EndSession} >
          Delete
        </button>
      </div>
    </div>
  );
}

export { UpdadeProd };
