import { useRef } from "react";

type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function MakeOfferModal({ isModalOpen, setIsModalOpen }: Props) {
  const offerPriceRef = useRef<HTMLInputElement>(null);

  async function handleMakeOffer() {
    if (offerPriceRef.current !== null) {
      const BASE_URL: string = import.meta.env.VITE_BASE_BACKEND_URL;
      const endPoint = `api/listings?page=${currentPage}`;
      const url = new URL(endPoint, BASE_URL);
      try {
        const response = await fetch("");
        console.log(response);
      } catch (err) {
      } finally {
      }
    }
  }

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#2A2A2A] rounded-xl shadow-2xl p-6 flex flex-col gap-3 animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-semibold text-white text-center">
          Make Offer
        </h2>
        <p className="text-[#A1A1A1] leading-relaxed">
          Enter the price you want to make an offer with:
        </p>
        <form>
          <input
            type="number"
            ref={offerPriceRef}
            placeholder="Enter the price"
            className="price-input w-full pl-4 pr-4 py-2 rounded-md 
            border border-[#2A2A2A] bg-[#1A1A1A] text-[#E5E5E5] placeholder:text-[#A1A1A1] appearance-none focus:outline-none focus:ring-0"
          />
        </form>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              handleMakeOffer();
              setIsModalOpen(false);
            }}
            className="flex-1 px-4 py-2.5 rounded-lg bg-[#2ACFCF] text-[#0A0A0A] hover:bg-[#26BABA] active:scale-[0.98] transition-all duration-200 cursor-pointer font-semibold"
          >
            Confirm
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="flex-1 px-4 py-2.5 border rounded-lg bg-[#1A1A1A] text-[#E5E5E5] border-[#2A2A2A] hover:bg-[#222222] hover:border-[#3A3A3A] transition-all duration-200 cursor-pointer font-medium"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default MakeOfferModal;
