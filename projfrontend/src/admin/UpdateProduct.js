import React from "react";
import Base from "../core/Base";
const UpdateProduct=()=>{

    

    const createProductForm=()=>{
       
            <form>
    <span>Post photo</span>
    <div className="form-group">
      <label className="label-form">
        <input
          onChange={handleChange("photo")}
          type="file"
          name="photo"
          accept="image"
          placeholder="choose a file"
        />
      </label>
    </div>
    <div className="form-group">
      <input
        onChange={handleChange("name")}
        name="photo"
        className="form-control"
        placeholder="Name"
        value={name}
      />
    </div>
    <div className="form-group">
      <textarea
        onChange={handleChange("description")}
        name="photo"
        className="form-control"
        placeholder="Description"
        value={description}
      />
    </div>
    <div className="form-group">
      <input
        onChange={handleChange("price")}
        type="number"
        className="form-control"
        placeholder="Price"
        value={price}
      />
    </div>
    <div className="form-group">
      <select
        onChange={handleChange("category")}
        className="form-control"
        placeholder="Category"
      >
        <option>Select</option>
        {categories &&
          categories.map((cate, index) => (
            <option key={index} value={cate._id}>
              {cate.name}
            </option>
          ))}
      </select>
    </div>
    <div className="form-group">
      <input
        onChange={handleChange("stock")}
        type="number"
        className="form-control"
        placeholder="Stock"
        value={stock}
      />
    </div>
    <button className='submit' onClick={onSubmit}>Submit</button>
        </form>
    }
   return(
    <Base title="Update a product here" >

       
    
    
    </Base>
   )
}
export default UpdateProduct