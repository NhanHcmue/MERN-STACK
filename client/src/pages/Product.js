import React, { useState } from "react";
import Category from "../components/Category";
import ProductsList from "../components/Products/ProductsList";
import { useParams } from "react-router-dom";

const Product = () => {
  const { category } = useParams();
  const [viewMode, setViewMode] = useState("grid"); // mặc định là grid

  return (
    <div className="container mx-auto px-4 mt-4">
      <div className="flex flex-col md:flex-row gap-4 py-4">
        {/* Sidebar Category */}
        <div className="w-full md:w-1/4">
          <Category />
        </div>

        {/* Products List + nút chuyển đổi */}
        <div className="w-full md:w-3/4">
          {/* Nút chuyển đổi */}
          <div className="flex justify-end mb-3 gap-2">
            <button
              onClick={() => setViewMode("list")}
              className={`px-3 py-1 border rounded ${
                viewMode === "list" ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              List
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`px-3 py-1 border rounded ${
                viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white"
              }`}
            >
              Grid
            </button>
          </div>

          {/* Truyền viewMode vào ProductsList */}
          <ProductsList
            paginate={true}
            category={category}
            title="Sản Phẩm"
            viewMode={viewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
