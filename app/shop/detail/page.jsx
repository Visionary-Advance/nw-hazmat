'use client';

import { useRouter } from 'next/navigation';

// ProductCard component - simplified version
const ProductCard = ({ 
  id, 
  title, 
  description, 
  price, 
  image, 
  imageAlt, 
  onAddToCart, 
  className = '' 
}) => {
  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      <img 
        src={image} 
        alt={imageAlt} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2 text-black">{title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-xl text-black">{price}</span>
          <button
            onClick={() => onAddToCart(id)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductDetail = () => {
  const router = useRouter();

  // Main product data
  const product = {
    id: "stinger-assembly",
    title: "Stinger Assembly",
    price: "$1,275.00",
    description:
      "Used for transferring fuels from overturned tank truck. In order to off load an overturned gasoline/fuel tank truck, access is gained by drilling through the tank wall. Once complete, Stinger Assembly allows responders to safely transfer product from one vehicle to another. Our assembly includes 10' stinger, a sight glass to view the product, a 90° fitting, and vapor can. Made of aluminum, and not for corrosives.",
    image:
      "https://cdn.builder.io/api/v1/image/assets/TEMP/aae0fbf1c18519226400bfc1991aea8d092f4ac4?width=1224",
    weight: "20 lbs",
    dimensions: "18 × 18 × 18 in",
  };

  // Related products data
  const relatedProducts = [
    {
      id: "retract-a-clamp-1",
      title: "Retract-A-Clamp",
      price: "$124.00",
      description:
        "Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/23899bfd9993a8672c8a8f115f13a7845fa585f2?width=701",
    },
    {
      id: "retract-a-clamp-2",
      title: "Retract-A-Clamp",
      price: "$124.00",
      description:
        "Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/e34c4a4ba38a99b3e3d8ddb86be28f3ed11e3b65?width=701",
    },
    {
      id: "stinger-assembly-related",
      title: "Stinger Assembly",
      price: "$124.00",
      description:
        "Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/0f92a0c4525f0c8198601131505e89bc3ad09212?width=701",
    },
    {
      id: "ground-clamp",
      title: "REB2960 Ground Clamp",
      price: "$124.00",
      description:
        "Designed to quickly soak up oil, water, coolants, and other non-aggressive fluids",
      image:
        "https://cdn.builder.io/api/v1/image/assets/TEMP/ec1473bf3b2e922c81e812f2e1057d635e19479d?width=701",
    },
  ];

  const handleGoBack = () => {
    router.back();
  };

  const handleAddToCart = (productId) => {
    console.log("Adding to cart:", productId || product.id);
    // Implement add to cart logic here
  };

  const handleRelatedProductAddToCart = (productId) => {
    console.log("Adding related product to cart:", productId);
    // Implement add to cart logic here
  };

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Product Section */}
        <div className="flex flex-col lg:flex-row gap-8 mb-16">
          {/* Product Image */}
          <div className="flex-1 max-w-2xl">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover rounded-[15px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]"
            />
          </div>

          {/* Product Information */}
          <div className="flex-1 lg:pl-8">
            {/* Product Title */}
            <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-normal leading-normal text-black mb-8">
              {product.title}
            </h1>

            {/* Price Section */}
            <div className="mb-6">
              <h2 className="font-bold text-2xl md:text-4xl font-normal leading-normal text-black mb-2">
                Price:
              </h2>
              <p className="font-sans text-2xl md:text-4xl font-normal leading-normal text-black">
                {product.price}
              </p>
            </div>

            {/* Description Section */}
            <div className="mb-8">
              <h2 className="font-bold text-2xl md:text-4xl font-normal leading-normal text-black mb-4">
                Description:
              </h2>
              <p className="font-sans text-lg md:text-3xl font-normal leading-relaxed text-black">
                {product.description}
              </p>
            </div>

            {/* Additional Information */}
            {(product.weight || product.dimensions) && (
              <div className="mb-8">
                <h2 className="font-bold text-2xl md:text-4xl font-normal leading-normal text-black mb-4">
                  Additional Information:
                </h2>
                <div className="font-sans text-lg md:text-3xl font-normal leading-relaxed text-black">
                  {product.weight && <div>Weight: {product.weight}</div>}
                  {product.dimensions && (
                    <div>Dimensions: {product.dimensions}</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          <div className="w-full max-w-2xl h-[70px] bg-red-600 rounded-[20px] flex items-center justify-center">
            <button
              onClick={handleGoBack}
              className="bg-transparent hover:bg-red-700 text-white font-sans text-lg md:text-3xl font-bold p-0 w-full h-full rounded-[20px] transition-colors"
            >
              Go Back
            </button>
          </div>

          <div className="flex-1">
            <div className="h-[70px] bg-green-600 rounded-[20px] flex items-center relative">
              <button
                onClick={() => handleAddToCart()}
                className="flex-1 bg-transparent hover:bg-green-700 text-white font-sans text-lg md:text-3xl font-bold h-full rounded-[20px] mr-[61px] transition-colors"
              >
                Add to Cart
              </button>
              <div className="absolute right-0 w-[61px] h-[70px] bg-green-700 rounded-r-[20px] flex items-center justify-center">
                <svg
                  width="35"
                  height="35"
                  viewBox="0 0 35 35"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19.6875 12.0312C19.6875 11.7412 19.5723 11.463 19.3671 11.2579C19.162 11.0527 18.8838 10.9375 18.5938 10.9375C18.3037 10.9375 18.0255 11.0527 17.8204 11.2579C17.6152 11.463 17.5 11.7412 17.5 12.0312V15.3125H14.2188C13.9287 15.3125 13.6505 15.4277 13.4454 15.6329C13.2402 15.838 13.125 16.1162 13.125 16.4062C13.125 16.6963 13.2402 16.9745 13.4454 17.1796C13.6505 17.3848 13.9287 17.5 14.2188 17.5H17.5V20.7812C17.5 21.0713 17.6152 21.3495 17.8204 21.5546C18.0255 21.7598 18.3037 21.875 18.5938 21.875C18.8838 21.875 19.162 21.7598 19.3671 21.5546C19.5723 21.3495 19.6875 21.0713 19.6875 20.7812V17.5H22.9688C23.2588 17.5 23.537 17.3848 23.7421 17.1796C23.9473 16.9745 24.0625 16.6963 24.0625 16.4062C24.0625 16.1162 23.9473 15.838 23.7421 15.6329C23.537 15.4277 23.2588 15.3125 22.9688 15.3125H19.6875V12.0312Z"
                    fill="white"
                  />
                  <path
                    d="M1.09375 2.1875C0.80367 2.1875 0.52547 2.30273 0.320352 2.50785C0.115234 2.71297 0 2.99117 0 3.28125C0 3.57133 0.115234 3.84953 0.320352 4.05465C0.52547 4.25977 0.80367 4.375 1.09375 4.375H3.52188L4.39906 7.89031L7.67594 25.3575C7.72286 25.6081 7.85587 25.8345 8.05199 25.9975C8.24811 26.1604 8.49501 26.2498 8.75 26.25H10.9375C9.77718 26.25 8.66438 26.7109 7.84391 27.5314C7.02344 28.3519 6.5625 29.4647 6.5625 30.625C6.5625 31.7853 7.02344 32.8981 7.84391 33.7186C8.66438 34.5391 9.77718 35 10.9375 35C12.0978 35 13.2106 34.5391 14.0311 33.7186C14.8516 32.8981 15.3125 31.7853 15.3125 30.625C15.3125 29.4647 14.8516 28.3519 14.0311 27.5314C13.2106 26.7109 12.0978 26.25 10.9375 26.25H26.25C25.0897 26.25 23.9769 26.7109 23.1564 27.5314C22.3359 28.3519 21.875 29.4647 21.875 30.625C21.875 31.7853 22.3359 32.8981 23.1564 33.7186C23.9769 34.5391 25.0897 35 26.25 35C27.4103 35 28.5231 34.5391 29.3436 33.7186C30.1641 32.8981 30.625 31.7853 30.625 30.625C30.625 29.4647 30.1641 28.3519 29.3436 27.5314C28.5231 26.7109 27.4103 26.25 26.25 26.25H28.4375C28.6925 26.2498 28.9394 26.1604 29.1355 25.9975C29.3316 25.8345 29.4646 25.6081 29.5116 25.3575L32.7928 7.8575C32.8224 7.69964 32.8168 7.53722 32.7765 7.38176C32.7362 7.2263 32.6621 7.08162 32.5596 6.95801C32.4571 6.83439 32.3286 6.73487 32.1833 6.66652C32.0379 6.59816 31.8794 6.56265 31.7188 6.5625H6.32188L5.43594 3.01656C5.3769 2.77984 5.2404 2.56965 5.04816 2.41943C4.85592 2.2692 4.61897 2.18757 4.375 2.1875H1.09375ZM9.65781 24.0625L6.78563 8.75H30.4019L27.5297 24.0625H9.65781ZM13.125 30.625C13.125 31.2052 12.8945 31.7616 12.4843 32.1718C12.0741 32.582 11.5177 32.8125 10.9375 32.8125C10.3573 32.8125 9.80094 32.582 9.39071 32.1718C8.98047 31.7616 8.75 31.2052 8.75 30.625C8.75 30.0448 8.98047 29.4884 9.39071 29.0782C9.80094 28.668 10.3573 28.4375 10.9375 28.4375C11.5177 28.4375 12.0741 28.668 12.4843 29.0782C12.8945 29.4884 13.125 30.0448 13.125 30.625ZM28.4375 30.625C28.4375 31.2052 28.207 31.7616 27.7968 32.1718C27.3866 32.582 26.8302 32.8125 26.25 32.8125C25.6698 32.8125 25.1134 32.582 24.7032 32.1718C24.293 31.7616 24.0625 31.2052 24.0625 30.625C24.0625 30.0448 24.293 29.4884 24.7032 29.0782C25.1134 28.668 25.6698 28.4375 26.25 28.4375C26.8302 28.4375 27.3866 28.668 27.7968 29.0782C28.207 29.4884 28.4375 30.0448 28.4375 30.625Z"
                    fill="white"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mb-8">
          <h2 className="font-bold text-2xl md:text-4xl leading-normal text-black text-center mb-12">
            You might also like...
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
            {relatedProducts.map((relatedProduct) => (
              <ProductCard
                key={relatedProduct.id}
                id={relatedProduct.id}
                title={relatedProduct.title}
                description={relatedProduct.description}
                price={relatedProduct.price}
                image={relatedProduct.image}
                imageAlt={relatedProduct.title}
                onAddToCart={handleRelatedProductAddToCart}
                className="w-full max-w-[367px]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;