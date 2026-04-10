import { useEffect, useState } from "react";
import ListingCard from "../components/ListingCard";
import { useSearchParams } from "react-router-dom";

type authorInfo = {
  userId: number;
  username: string;
  email: string;
};

type ListingData = {
  listingId: number;
  title: string;
  description: string | null;
  price: number;
  isSold: boolean;
  authorId: number;
  imageUrls: string[];
  authorInfo: authorInfo;
};

function Listings() {
  const [listings, setListings] = useState<ListingData[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [pageHeading, setPageHeading] = useState("All listings");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const fetchListings = async () => {
      setLoading(true);
      const category = searchParams.get("category");
      const search = searchParams.get("search");

      const url = new URL(`http://localhost:8080/api/listings`);
      if (category) {
        url.searchParams.append("category", category);
        setPageHeading(
          `${category.charAt(0).toUpperCase() + category.slice(1)}`,
        );
      }
      if (search) {
        url.searchParams.append("search", search);
        setPageHeading(`Results for: ${search}`);
      }
      if (!category && !search) {
        setPageHeading("All listings");
      }
      try {
        const response = await fetch(url.toString());
        const result = await response.json();
        setListings(result.data || null);
      } catch (error) {
        console.error("Failed to load listings", error);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, [searchParams]);

  if (loading) {
    return <div className="p-8 text-[#A1A1A1]">Loading listing details...</div>;
  }

  if (!listings) {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-5 text-[#E5E5E5]">All listings</h1>
        <div className="text-[#A1A1A1]">No listings found.</div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-5 text-[#E5E5E5]">{pageHeading}</h1>
      {listings.length === 0 ? (
        <div className="text-[#A1A1A1]">No listings found.</div>
      ) : (
        <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <ListingCard
              key={listing.listingId}
              listingId={listing.listingId}
              title={listing.title}
              description={listing.description}
              price={listing.price}
              authorId={listing.authorId}
              imageUrl={listing.imageUrls}
              authorName={listing.authorInfo.username}
            />
          ))}
        </section>
      )}
    </div>
  );
}

export default Listings;
