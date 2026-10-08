import Image from "next/image";
import Link from "next/link";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import CartBtn from "../buttons/CartBtn";

export default function ProductCard({ product }) {
  const { _id, title, image, price, discount, reviews, ratings, sold } =
    product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="card bg-base-100 border border-base-200 shadow-sm hover:shadow-md transition-shadow duration-300">
      {/* Product Image */}
      <figure className="relative aspect-square overflow-hidden bg-base-200">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Discount Badge */}
        {discount > 0 && (
          <span className="badge badge-primary absolute top-3 left-3">
            -{discount}%
          </span>
        )}
      </figure>

      {/* Product Content */}
      <div className="card-body p-4">
        <h2 className="card-title text-base line-clamp-2 min-h-12">{title}</h2>

        {/* Rating & Reviews */}
        <div className="flex items-center gap-2 text-sm">
          <div className="flex items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
              if (ratings >= star) {
                return <FaStar key={star} className="text-warning" />;
              }

              if (ratings >= star - 0.5) {
                return <FaStarHalfAlt key={star} className="text-warning" />;
              }

              return <FaStar key={star} className="text-base-content/20" />;
            })}

            <span className="font-medium ml-1">{ratings}</span>
          </div>

          <span className="text-base-content/60">({reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex flex-wrap items-end justify-between gap-3">
          {/* Price */}
          <div className="flex min-w-0 items-end gap-2">
            <span className="flex items-center gap-0.5 text-xl font-bold leading-none text-primary sm:text-2xl">
              <FaBangladeshiTakaSign className="text-base sm:text-lg" />
              {discountedPrice.toFixed(0)}
            </span>

            {discount > 0 && (
              <span className="flex items-center gap-0.5 pb-0.5 text-xs font-medium text-base-content/50 line-through sm:text-sm">
                <FaBangladeshiTakaSign className="text-[10px] sm:text-xs" />
                {price}
              </span>
            )}

            {discount > 0 && (
              <span className="rounded-full bg-error/10 px-2 py-0.5 text-[10px] font-semibold text-error sm:text-xs">
                -{discount}%
              </span>
            )}
          </div>

          {/* Sold */}
          <div className="shrink-0">
            <span className="rounded-full bg-base-200 px-2.5 py-1 text-xs font-medium text-base-content/70 sm:text-sm">
              <span className="font-semibold text-primary">{sold}</span> sold
            </span>
          </div>
        </div>

        <div className="space-y-4">
          {/* Add to Cart */}
          <CartBtn product={{ ...product, _id: _id.toString() }}></CartBtn>

          <Link href={`/products/${_id.toString()}`}>
            <button className="btn btn-primary btn-outline w-full">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
