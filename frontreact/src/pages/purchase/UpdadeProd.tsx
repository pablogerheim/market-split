import '../../css/helper.css';
import { useApi } from '../../data/api';
import { Iparticipant } from '../../types/types';
import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import EventBus from '../../helper/EventBus';
import { v4 } from 'uuid'
import React from 'react';
import { AuthContext } from '../../contexts/AuthContext';

function UpdadeProd() {
  const navegat = useNavigate();
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const auth = useContext(AuthContext)
  const [participants, setParticipants] = useState<Iparticipant[]>([]);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('');
  const [part, setPart] = useState<string[]>([]);
  const [erro, setErro] = useState<string>()
  const [user] = useState(auth.user)
  const [purchase] = useState(auth.purchase)

  useEffect(() => {
    if (user) {
      const fetchUser = async () => setParticipants(await api.getUser(user.group_member).catch(onrejected =>
        console.log("descrição do erro", onrejected)));
      EventBus.on('setId', async (id) => {
        let prod = await api.getbyid(id)
        setId(id)
        setName(prod?.name)
        setPrice(prod?.price)
        setQuantity(prod?.quantity)
        setPart(prod?.participants.split(','))
      });
      fetchUser();
    }
  }, []);

  useEffect(() => {
    EventBus.remove('setId', () => { });
  }, []);

  const updateProd = async () => {
    if (purchase) {
      const resp = await api.updateProduct({
        productId: id,
        name: name,
        price: price,
        participants: part.toString(),
        quantity: quantity,
        purchase: purchase.purchaseId
      }).catch(onrejected =>
        console.log("descrição do erro", onrejected));
      resp && navegat('/session');
    } else { setErro("User missing please login") }
  }

  const handlePart = (p: string) => {
    part.includes(p) ? setPart(part.filter(e => e !== p)) : setPart([...part, p])
  }

  if (!participants) { return <p>Loading...</p> }

  return (
    <div className="p-5 bg-white mt-1 w-[90%] border-8 ">
      <div className=" flex items-center justify-center gap-6 p-3">
        <button
          onClick={() => navegat('/session')}
          className='start px-4 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-orange-300'
        >
          <BiArrowBack />
        </button>
        <button
          className='start px-2 py-2 rounded-md text-3xl "border-gray-300 border-solid border-b-4 bg-blue-400'
          onClick={updateProd}
        >
          Update Product
        </button>
      </div>
      <div>
        <label className="flex flex-col items-start p-1 m-1 ">
          Product Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-white p-2 shadow-bot m-2"
          />
        </label>
        <div className="flex justify-around">
          <label className="flex flex-col items-start p-1 m-1 w-[45%]">
            Product Price
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
            />
          </label>
          <label className="flex flex-col items-start p-1 m-1 w-[45%]">
            Number Prod
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="bg-white p-2 shadow-bot m-2 mt-3 w-[80%]"
            />
          </label>
        </div>
      </div>
      <div className="flex justify-evenly"></div>
      <div className="p-2">
        {participants.length === 0 && <p>Loading...</p>}
        {participants.map(p =>
          <div
            key={v4()}
            className="flex justify-between items-center shadow-bot"
          >
            <p className="text-xl m-3 ml-5 ">{p.name}</p>
            <label className="mr-5">
              <input
                className="m-2 h-5 w-5 text-fuchsia-400"
                type="checkbox"
                checked={part.includes(p.name)}
                onChange={() => handlePart(p.name)}
              />
              Will Partcipate
            </label>
          </div>
        )}
      </div>
      <p className="text-red-500 mt-2">{erro && erro} </p>
    </div>
  );
}

export { UpdadeProd };
