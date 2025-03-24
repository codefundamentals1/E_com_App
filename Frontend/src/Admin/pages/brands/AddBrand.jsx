import * as Icons from "react-icons/tb";
import React, { useState, useEffect } from "react";
import Categories from '../../api/Categories.json';
import Input from "../../Admincompo/common/Input.jsx";
import Button from "../../Admincompo/common/Button.jsx";
import Dropdown from "../../Admincompo/common/Dropdown.jsx";
import Textarea from "../../Admincompo/common/Textarea.jsx";
import Thumbnail from "../../Admincompo/common/Thumbnail.jsx";
import FileUpload from "../../Admincompo/common/FileUpload.jsx";
import TextEditor from "../../Admincompo/common/TextEditor.jsx";
import TableAction from "../../Admincompo/common/TableAction.jsx";
import MultiSelect from "../../Admincompo/common/MultiSelect.jsx";

const AddBrand = () => {

  const [fields, setFields] = useState({
    name: "",
    description: "",
    link: "",
    order: "",
    status: "",
    isFeatured: "",
    image: "",
    categories: "",
    metaLink: "",
    metaTitle: "",
    metaDescription: "",
  });

  const handleInputChange = (key, value) => {
    setFields({
      ...fields,
      [key]: value,
    });
  };

	const status = [
	{ label: 'Active', value: 'active' },
	{ label: 'Inactive', value: 'inactive' },
	{ label: 'On hold', value: 'on hold' },
	{ label: 'Discontinued', value: 'discontinued' },
	{ label: 'Acquired', value: 'acquired' },
	{ label: 'Merged', value: 'merged' },
	{ label: 'Defunct', value: 'defunct' },
	];

  const handleStatusChange = (option) => {
    setFields({
      ...fields,
      status: option.label,
    });
  };

  const categoriesOptions = Categories.map(category=>({
  	label:category.name
  }))

  const handleSelectCategories = (selectedOptions) => {
    setFields({
      ...fields,
      categories: selectedOptions,
    });
  };
	return (
    <section>
      <div className="container">
        <div className="wrapper">
          <div className="content">
          	<div className="content_item">
          		<h2 className="sub_heading">brand details</h2>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the brand name"
                  label="Name"
                  value={fields.name}
                  onChange={(value) => handleInputChange("name", value)}
                />
              </div>
              <div className="column">
                <TextEditor
                  label="Description"
                  placeholder="Enter a description"
                  value={fields.description}
                  onChange={(value) => handleInputChange("description", value)}
                />
              </div> 
              <div className="column_2">
                <Input
                  type="text"
                  placeholder="Website link"
                  label="Website link"
                  value={fields.link}
                  onChange={(value) => handleInputChange("link", value)}
                />
              </div>
              <div className="column_2">
                <Input
                  type="text"
                  placeholder="Enter the order"
                  label="Order"
                  value={fields.order}
                  onChange={(value) => handleInputChange("order", value)}
                />
              </div> 
          	</div>

            <div className="content_item meta_data">
              <div className="column">
                <span>Search engine listing</span>
                <h2 className="meta_title">{fields.metaTitle || fields.name}</h2>
                <p className="meta_link">{fields.metaLink}</p>
                <p className="meta_description">{fields.metaDescription || fields.description}</p>
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the meta title"
                  label="Title"
                  value={fields.metaTitle || fields.name}
                  onChange={(value) => handleInputChange("metaTitle", value)}
                />
              </div>
              <div className="column">
                <Input
                  type="text"
                  placeholder="Enter the meta link"
                  label="Link"
                  value={fields.metaLink}
                  onChange={(value) => handleInputChange("metaLink", value)}
                />
              </div>
              <div className="column">
                <Textarea
                  type="text"
                  placeholder="Enter the meta description"
                  label="Description"
                  value={fields.metaDescription || fields.description}
                  onChange={(value) => handleInputChange("metaDescription", value)}
                />
              </div>
            </div>
          </div>
          <div className="sidebar">
          	<div className="sidebar_item">
          		<h2 className="sub_heading">Published</h2>
          			<Button
          				label="Save & exit"
          				className="sm"
          				icon={<Icons.TbCircleCheck/>}
          			/>
          			<Button
          				label="Save"
          				className="sm success"
          				icon={<Icons.TbCircleCheck/>}
          			/>
          	</div>
          	<div className="sidebar_item">
          		<h2 className="sub_heading">Status</h2>
          		<div className="column">
	          		<Dropdown
					        placeholder="Select Status"
					        options={status}
					        onClick={handleStatusChange}
					        selectedValue={fields.status}
					      />
          		</div>
          	</div>
          	<div className="sidebar_item">
          		<h2 className="sub_heading">brand image</h2>
          		<div className="column">
          			<Thumbnail/>
          		</div>
          	</div>
          	<div className="sidebar_item">
          		<h2 className="sub_heading">categories</h2>
          		<div className="column">
          			<MultiSelect
					        options={categoriesOptions}
					        isSelected={fields.categories}
					        onChange={handleSelectCategories}
					        placeholder="Select Categories"
					        isMulti={true}
					      />
          		</div>
          	</div>
          </div>
        </div>
      </div>
    </section>
	)
}

export default AddBrand