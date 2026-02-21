interface ListingCardProps {
  title: string;
  price: number;
  imageUrl: string;
}

function ListingCard({
  title = "Sample title",
  price = 0.99,
  imageUrl = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2F474x%2F9e%2F83%2F75%2F9e837528f01cf3f42119c5aeeed1b336.jpg%3Fnii%3Dt&f=1&nofb=1&ipt=2c20d3aa05ceab608416a76afd8dc6216bb751e9ffa1070903d355b82338b10d",
}: ListingCardProps) {
  return (
    <>
      <div className="bg-[#111111] border border-[#2A2A2A] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
        <img
          src={imageUrl}
          alt="Listing"
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h2 className="text-[#E5E5E5] text-lg font-semibold mb-2">{title}</h2>
          <p className="text-[#A1A1A1] mb-4">${price}</p>
          <div className="flex justify-end">
            <button className="bg-[#2ACFCF] text-[#111111] px-4 py-2 rounded hover:bg-[#26BABA] transition-colors duration-300 cursor-pointer">
              Read More
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ListingCard;

