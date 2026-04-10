import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ChatBubbleBottomCenterTextIcon,
  BookmarkIcon as BookmarkOutline,
} from "@heroicons/react/24/outline";
import { BookmarkIcon as BookmarkSolid } from "@heroicons/react/24/solid";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

type AuthorInfo = {
  userId: number;
  username: string;
  email: string;
};

type ListingDetailData = {
  listingId: number;
  title: string;
  description: string | null;
  price: number;
  location: string;
  isSold: boolean;
  category: string;
  condition: string;
  imageUrls: string[];
  authorInfo: AuthorInfo;
  createdAt: Date;
  updatedAt: Date;
};

function ListingDetail() {
  const { listingId } = useParams();
  const [listing, setListing] = useState<ListingDetailData | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [isUserAuthor, setIsUserAuthor] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const auth = useAuth();
  const navigate = useNavigate();
  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(listing?.authorInfo.username ?? "User")}&background=4f46e5&color=fff&size=128`;

  const formatDate = (value: Date) =>
    new Date(value).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  useEffect(() => {
    if (!listingId) return;

    const fetchListing = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/listings/${listingId}`,
        );
        const result = await response.json();
        setListing(result.data || null);
        console.log(result.data);
      } catch (error) {
        console.error("Unable to load listing detail", error);
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [listingId]);

  useEffect(() => {
    if (auth.user && listing) {
      setIsUserAuthor(auth.user.userId === listing.authorInfo.userId);
    }
  }, [auth.user, listing]);

  if (loading) {
    return <div className="p-8 text-[#A1A1A1]">Loading listing details...</div>;
  }

  async function handleDelete() {
    try {
      const response = await fetch(
        `http://localhost:8080/api/listings/${listingId}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${auth.accessToken}`,
          },
        },
      );
      const result = await response.json();
      if (!response.ok) {
        return toast.error(`${result.error}`);
      }
      navigate("/listings");
      toast.success(`${result.message}`);
    } catch (error) {
      return toast.error("Something went wrong");
    }
  }

  if (!listing) {
    return (
      <div className="p-8 text-[#A1A1A1]">
        Listing not found.{" "}
        <Link to="/listings" className="text-[#2ACFCF] hover:text-[#26BABA]">
          Back to listings
        </Link>
      </div>
    );
  }
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold text-[#E5E5E5]">{listing.title}</h1>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
          {isUserAuthor ? (
            <div className="flex gap-2">
              <Link
                to={`/listings/edit/${listingId}`}
                className="px-4 py-1.5 rounded-md bg-[#2ACFCF] text-[#111111] text-sm font-medium hover:bg-[#26BABA] transition-colors"
              >
                Edit
              </Link>
              <button
                type="button"
                className="px-4 py-1.5 rounded-md bg-red-500 text-white text-sm font-medium hover:bg-red-600 transition-colors"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6">
        <div className="space-y-4">
          <div className="relative h-105 rounded-xl border border-[#2A2A2A] overflow-hidden">
            {listing.imageUrls.length > 0 ? (
              <div className="h-full w-full flex items-center justify-center bg-[#111111]">
                <img
                  src={`http://localhost:8080${listing.imageUrls[currentImageIdx]}`}
                  alt={`Listing image ${currentImageIdx + 1}`}
                  className="max-h-full max-w-full object-contain"
                />
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-[#A1A1A1]">
                No image available
              </div>
            )}

            {listing.imageUrls.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImageIdx(
                      (prev) =>
                        (prev - 1 + listing.imageUrls.length) %
                        listing.imageUrls.length,
                    )
                  }
                  className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white text-[18px] hover:bg-black/70 cursor-pointer"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImageIdx(
                      (prev) => (prev + 1) % listing.imageUrls.length,
                    )
                  }
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-black/50 text-white text-[18px] hover:bg-black/70 cursor-pointer"
                >
                  ›
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
                  {currentImageIdx + 1} / {listing.imageUrls.length}
                </div>
              </>
            )}
          </div>
          <div className="p-4 bg-[#111111] border border-[#2A2A2A] rounded-lg">
            <h2 className="text-2xl font-semibold text-[#E5E5E5] mb-3">
              Description
            </h2>
            <p className="text-[#A1A1A1] leading-relaxed">
              {listing.description ??
                "No description provided for this listing yet."}
            </p>
          </div>
        </div>

        <aside className="p-4 bg-[#111111] border border-[#2A2A2A] rounded-lg space-y-4">
          <div>
            <p className="text-3xl font-bold text-[#E5E5E5]">
              Rs.{listing.price}
            </p>
            <p className="text-[#A1A1A1] text-sm mt-[0.6rem]">Listed by :</p>
          </div>
          <Link
            to={`/profile/${listing.authorInfo.userId}`}
            className="flex items-center gap-3 p-3 mt-0 bg-[#181818] rounded-md hover:bg-[#222222] transition-all"
          >
            <img
              src={avatarUrl}
              className="h-12 w-12 rounded-full bg-[#2A2A2A] overflow-hidden border border-[#2A2A2A] flex items-center justify-center text-xs text-[#A1A1A1]"
            />
            <div>
              <p className="text-[#E5E5E5] font-semibold">
                {listing.authorInfo.username}
              </p>
              <p className="text-[#2ACFCF] text-xs">View seller profile</p>
            </div>
          </Link>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-md bg-[#181818] p-3">
              <p className="text-[#A1A1A1]">Category</p>
              <p className="text-[#E5E5E5] font-semibold">
                {listing.category.charAt(0).toUpperCase() +
                  listing.category.slice(1)}
              </p>
            </div>
            <div className="rounded-md bg-[#181818] p-3">
              <p className="text-[#A1A1A1]">Condition</p>
              <p className="text-[#E5E5E5] font-semibold">
                {listing.condition.charAt(0).toUpperCase() +
                  listing.condition.slice(1)}
              </p>
            </div>
            <div className="rounded-md bg-[#181818] p-3">
              <p className="text-[#A1A1A1]">Location</p>
              <p className="text-[#E5E5E5] font-semibold">{listing.location}</p>
            </div>
            <div className="rounded-md bg-[#181818] p-3">
              <p className="text-[#A1A1A1]">Status</p>
              <p className="text-[#E5E5E5] font-semibold">
                {listing.isSold ? "Sold" : "Available"}
              </p>
            </div>
          </div>

          {!isUserAuthor ? (
            <>
              <button className="flex justify-center gap-2 w-full px-4 py-2 rounded-md bg-[#2ACFCF] text-[#111111] hover:bg-[#26BABA] transition-colors duration-300">
                <ChatBubbleBottomCenterTextIcon className="w-6 h-6" />
                <span>Contact Seller</span>
              </button>

              <button
                className="flex justify-center gap-2 w-full px-4 py-2 border border-[#E5E5E5] rounded-md text-[#E5E5E5] hover:bg-[#E5E5E5] hover:text-[#111111] transition-colors duration-300 cursor-pointer"
                onClick={() => setIsSaved(!isSaved)}
              >
                {isSaved ? (
                  <BookmarkSolid className="w-6 h-6" />
                ) : (
                  <BookmarkOutline className="w-6 h-6" />
                )}
                <span>Save</span>
              </button>
            </>
          ) : (
            <div className="rounded-md bg-[#181818] p-3 space-y-3 text-sm">
              <div>
                <p className="text-[#A1A1A1]">Listed on</p>
                <p className="text-[#E5E5E5] font-semibold">
                  {formatDate(listing.createdAt)}
                </p>
              </div>
              <div>
                <p className="text-[#A1A1A1]">Last updated</p>
                <p className="text-[#E5E5E5] font-semibold">
                  {formatDate(listing.updatedAt)}
                </p>
              </div>
              <p className="text-xs text-[#6F767E]">
                You are the seller for this listing. Use Edit above to refresh
                details or mark it sold.
              </p>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

export default ListingDetail;
