import '../../css/helper.css';
import { useApi} from "../../data/api";
import {  useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import { AuthContext } from '../../contexts/AuthContext';
import { IuserAPI } from '../../types/types';
import React from 'react';

function CreateUser() {
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const navegat = useNavigate()
  const auth = useContext(AuthContext)
  const [user, ] = useState<IuserAPI|null>(auth.user);
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [access, setAccess] = useState<string>('User');
  const [erro, setErro] = useState(false)

 async function createNewUser(){
  if (!user) {
    setErro(true)    
  } else{
 const resp = await api.createUser({
    name: name,
    password: password,
    access: access,
    group_member:user.group_member
  }).catch(onrejected => {console.log("descrição do erro", onrejected);
   setErro(onrejected.request.response)});
  console.log("create user resp", resp)
  resp && navegat('/user/')
  }
}
  return (
    <div className="p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className=" flex items-center justify-around gap-6 p-3">
        <button
          onClick={() => navegat('/user/control')}
          className='start px-6 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-6 py-2 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-green-400'
          onClick={createNewUser}
        >
          Add User
        </button>
      </div>
      <div>
        <label className="flex flex-col items-start p-1 m-1 ">
          Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white p-2 shadow-bot m-2"
          />
        </label>

        <label className="flex flex-col items-start p-1 m-1 ">
          Password
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
          />
        </label>
        <label className="flex flex-col items-start p-1 m-1 ">
          Access

          <select
            value={access}
            onChange={(e) => setAccess(e.target.value)}
            className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]">
            <option value="User">User</option>
            <option value={user?.access === "Adm"?"Adm":"User"}>{user?.access === "Adm"? "Adm": "Only Adm access"}</option>
          </select>
        </label>
        <p className="text-red-500 mt-2">{erro && erro} </p>
      </div>
    </div>
  );
}

export { CreateUser }
