import * as Icons from "react-icons/tb";
import Tags from "../../api/Tags.json";
import Taxes from "../../api/Taxes.json";
import Labels from "../../api/Labels.json";
import Products from "../../api/Products.json";
import React, { useState, useEffect } from "react";
import Colloctions from "../../api/Colloctions.json";
import Modal from "../../Admincompo/common/Modal.jsx";
import Tagify from "../../Admincompo/common/Tagify.jsx";
import Input from "../../Admincompo/common/Input.jsx";
// import Button from "../../Admincompo/common/Button.jsx";
import Attributes from "../../api/ProductAttributes.json";
import Divider from "../../Admincompo/common/Divider.jsx";
import CheckBox from "../../Admincompo/common/CheckBox.jsx";
import Dropdown from "../../Admincompo/common/Dropdown.jsx";
import Textarea from "../../Admincompo/common/Textarea.jsx";
import Offcanvas from "../../Admincompo/common/Offcanvas.jsx";
import Accordion from "../../Admincompo/common/Accordion.jsx";
import FileUpload from "../../Admincompo/common/FileUpload.jsx";
import TextEditor from "../../Admincompo/common/TextEditor.jsx";
import TableAction from "../../Admincompo/common/TableAction.jsx";
import MultiSelect from "../../Admincompo/common/MultiSelect.jsx";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Button from "../../Admincompo/common/Button.jsx";

const AddProduct = ({ productData }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [product, setProduct] = useState({
    title: productData?.title || "",
    description: productData?.description || "",
    sku: productData?.sku || "",
    priceSale: productData?.priceSale || "",
    price: productData?.price || "",
    costPerItem: productData?.costPerItem || "",
    profit: productData?.profit || "",
    margin: productData?.margin || "",
    barcode: productData?.barcode || "",
    quantity: productData?.quantity || 0,
    question: "",
    answer: "",
    metaLink: productData?.metaLink || "http://localhost:5173/catalog/product",
    metaTitle: productData?.metaTitle || "",
    metaDescription: productData?.metaDescription || "",
    categories: productData?.categories || ["other"],
    images: productData?.images || [],
    availability: productData?.availability || "In Stock",
    rating: productData?.rating || 0,
    brand: productData?.brand || ""
  });

  useEffect(() => {
    // Calculate profit and margin whenever price or costPerItem changes
    const profit = Number(product.price) - Number(product.costPerItem);
    const margin = product.price > 0 ? (profit / Number(product.price)) * 100 : 0;
    
    setProduct(prev => ({
      ...prev,
      profit: profit.toFixed(2),
      margin: margin.toFixed(2)
    }));
  }, [product.price, product.costPerItem]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const productPayload = {
        title: product.title,
        description: product.description,
        initial_price: parseFloat(product.price),
        final_price: product.priceSale || product.price,
        quantity: parseInt(product.quantity),
        barcode: product.barcode,
        sku: product.sku,
        rating: parseFloat(product.rating),
        brand: product.brand,
        availability: product.availability,
        categories: product.categories,
        images: product.images,
        costPerItem: parseFloat(product.costPerItem),
        profit: parseFloat(product.profit),
        margin: parseFloat(product.margin)
      };
      console.log("form data " +  productPayload)
      const response = await axios.post('/hi/products', productPayload, {
        withCredentials: true
      });

      console.log('Product created:', response.data);
      alert('Product created successfully');

      // navigate('/admin/products');
    } catch (err) {
      console.error('Error creating product:', err);
      setError(err.response?.data?.error || 'Failed to create product');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setProduct(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (files) => {
    setProduct(prev => ({
      ...prev,
      images: files
    }));
  };

  const uniqueCategories = [...new Set(Products.map(product => product.category))];
  const categoryOptions = uniqueCategories.map(category => ({
    label: category,
    value: category
  }));

  return (
    <section>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="content">
              {/* Product Info Section */}
              <div className="content_item">
                <h2 className="sub_heading">Product Info</h2>
                <div className="column">
  <div className="w-full mb-4">
    <label className="block mb-2 font-medium text-sm text-white">Title</label>
    <div className="relative flex items-center  border-2 border-gray-400 rounded-md">
      <span className="absolute left-3 text-white " >
        <Icons.TbShoppingCart />
      </span>
      <input
        type="text"
        name="title"
        placeholder="Enter the product name"
        value={product.title}
        onChange={(e) => handleInputChange("title", e.target.value)}
        required
        className="w-full pl-10 pr-4 py-3 border-2 border-white rounded-md text-sm text-white  bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm placeholder:text-gray-300 hover:border-gray-300"
      />
    </div>
  
</div>
</div>
                <div className="column">
                  <TextEditor
                    label="Description"
                    placeholder="Enter a description"
                    value={product.description}
                    onChange={(value) => handleInputChange("description", value)}
                    required
                  />
                </div>
                <div className="column ">
  <div className="w-full mb-4">
    <label className="block mb-2 font-medium text-sm text-white">Brand</label>
    <div className="relative flex items-center  border-2 border-gray-100 rounded-md">
      <input
        type="text"
        name="brand"
        placeholder="Enter brand name"
        value={product.brand}
        onChange={(e) => handleInputChange("brand", e.target.value)}
        className="w-full px-4 py-3 border-2 border-white rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm placeholder:text-gray-300 hover:border-gray-300"
      />
    </div>
  </div>
</div>
              </div>

              {/* Product Images Section */}
              <div className="content_item">
                <h2 className="sub_heading">Product Images</h2>
                <FileUpload 
                  onUpload={handleFileUpload}
                  multiple={true}
                />
              </div>

              {/* Pricing Section */}
              <div className="content_item">
                <h2 className="sub_heading">Pricing</h2>
                <div className="column_2">
                  <input
                    type="number"
                    name="price"
                    placeholder="Enter the product Price"
                    icon={<Icons.TbCoin />}
                    label="Price"
                    value={product.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    required
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="column_2">
                  <input
                    type="number"
                    name="priceSale"
                    placeholder="Enter the product Price sale"
                    icon={<Icons.TbCoin />}
                    label="Price sale"
                    value={product.priceSale}
                    onChange={(e) => handleInputChange("priceSale", e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="column_3">
                  <input
                    type="number"
                    name="costPerItem"
                    icon={<Icons.TbCoin />}
                    placeholder="Cost Per Item"
                    label="Cost Per Item"
                    value={product.costPerItem}
                    onChange={(e) => handleInputChange("costPerItem", e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
                <div className="column_3">
                  <input
                    type="text"
                    placeholder="- -"
                    label="Profit"
                    readOnly
                    value={product.profit}
                  />
                </div>
                <div className="column_3">
                  <input
                    type="text"
                    placeholder="- -"
                    label="Margin"
                    readOnly
                    value={`${product.margin}%`}
                  />
                </div>
              </div>

              {/* Inventory Section */}
              <div className="content_item">
                <h2 className="sub_heading">Inventory</h2>
                <div className="column  border-2 border-gray-700 rounded-md">
                  <input
                    type="number"
                    name="quantity"
                    placeholder="Quantity"
                    label="Stock Quantity"
                    value={product.quantity}
                    onChange={(e) => handleInputChange("quantity", e.target.value)}
                    min="0"
                    className="w-full px-4 py-3 border-2 border-white rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm placeholder:text-gray-300 hover:border-gray-300"

                  />
                </div>
                <div className="column  border-2 border-gray-700 rounded-md">
                  <input
                    type="text"
                    name="sku"
                    placeholder="SKU"
                    label="SKU"
                    value={product.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-white rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm placeholder:text-gray-300 hover:border-gray-300"

                  />
                </div>
                <div className="column  border-2 border-gray-700 rounded-md ">
                  <input
                    type="text"
                    name="barcode"
                    placeholder="Barcode"
                    label="Barcode"
                    value={product.barcode}
                    onChange={(e) => handleInputChange("barcode", e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-400 rounded-md text-sm text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm placeholder:text-gray-300 hover:border-gray-300"
                  
                  />
                </div>
              </div>

              {/* Categories Section */}
              {/* <div className="content_item">
                <h2 className="sub_heading">Categories</h2>
                <div className="column">
                  <MultiSelect
                    options={categoryOptions}
                    selectedOptions={product.categories}
                    onChange={(selected) => handleInputChange("categories", selected)}
                    placeholder="Select categories"
                  />
                </div>
              </div> */}

              {/* Submit Button */}
              <div className="content_item">
                <Button
                  type="submit"
                  label={loading ? "Saving..." : "Save Product"}
                  icon={<Icons.TbCheck />}
                  className="primary lg"
                  disabled={loading}
                />
                {error && <div className="error-message">{error}</div>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;