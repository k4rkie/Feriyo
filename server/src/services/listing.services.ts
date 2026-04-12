import { eq, ilike } from "drizzle-orm";
import { db } from "../db/db.js";
import { listingsTable } from "../db/schema.js";
import type {
  createListingInput,
  editListingInput,
} from "../validators/listings.validator.js";
import { getUserInfo } from "./auth.services.js";
import { NotFoundError, UnauthorizedError } from "../errors/index.js";

type authorInfo = {
  userId: string;
  username: string;
  email: string;
};

type listingsData = {
  listingId: string;
  title: string;
  description: string | null;
  status: string;
  price: number;
  authorId: string;
  imageUrls: string[];
};

type getListingsData = {
  listingId: string;
  title: string;
  description: string | null;
  price: number;
  status: string;
  authorId: string;
  imageUrls: string[];
  authorInfo: authorInfo;
};

type queryParams = {
  category: any;
  search: any;
};

const getListings = async (queryParams: queryParams) => {
  const { category, search } = queryParams;

  // console.log("Category:", category);
  // console.log("search:", search);
  //
  // console.log("Category type:", typeof category);
  // console.log("search type:", typeof search);
  //
  // if (category) console.log("Category exists");
  // if (search) console.log("Search exists");

  let listings: listingsData[];
  if (category) {
    listings = await db
      .select({
        listingId: listingsTable.listingId,
        title: listingsTable.title,
        description: listingsTable.description,
        price: listingsTable.price,
        status: listingsTable.status,
        authorId: listingsTable.authorId,
        imageUrls: listingsTable.imageUrls,
      })
      .from(listingsTable)
      .where(eq(listingsTable.category, category));
  } else if (search) {
    listings = await db
      .select({
        listingId: listingsTable.listingId,
        title: listingsTable.title,
        description: listingsTable.description,
        price: listingsTable.price,
        status: listingsTable.status,
        authorId: listingsTable.authorId,
        imageUrls: listingsTable.imageUrls,
      })
      .from(listingsTable)
      .where(ilike(listingsTable.title, `%${search}%`));
  } else {
    listings = await db
      .select({
        listingId: listingsTable.listingId,
        title: listingsTable.title,
        description: listingsTable.description,
        price: listingsTable.price,
        status: listingsTable.status,
        authorId: listingsTable.authorId,
        imageUrls: listingsTable.imageUrls,
      })
      .from(listingsTable);
  }

  let listingsWithUserInfo: getListingsData[] = [];
  async function attachAuthorInfo() {
    for (let listing of listings) {
      const authorInfo = await getUserInfo(listing.authorId);
      listingsWithUserInfo.push({ ...listing, authorInfo });
    }
  }
  await attachAuthorInfo();
  return listingsWithUserInfo;
};

const createListing = async (
  createListingData: createListingInput,
  userId: string,
) => {
  const {
    title,
    description,
    price,
    locationName,
    category,
    condition,
    listingImages,
  } = createListingData;

  const imageUrls = listingImages.map((image) => {
    return `/uploads/listings/images/${image.filename}`;
  });

  const [newListing] = await db
    .insert(listingsTable)
    .values({
      title,
      description,
      price,
      locationName,
      category,
      condition,
      authorId: userId,
      imageUrls,
    })
    .returning({
      title: listingsTable.title,
      description: listingsTable.description,
      price: listingsTable.price,
      location: listingsTable.locationName,
      status: listingsTable.status,
      category: listingsTable.category,
      condition: listingsTable.condition,
      imageUrls: listingsTable.imageUrls,
    });

  return newListing;
};

const getListingById = async (listingId: string) => {
  const [listing] = await db
    .select()
    .from(listingsTable)
    .where(eq(listingsTable.listingId, listingId));

  if (!listing) {
    throw new NotFoundError(
      `Cannot find a listing with the provided ID: ${listingId}`,
    );
  }

  const authorInfo = await getUserInfo(listing.authorId);
  const listingsWithUserInfo = { ...listing, authorInfo };
  return listingsWithUserInfo;
};

const editListing = async (
  editListingData: editListingInput,
  listingId: string,
  userId: string,
) => {
  const {
    title,
    description,
    price,
    locationName,
    category,
    condition,
    isSold,
    newListingImages,
    removedListingImages,
  } = editListingData;

  const [existingListing] = await db
    .select()
    .from(listingsTable)
    .where(eq(listingsTable.listingId, listingId))
    .limit(1);

  if (!existingListing) {
    throw new NotFoundError(
      `Cannot find a listing with the provided ID: ${listingId}`,
    );
  }

  if (existingListing.authorId !== userId) {
    throw new UnauthorizedError(`You are not allowed to edit this listing`);
  }

  let { imageUrls } = existingListing;

  for (let image of removedListingImages) {
    imageUrls = imageUrls.filter((url) => url !== image);
  }

  const newImageUrls = newListingImages.map((image) => {
    return `/uploads/listings/images/${image.filename}`;
  });

  imageUrls = [...imageUrls, ...newImageUrls];

  const status = isSold ? "sold" : "available";

  const [editedListing] = await db
    .update(listingsTable)
    .set({
      title,
      description,
      price,
      locationName,
      category,
      condition,
      status: status,
      authorId: userId,
      imageUrls,
      updatedAt: new Date(),
    })
    .where(eq(listingsTable.listingId, listingId))
    .returning({
      title: listingsTable.title,
      description: listingsTable.description,
      price: listingsTable.price,
      locationName: listingsTable.locationName,
      status: listingsTable.status,
      category: listingsTable.category,
      condition: listingsTable.condition,
      imageUrls: listingsTable.imageUrls,
    });

  return editedListing;
};

const deleteListing = async (listingId: string, userId: string) => {
  const [existingListing] = await db
    .select()
    .from(listingsTable)
    .where(eq(listingsTable.listingId, listingId))
    .limit(1);

  if (!existingListing) {
    throw new NotFoundError(
      `Cannot find a listing with the provided ID: ${listingId}`,
    );
  }

  if (existingListing.authorId !== userId) {
    throw new UnauthorizedError(`You are not allowed to delete this listing`);
  }

  await db.delete(listingsTable).where(eq(listingsTable.listingId, listingId));

  return true;
};

const myListings = async (userId: string) => {
  try {
    const myListings = await db
      .select()
      .from(listingsTable)
      .where(eq(listingsTable.authorId, userId));

    if (!myListings) {
      throw new NotFoundError(`You currently no active listings`);
    }
    return myListings;
  } catch (error) {
    throw new Error("Error while fetching my listings");
  }
};

export {
  getListings,
  createListing,
  getListingById,
  editListing,
  deleteListing,
  myListings,
};
