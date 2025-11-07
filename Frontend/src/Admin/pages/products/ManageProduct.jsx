import * as Icons from "react-icons/tb";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Input from "../../Admincompo/common/Input.jsx";
import Badge from "../../Admincompo/common/Badge.jsx";
import Button from "../../Admincompo/common/Button.jsx";
import CheckBox from "../../Admincompo/common/CheckBox.jsx";
import Dropdown from "../../Admincompo/common/Dropdown.jsx";
import Offcanvas from "../../Admincompo/common/Offcanvas.jsx";
import Pagination from "../../Admincompo/common/Pagination.jsx";
import TableAction from "../../Admincompo/common/TableAction.jsx";
import RangeSlider from "../../Admincompo/common/RangeSlider.jsx";
import MultiSelect from "../../Admincompo/common/MultiSelect.jsx";

const ManageProduct = () => {
  let number = 1;
  const [fields, setFields] = useState({
    name: "",
    sku: "",
    store: "",
    status: "",
    priceRange: [0, 100],
  });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bulkCheck, setBulkCheck] = useState(false);
  const [specificChecks, setSpecificChecks] = useState({});
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedValue, setSelectedValue] = useState(5);
  const [tableRow, setTableRow] = useState([
    { value: 2, label: "2" },
    { value: 5, label: "5" },
    { value: 10, label: "10" },
  ]);
  
  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/hi/products', {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        });
        console.log(response.data)
        setProducts(response.data);
      } catch (err) {
        setError(err.message || 'Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

const [query, setQuery] = useState("");

const handlesearch = async () => {
  console.log("searching:", query);
  console.log(`hi/products/search?query=${query}`);

  try {
    const response = await axios.get(`/hi/products/search?query=${query}`);

    console.log("Search results:", response.data);
    setProducts(response.data)
  } catch (error) {
    console.error("Error occurred during fetch:", error);
  }
};
  const handleInputChange = async (key, value) => {
  console.log(value);
setQuery(value)
  // Update the field value in state
  setFields({
    ...fields,
    [key]: value,
  });

};

  const bulkAction = [
    { value: "delete", label: "Delete" },
    { value: "category", label: "Category" },
    { value: "status", label: "Status" },
  ];

  const bulkActionDropDown = (selectedOption) => {
    console.log(selectedOption);
    // Implement bulk actions here
    if (selectedOption.value === "delete") {
      const selectedIds = Object.keys(specificChecks).filter(id => specificChecks[id]);
      if (selectedIds.length > 0) {
        if (window.confirm(`Are you sure you want to delete ${selectedIds.length} products?`)) {
          handleBulkDelete(selectedIds);
        }
      } else {
        alert("Please select products to delete");
      }
    }
  };

  const handleBulkDelete = async (productIds) => {
    try {
      await axios.post('/hi/products/bulk-delete', { ids: productIds }, {
        withCredentials: true
      });
      // Refresh products after deletion
      setProducts(products.filter(product => !productIds.includes(product._id)));
      setSpecificChecks({});
      setBulkCheck(false);
    } catch (err) {
      console.error('Error deleting products:', err);
      setError('Failed to delete products');
    }
  };

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleBulkCheckbox = (isCheck) => {
    setBulkCheck(isCheck);
    if (isCheck) {
      const updateChecks = {};
      products.forEach((product) => {
        updateChecks[product._id] = true;
      });
      setSpecificChecks(updateChecks);
    } else {
      setSpecificChecks({});
    }
  };

  const handleCheckProduct = (isCheck, id) => {
    setSpecificChecks((prevSpecificChecks) => ({
      ...prevSpecificChecks,
      [id]: isCheck,
    }));
    
  };

  const showTableRow = (selectedOption) => {
    setSelectedValue(selectedOption.label);
  };

  const actionItems = ["Delete", "edit"];
//////////////////////////////////////////



  // const handleActionItemClick = async (item, itemID) => {
  //   const action = item.toLowerCase();
  //   if (action === "delete") {
  //     if (window.confirm("Are you sure you want to delete this product?")) {
  //       try {
  //         await axios.delete(`/hi/products/${itemID}`, {
  //           withCredentials: true
  //         });
  //         setProducts(products.filter(product => product._id !== itemID));
  //       } catch (err) {
  //         console.error('Error deleting product:', err);
  //         setError('Failed to delete product');
  //       }
  //     }
  //   } else if (action === "edit") {
  //     navigate(`/catalog/product/manage/${itemID}`);
  //   }
  // };
  
  const handleActionItemClick = async (item, itemID, seller_id) => {
    const action = item.toLowerCase();
    if (action === "delete") {
      if (window.confirm("Are you sure you want to delete this product?")) {
        try {
          // Find the product first to get the seller_id
          const productToDelete = products.find(p => p._id === itemID);
          
          if (!productToDelete) {
            throw new Error('Product not found in local state');
          }
  
          const response = await axios.delete(`/hi/products/${itemID}`, {
            withCredentials: true,
            data: {  // Note: Axios DELETE sends data in the 'data' property
              _id: itemID,
              seller_id: seller_id
            }
          });
  
          if (response.data.message === "Product deleted successfully.") {
            setProducts(products.filter(product => product._id !== itemID));
            alert('Product deleted successfully');
          } else {
            throw new Error(response.data.error || 'Failed to delete product');
          }
        } catch (err) {
          console.error('Error deleting product:', err);
          
          if (err.response) {
            if (err.response.status === 403) {
              alert('Error: You are not authorized to delete this product');
            } else if (err.response.status === 404) {
              alert('Error: Product not found');
            } else {
              alert(`Error: ${err.response.data?.error || 'Failed to delete product'}`);
            }
          } else {
            alert(`Error: ${err.message || 'Network error - please try again'}`);
          }
        }
      }
    } else if (action === "edit") {
      navigate(`/catalog/product/manage/${itemID}`);
    }
  };
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  const handleToggleOffcanvas = () => {
    setIsOffcanvasOpen(!isOffcanvasOpen);
  };

  const handleCloseOffcanvas = () => {
    setIsOffcanvasOpen(false);
  };

  const handleSliderChange = (newValues) => {
    setFields({
      ...fields,
      priceRange: newValues,
    });
  };

  const stores = [
    { label: 'FashionFiesta' },
    { label: 'TechTreasures' },
    { label: 'GadgetGrove' },
    { label: 'HomeHarbor' },
    { label: 'HealthHaven' },
    { label: 'BeautyBoutique' },
    { label: "Bookworm's Haven" },
    { label: 'PetParadise' },
    { label: 'FoodieFinds' }
  ];

  const status = [
    { label: 'In Stock' },
    { label: 'Out of Stock' },
    { label: 'Available Soon' },
    { label: 'Backorder' },
    { label: 'Refurbished' },
    { label: 'On Sale' },
    { label: 'Limited Stock' },
    { label: 'Discontinued' },
    { label: 'Coming Soon' },
    { label: 'New Arrival' },
    { label: 'Preorder' },
  ];

  const handleSelectStore = (selectedValues) => {
    setFields({
      ...fields,
      store: selectedValues,
    });
  };

  const handleSelectStatus = (selectedValues) => {
    setFields({
      ...fields,
      status: selectedValues.label,
    });
  };

  const handleRefresh = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('/hi/products', {
        withCredentials: true
      });
      setProducts(response.data);
    } catch (err) {
      setError(err.message || 'Failed to refresh products');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div>Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <div>Error: {error}</div>
        <button onClick={handleRefresh}>Retry</button>
      </div>
    );
  }

  return (
    <section className="products">
      <div className="container">
        <div className="wrapper">
          <div className="content transparent">
            <div className="content_head">
              <Dropdown
                placeholder="Bulk Action"
                className="sm"
                onClick={bulkActionDropDown}
                options={bulkAction}
              />
              <Button
                label="Advance Filter"
                className="sm"
                icon={<Icons.TbFilter />}
                onClick={handleToggleOffcanvas}
              />
              <Input
                placeholder="Search Product..."
                className="sm table_search"
                onChange={(value) =>  handleInputChange("search", value)}
                
              />
              <button onClick={handlesearch}>search</button>
              
              <Offcanvas
                isOpen={isOffcanvasOpen}
                onClose={handleCloseOffcanvas}
              >
                <div className="offcanvas-head">
                  <h2>Advance Search</h2>
                </div>
                <div className="offcanvas-body">
                  <div className="column">
                    <Input
                      type="text"
                      placeholder="Enter the product name"
                      label="Name"
                      value={fields.name}
                      onChange={(value) => handleInputChange("name", value)}
                    />
                  </div>
                  <div className="column">
                    <Input
                      type="text"
                      label="SKU"
                      value={fields.sku}
                      placeholder="Enter product SKU"
                      onChange={(value) => handleInputChange("sku", value)}
                    />
                  </div>
                  <div className="column">
                    <MultiSelect
                      options={stores}
                      placeholder="Select Store"
                      label="Store"
                      isSelected={fields.store}
                      onChange={handleSelectStore}
                    />
                  </div>
                  <div className="column">
                    <Dropdown
                      options={status}
                      placeholder="Select Status"
                      label="Status"
                      selectedValue={fields.status}
                      onClick={handleSelectStatus}
                    />
                  </div>
                  <div className="column">
                    <RangeSlider 
                      label="Price range" 
                      values={fields.priceRange} 
                      onValuesChange={handleSliderChange} 
                      min={0}
                      max={1000}
                    />
                  </div>
                </div>
                <div className="offcanvas-footer">
                  <Button
                    label="Discard"
                    className="sm outline"
                    icon={<Icons.TbX />}
                    onClick={handleCloseOffcanvas}
                  />
                  <Button
                    label="Filter"
                    className="sm"
                    icon={<Icons.TbFilter />}
                    onClick={() => {
                      // Implement filter logic here
                      handleCloseOffcanvas();
                    }}
                  />
                </div>
              </Offcanvas>
              <div className="btn_parent">
                <Link to="/catalog/product/add" className="sm button">
                  <Icons.TbPlus />
                  <span>Create Product</span>
                </Link>
                <Button
                  label="Reload"
                  icon={<Icons.TbRefresh />}
                  className="sm"
                  onClick={handleRefresh}
                />
              </div>
            </div>
            <div className="content_body">
              <div className="table_responsive">
                <table className="separate">
                  <thead>
                    <tr>
                      <th className="td_checkbox">
                        <CheckBox
                          onChange={handleBulkCheckbox}
                          isChecked={bulkCheck}
                        />
                      </th>
                      <th className="td_id">ID</th>
                      <th className="td_image">Image</th>
                      <th colSpan="4">Name</th>
                      <th>Price</th>
                      <th>Brand</th>
                      <th>SKU</th>
                      <th className="td_status">Rating</th>
                      <th className="td_status">Stock Status</th>
                      <th className="td_action">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product._id}>
                        <td className="td_checkbox">
                          <CheckBox
                            onChange={(isCheck) => handleCheckProduct(isCheck, product._id)}
                            isChecked={specificChecks[product._id] || false}
                          />
                        </td>
                        <td className="td_id">{number++}</td>
                        <td className="td_image">
                          <img
                            src={product?.image_url || '/default-product.png'}
                            alt="img not found"
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                          />
                        </td>
                        <td colSpan="4">
                          <Link to={`/admin/products/${product._id}`}>{product.title.length > 50 ? product.title.slice(0, 50) + "..." : product.title}</Link>
                        </td>
                        <td>
                          {`${product.final_price || product.initial_price} `}
                          <b>{product.currency || 'USD'}</b>
                        </td>
                        <td>
                          <Link>{product.brand}</Link>
                        </td>
                        <td>{product.asin}</td>
                        
                        <td className="td_status">
                          {product.rating || '0'}
                        </td>
                        <td className="td_status">
                          
                          {product.availability === "In Stock" ? (
                            <Badge label="In Stock" className="light-success" />
                          ) : (
                            <Badge label="Low stock" className="light-danger" />
                          )}
                        </td>
                        <td className="td_action">
                          <TableAction
                            actionItems={actionItems}
                            onActionItemClick={(item) => handleActionItemClick(item, product._id, product.seller_id)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="content_footer">
              <Dropdown
                className="top show_rows sm"
                placeholder="Rows per page"
                selectedValue={selectedValue}
                onClick={showTableRow}
                options={tableRow}
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(products.length / selectedValue)}
                onPageChange={onPageChange}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManageProduct;