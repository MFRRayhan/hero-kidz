import { getSingleProduct } from "@/actions/server/product";
import Image from "next/image";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { FaBangladeshiTakaSign } from "react-icons/fa6";
import { IoCartOutline } from "react-icons/io5";

const SITE_URL = "https://hero-kidz-indol.vercel.app";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const product = await getSingleProduct(id);

  if (!product) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found.",
    };
  }

  const description =
    product.description?.slice(0, 160) ||
    `Explore ${product.title} at Hero Kidz.`;

  return {
    title: product.title,

    description,

    alternates: {
      canonical: `/products/${id}`,
    },

    openGraph: {
      type: "website",
      url: `${SITE_URL}/products/${id}`,
      siteName: "Hero Kidz",

      title: `${product.title} | Hero Kidz`,
      description,

      images: [
        {
          url: product.image,
          alt: product.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",

      title: `${product.title} | Hero Kidz`,
      description,

      images: [product.image],
    },

    robots: {
      index: true,
      follow: true,

      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
      },
    },
  };
}

export default async function ProductDetails({ params }) {
  const { id } = await params;

  const product = await getSingleProduct(id);

  if (!product) {
    return (
      <section className="py-20 text-center">
        <h1 className="text-3xl font-bold">Product Not Found</h1>

        <p className="mt-3 text-base-content/60">
          The product you are looking for does not exist.
        </p>
      </section>
    );
  }

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
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* Product Image */}
        <div className="overflow-hidden rounded-2xl bg-base-200">
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
          <h1 className="text-3xl font-bold md:text-4xl">{title}</h1>

          {/* Rating */}
          <div className="mt-4 flex items-center gap-3">
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
          <div className="mt-6 flex items-center gap-3">
            <span className="flex items-center gap-1 text-3xl font-bold text-primary">
              <FaBangladeshiTakaSign />

              {discountedPrice.toFixed(0)}
            </span>

            {discount > 0 && (
              <>
                <span className="flex items-center gap-1 text-lg text-base-content/50 line-through">
                  <FaBangladeshiTakaSign />

                  {price}
                </span>

                <span className="badge badge-primary">-{discount}%</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="mb-2 text-xl font-semibold">Description</h2>

            <p className="whitespace-pre-line leading-7 text-base-content/70">
              {description}
            </p>
          </div>

          {/* Product Info */}
          <div className="mt-6">
            <h2 className="mb-3 text-xl font-semibold">Product Information</h2>

            <ul className="space-y-2">
              {info?.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="mt-1 text-primary">✓</span>

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
