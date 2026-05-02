type Props = {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onConfirm: () => void;
  heading: string;
  message: string;
};

function ConfirmationModal({
  isModalOpen,
  setIsModalOpen,
  onConfirm,
  heading,
  message,
}: Props) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="w-full max-w-md bg-[#111111] border border-[#2A2A2A] rounded-xl shadow-2xl p-6 flex flex-col gap-4 animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-semibold text-white">{heading}</h2>
        <p className="text-[#A1A1A1] leading-relaxed">{message}</p>

        <div className="flex gap-3 mt-4">
          <button
            onClick={() => {
              onConfirm();
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

export default ConfirmationModal;
