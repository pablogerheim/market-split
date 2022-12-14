import { useContext, useEffect, useState } from 'react';
import { useApi} from '../data/api';
import { Iparticipant, IproductReq } from "../types/types";
import { isEquivalent } from "../helper/helperFunctions";
import { v4 } from 'uuid';
import { AuthContext } from '../contexts/AuthContext';
import React from 'react';

function People() {
  const token = localStorage.getItem('authToken')
  const api = useApi(token?.toString())
  const auth = useContext(AuthContext)
  const [products, setProduct] = useState<IproductReq[]>([])
  const [participants, setParticipants] = useState<Iparticipant[]>([])
  const [user]= useState(auth.user)
  const [loading, setLoading] = useState<Boolean>(true)

  useEffect(() => {
    if(user){
    const fetchUser = async () => setParticipants(await api.getUser(user.group_member).catch(onrejected => 
      console.log("descrição do erro", onrejected)));
    fetchUser();
    fetchProduct();
    activeMembers();}
  }, [])

  useEffect(() => {
    (async () => {
      if (auth.purchase !== null && auth.purchase.purchaseId !== undefined) {
        const helper = await api.getProduct(auth.purchase.purchaseId).catch(onrejected => 
          console.log("descrição do erro", onrejected))
        if (isEquivalent(products, helper) ) { fetchProduct() }
      };
    })()
  });

  const fetchProduct = async () => {
    if (auth.purchase !== null && auth.purchase.purchaseId !== undefined) {
      let data = await api.getProduct(auth.purchase.purchaseId).catch(onrejected => 
        console.log("descrição do erro", onrejected))
      data && setLoading(false)
      setProduct(data.map((p:any) =>{ p.participants = p.participants.split(','); return p}))
    }
  }
  const findTotal = () => products.reduce((pv, cv) => pv + parseInt(cv.price) * parseInt(cv.quantity), 0).toFixed(2).replace('.', ',')
  const activeMembers = () => {
    let arrMembers: string[] = []
    products.forEach(prod => prod.participants.forEach(name => {
      if (!arrMembers.includes(name)) {
        arrMembers.push(name)
      }
    }))
    return arrMembers.length
  }

  const findHowMuchEachToPay = (name: string) => {
    return products
      .map(p =>
        p.participants.includes(name)
          ? (parseInt(p.price) * parseInt(p.quantity)) / p.participants.length
          : 0,
      )
      .reduce((pv, cv) => pv + cv, 0).toFixed(2).replace('.', ',')
  }

  if (loading) return <p>Loading...</p>
  return (
    <div>
      <div className="grid grid-cols-2 gap-1 mt-1 ">
        <p className="text-xl m-2 p-2 show-sm">
          Participants: {activeMembers()}
        </p>
        <p className="text-xl m-2 p-2 show-sm">
          Total: R${findTotal()}
        </p>
      </div>
      {participants.map(p => {
        if (parseInt(findHowMuchEachToPay(p.name)) > 0) {
          return (
            <div key={v4()} className="flex justify-between shadow-bot">
              <p className="text-xl m-3 ">{p.name}</p>
              <p className="text-xl m-3 border-l-2 border-solid border-gray-400 pl-2">
                R$: {findHowMuchEachToPay(p.name)}
              </p>
            </div>)
        }
      })}
    </div>
  );
}

export { People };
