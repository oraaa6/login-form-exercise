import React from "react";
import "./tiles.scss";

type ProductData = {
  id: number;
  product: string;
  price: string;
  country: string;
};

type ProductsData = ProductData[];

const productsData: ProductsData = [
  {
    id: 1,
    product: "bananas",
    price: "6 $ per kilogram",
    country: "Brazil",
  },
  {
    id: 2,
    product: "apples",
    price: "10 $ per kilogram",
    country: "Poland",
  },
  {
    id: 3,
    product: "strawberries",
    price: "12 $ per kilogram",
    country: "Germany",
  },
  {
    id: 4,
    product: "grapes",
    price: "11 $ per kilogram",
    country: "France",
  },
  {
    id: 5,
    product: "avocado",
    price: "5 $ per item",
    country: "RPA",
  },
  {
    id: 6,
    product: "cherries",
    price: "8 $ per item",
    country: "Poland",
  },
];

function Tiles() {
  return (
    <>
      <h3 className="tile-title">Fresh fruits</h3>
      <div className="tiles-container">
        {productsData.map((product) => {
          return (
            <div className={`tile tile-${product.id}`} key={product.id}>
              <p className="tile__product">{product.product}</p>
              <p className="tile__price">{`Price: ${product.price}`}</p>
              <p className="tile__country">{`Country of origin: ${product.country}`}</p>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default Tiles;
