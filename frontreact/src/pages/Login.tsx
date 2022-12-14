import { useContext, useState } from 'react';
import '../css/helper.css';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import React from 'react';

function Login() {
  const auth = useContext(AuthContext);
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [erro, setErro] = useState<string>()
  const navegat = useNavigate();
  
  async function submit() {
    event?.preventDefault();
    await auth.login(name, password)
    .catch(onrejected =>{console.log("descrição do erro?",onrejected);
    setErro("Password or username incorrect")});
  }

  return (
    <div className="screen flex justify-center w-full h-screen">
      <div className=" flex justify-center pt-2 bg-white w-[90%] h-[85%]">
        <form className="flex flex-col items-center show w-[90%] h-[85%] ">
          <h2 className="self-center mt-5 justify-center text-[2rem]">Login</h2>
          <label className="flex flex-col mt-10 items-start p-1 m-1 ">
            Nome
            <input
              className="bg-white p-2 w-50 shadow-bot m-1"
              placeholder="Nome"
              required
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>
          <label className="flex flex-col mt-5 items-start p-1 m-1 ">
            Senha
            <input
              className="bg-white p-2 w-50 shadow-bot m-1"
              placeholder="Senha"
              required
              type="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </label>
          <p className="text-red-500">{erro && erro } </p>
          <button
            className='start px-8 py-2 mt-5 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-green-400'
            onClick={submit}
          >
            Submit
          </button>
          <button
          type='button'
            className='start px-4 py-2 mt-5 rounded-md text-2xl "border-gray-300 border-solid border-b-4 bg-sky-300'
           onClick={()=>navegat('/createGroup')}
          >
            Create Accont
          </button>
        </form>
      </div>
    </div>
  );
}

export { Login };
