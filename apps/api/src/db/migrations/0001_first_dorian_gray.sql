CREATE TABLE "offers" (
	"offer_id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"purposed_by" uuid,
	"listing_id" uuid NOT NULL,
	"chat_id" uuid NOT NULL,
	"status" "status" NOT NULL,
	"price" integer NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"expire_at" timestamp NOT NULL,
	CONSTRAINT "price_check" CHECK ("offers"."price" > 0)
);
--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_purposed_by_users_user_id_fk" FOREIGN KEY ("purposed_by") REFERENCES "public"."users"("user_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_listing_id_listings_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listings"("listing_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "offers" ADD CONSTRAINT "offers_chat_id_chats_chat_id_fk" FOREIGN KEY ("chat_id") REFERENCES "public"."chats"("chat_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_pending_offer_idx" ON "offers" USING btree ("chat_id","listing_id") WHERE "offers"."status" = 'pending';