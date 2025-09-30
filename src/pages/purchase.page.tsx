export default function PurchasePage() {
    return (
        <form action="" className="flex flex-col mt-18 max-w-md mx-auto">
            <label className="mx-auto mb-10 text-2xl font-bold"  htmlFor="purchase-input">PURCHASE PRICE</label>
            <input className="border px-8 py-2 mb-8 rounded-md text-center" id="purchase-input" type="text" placeholder="50$" />
            <button className="bg-black text-white px-8 py-2 rounded-md max-w-1/2 mx-auto" type="submit">Submit</button>
        </form>
    );
}