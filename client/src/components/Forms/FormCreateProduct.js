import React, { useState } from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { uploadMultiFile, uploadOneFile } from "../../api/uploadApi";
import { addProduct } from "../../api/productApi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../Loading/Loading";
import { useDispatch } from "react-redux";
import { createProduct } from "../../redux/reducers/productSlice";

const FormCreateProduct = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const mdParser = new MarkdownIt();
  function handleEditorChange({ html, text }) {
    setProduct({ ...product, contentHtml: html, contentMarkdown: text });
  }

  const [files, setFiles] = useState([]);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [color, setColor] = useState("");
  const [memery, setMemory] = useState("");
  const [product, setProduct] = useState({
    name: "",
    newPrice: "",
    oldPrice: "",
    vat: "",
    colors: [],
    memorys: [],
    category: "Phone",
    contentHtml: "",
    contentMarkdown: "",
    display: "",
    resolution: "",
    operatingSystem: "",
    chipset: "",
    ram: "",
    mobileNetwork: "",
    pin: "",
  });

  const deleteColor = (id) => {
    const newListColor = product.colors.filter((p) => p !== id);
    setProduct({ ...product, colors: newListColor });
  };

  const deleteMemory = (id) => {
    const newListMemory = product.memorys.filter((p) => p !== id);
    setProduct({ ...product, memorys: newListMemory });
  };

  const onChangeInput = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    if (product.colors.length === 0 || product.memorys.length === 0)
      return alert("Them mau sac va phien ban cua san pham !");

    setLoading(true);

    try {
      const imageList = await uploadMultiFile(files);
      const imageOne = await uploadOneFile(file);
      const newProduct = {
        ...product,
        image: imageList,
        thumnail: imageOne,
        newPrice: +product.newPrice,
        oldPrice: +product.oldPrice,
      };
      const res = await addProduct(newProduct);
      if (res.data.success) {
        navigate("/admin/products?page=1");
        dispatch(createProduct(res.data.product));
        toast.success("Add new product success !");
      }
      setLoading(false);
    } catch (error) {
      console.log(error.response);
      setLoading(false);
      toast.error("Add new product fail !");
    }
  };

  return (
    <form onSubmit={onSubmitForm} className="p-3 h-[100%] overflow-auto">
      <div className="w-full">
        <label className="block mb-2">Tên Sản Phẩm</label>
        <input
          name="name"
          placeholder="Tên sản phẩm..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.name}
          onChange={onChangeInput}
          required
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Giá</label>
        <input
          name="newPrice"
          placeholder="Giá mới.."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.newPrice}
          onChange={onChangeInput}
          required
          type="number"
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Giá Cũ</label>
        <input
          name="oldPrice"
          placeholder="Giá cũ..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.oldPrice}
          onChange={onChangeInput}
          type="number"
        />
      </div>
      <div className="w-full mt-4">
        <label htmlFor="file-image" className="block mb-2">
          <i className="bx bx-upload text-2xl"></i>
        </label>
        <input
          name="image"
          placeholder="Ảnh..."
          type={"file"}
          multiple
          className="border-[1px] p-2 outline-none rounded-md w-full"
          id="file-image"
          onChange={(e) => setFiles([...e.target.files])}
          required
        />
        <small className="text-gray-400">// Có thể up nhiều file</small>
      </div>
      <div className="w-full mt-4">
        <label htmlFor="file-image" className="block mb-2">
        Hình thu nhỏ
        </label>
        <input
          name="image"
          placeholder="Hình thu nhỏ..."
          type={"file"}
          className="border-[1px] p-2 outline-none rounded-md w-full"
          id="file-image"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <small className="text-gray-400">// Chỉ up 1 file làm hình thu nhỏ</small>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Màu Sắc</label>
        <div className="flex items-center">
          <input
            name="colors"
            placeholder="Màu sắc..."
            className="border-[1px] text-black p-2 w-full outline-none rounded-md"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 bg-black rounded-md text-white ml-3"
            onClick={() => {
              setProduct({ ...product, colors: [...product.colors, color] });
              setColor("");
            }}
          >
            Thêm
          </button>
        </div>
        <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 mt-4 gap-3">
          {product.colors.map((p) => (
            <p
              key={p}
              className="bg-orange-400 rounded-md p-2 text-white flex items-center justify-between"
            >
              {p}
              <p onClick={() => deleteColor(p)} className="ml-2 cursor-pointer">
                x
              </p>
            </p>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Bộ Nhớ</label>
        <div className="flex items-center">
          <input
            name="memorys"
            placeholder="Bộ nhớ..."
            className="border-[1px] text-black p-2 w-full outline-none rounded-md"
            value={memery}
            onChange={(e) => setMemory(e.target.value)}
          />
          <button
            type="button"
            className="px-4 py-2 bg-black rounded-md text-white ml-3"
            onClick={() => {
              setProduct({ ...product, memorys: [...product.memorys, memery] });
              setMemory("");
            }}
          >
            Thêm
          </button>
        </div>
        <div className="grid lg:grid-cols-8 md:grid-cols-5 sm:grid-cols-4 grid-cols-3 mt-4 gap-3">
          {product.memorys.map((p) => (
            <p
              key={p}
              className="bg-orange-400 rounded-md p-2 text-white flex items-center justify-between"
            >
              {p}
              <p
                onClick={() => deleteMemory(p)}
                className="ml-2 cursor-pointer"
              >
                x
              </p>
            </p>
          ))}
        </div>
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Loại sản phẩm</label>
        <select
          className="border-[1px] text-black p-2 outline-none rounded-md w-full"
          value="Phone"
          name="category"
          value={product.category}
          onChange={onChangeInput}
          required
        >
          <option value={"Phone"}>Điện thoại</option>
          <option value={"Watch"}>Đồng hồ</option>
          <option value={"Tablet"}>Máy tính bảng</option>
          <option value={"Laptop"}>Laptop</option>
          <option value={"Loa"}>Loa</option>
          <option value={"Chuột"}>Chuột</option>
          <option value={"Bàn phím"}>Bàn phím</option>
        </select>
      </div>

      <div className="w-full mt-4">
        <label className="block mb-2">Màn Hình</label>
        <input
          name="display"
          placeholder="Màn hình..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.display}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Bảo hành</label>
        <input
          name="resolution"
          placeholder="Bảo hành..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.resolution}
          onChange={onChangeInput}
        />
      </div>

      <div className="w-full mt-4">
        <label className="block mb-2">Hệ điều hành</label>
        <input
          name="operatingSystem"
          placeholder="Hệ điều hành..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.operatingSystem}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Bộ vi mạch</label>
        <input
          name="chipset"
          placeholder="Bộ vi mạch..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.chipset}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Ram</label>
        <input
          name="ram"
          placeholder="Ram..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.ram}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Mạng</label>
        <input
          name="mobileNetwork"
          placeholder="Mạng..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.mobileNetwork}
          onChange={onChangeInput}
        />
      </div>
      <div className="w-full mt-4">
        <label className="block mb-2">Pin</label>
        <input
          name="pin"
          placeholder="Pin..."
          className="border-[1px] text-black p-2 w-full outline-none rounded-md"
          value={product.pin}
          onChange={onChangeInput}
          type="number"
        />
      </div>

      <div className="mt-4 w-full">
        <p className="mb-2">Miêu tả</p>
        <MdEditor
          style={{ height: "500px" }}
          renderHTML={(text) => mdParser.render(text)}
          onChange={handleEditorChange}
        />
      </div>

      <div className="w-full text-right">
        <input
          type={"submit"}
          placeholder="Add Product"
          className="bg-black mt-4 p-2 rounded-md text-white"
        />
      </div>

      {loading && <Loading />}
    </form>
  );
};

export default FormCreateProduct;
