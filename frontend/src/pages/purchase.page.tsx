import { useMutation } from "@tanstack/react-query";
import { orpc } from "../utils/orpc";
import { authClient } from "../lib/auth-client";
import { useState } from "react";

export default function PurchasePage() {
  const [newPurchase, setNewPurchase] = useState(0);


const { data } = authClient.useSession();

  const purchaseCreateMutation = useMutation(orpc.purchase.create.mutationOptions({
      onSuccess: () => {
        
      }
    }));
  
  const handlePurchase = async (e: React.FormEvent) => {
    e.preventDefault();
      if (!data?.user) return;
  
      purchaseCreateMutation.mutate({
        value: newPurchase,
        userId: data.user.id,
      });
    }


  return (
    <>
      <form onSubmit={handlePurchase} className="flex flex-col mt-18 max-w-md mx-auto">
        <label className="mx-auto mb-10 text-2xl font-bold" htmlFor="purchase-input">PURCHASE PRICE</label>
        <input onChange={(e) => setNewPurchase(Number(e.target.value))} className="border px-8 py-2 mb-8 rounded-md text-center" id="purchase-input" type="text" placeholder="50$" />
        <button className="bg-black text-white px-8 py-2 rounded-md max-w-1/2 mx-auto" type="submit">Submit</button>
      </form>
    </>
  )
}
