import { getSingleProduct } from "@/actions/server/product";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

export default async function ProductDetails({ params }) {
  const id = await params;
  const product = await getSingleProduct(id);

  const {
    title,
    image,
    price,
    discount,
    description,
    reviews,
    sold,
    ratings,
    info,
  } = product;

  const discountedPrice = price - (price * discount) / 100;

  return (
    <section className="py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Product Image */}
        <div className="bg-base-200 rounded-2xl overflow-hidden">
          <div className="relative aspect-square">
            <Image
              src={image}
              alt={title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold">{title}</h1>

          {/* Rating */}
          <div className="flex items-center gap-3 mt-4">
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
            </div>

            <span className="font-medium">{ratings}</span>

            <span className="text-base-content/60">({reviews} reviews)</span>

            <span className="text-base-content/60">{sold} sold</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-3 mt-6">
            <span className="text-3xl flex items-center gap-1 font-bold text-primary">
              <FaBangladeshiTakaSign />
              {discountedPrice.toFixed(0)}
            </span>

            {discount > 0 && (
              <>
                <span className="text-lg  flex items-center gap-1line-through text-base-content/50">
                  <FaBangladeshiTakaSign />
                  {price}
                </span>

                <span className="badge badge-primary">-{discount}%</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Description</h2>

            <p className="text-base-content/70 leading-7 whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Product Info */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-3">Product Information</h2>

            <ul className="space-y-2">
              {info?.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-primary mt-1">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Add to Cart */}
          <div className="mt-8">
            <button className="btn btn-primary btn-lg w-full sm:w-auto">
              <IoCartOutline className="text-2xl" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
