import React from "react";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";

const ProductItem = ({ data, isListView = false }) => {
  if (isListView) {
    // Hiển thị dạng list: ảnh nhỏ bên trái, thông tin bên phải theo hàng ngang
    return (
      <div className="w-full flex items-center p-3 bg-white rounded-md shadow-sm">
        <Link to={`/product/details/${data._id}`} className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-md border border-gray-200">
          <img
            className="w-full h-full object-contain"
            src={data.thumnail}
            alt={data.name}
          />
        </Link>
        <div className="ml-4 flex flex-col justify-between flex-grow">
          <Link
            to={`/product/details/${data._id}`}
            className="text-lg font-semibold hover:underline line-clamp-2"
          >
            {data.name}
          </Link>

          <div className="flex items-center mt-2 flex-wrap">
            <p className="text-gray-500 text-sm mr-3 line-through">
              <NumberFormat
                value={data.oldPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
            <p className="text-base font-bold">
              <NumberFormat
                value={data.newPrice}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"đ"}
              />
            </p>
          </div>

          <Link
            to={`/product/details/${data._id}`}
            className="mt-3 bg-black text-white rounded-md py-2 text-center w-36"
          >
            Xem Thông Tin
          </Link>
        </div>
      </div>
    );
  }

  // Dạng grid (mặc định)
  return (
    <div className="w-full flex flex-col justify-between rounded-md p-3 bg-white">
      <Link
        to={`/product/details/${data._id}`}
        className="overflow-hidden block aspect-auto"
      >
        <img
          className="w-full h-full object-contain img-product"
          src={data.thumnail}
          alt={data.name}
        />
      </Link>
      <div>
        <Link
          to={`/product/details/${data._id}`}
          className="mt-3 block hover:underline transition-all line-clamp-2"
        >
          {data.name}
        </Link>
        <div className="flex items-center justify-center flex-wrap mt-4">
          <p className="text-gray-500 text-xs mr-2 line-through">
            <NumberFormat
              value={data.oldPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
          <p className="ml-1">
            <NumberFormat
              value={data.newPrice}
              displayType={"text"}
              thousandSeparator={true}
              suffix={"đ"}
            />
          </p>
        </div>
        <Link
          to={`/product/details/${data._id}`}
          className="bg-black text-white rounded-md mt-3 text-center py-2 block w-full"
        >
          Xem Thông Tin
        </Link>
      </div>
    </div>
  );
};

export default ProductItem;
