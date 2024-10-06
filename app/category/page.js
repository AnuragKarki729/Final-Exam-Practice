"use client";
import { useState, useEffect } from "react";

import CategoryForm from "@/app/components/forms/CategoryForm";
import ResponsiveAppBar from "../components/ResponsiveAppBar";
import Link from "next/link";

import { DataGrid, GridToolbar , GridRowsProp, GridColDef } from "@mui/x-data-grid";

import Modal from "@mui/material/Modal";


import IconButton from "@mui/material/IconButton";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useForm } from "react-hook-form";

export default function Home() {
  const [category, setCategory] = useState([]);
  const columns = [
    { field: "name", headerName: "Category Name", width: 150 },
    // { field: 'col2', headerName: 'Column 2', width: 150 },
  ];

  const {register, handleSubmit, reset} = useForm();

  const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  const APIBASE = API_BASE
  console.log(`${API_BASE}/category`);
  async function fetchCategory() {
    const data = await fetch(`${APIBASE}/category`);
    const c = await data.json();
    const c2 = c.map((category) => {
      category.id = category._id;
      return category;
    });
    setCategory(c2);
  }

  const [editMode, setEditMode] = useState(false)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    fetchCategory();
  }, []);

  

  function createCategory(data){
    handleCategoryFormSubmit(data)
  }

  const handleCategoryFormSubmit=(data)=> {
    if (editMode) {
      // data.id = data._id
      fetch(`${APIBASE}/category`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(() => {
        reset({ name: '', order: '' })
        fetchCategory()
      });
      return
    }else{
      console.log(data)
    fetch(`${APIBASE}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => {
      reset({ name: '', order: '' })
      fetchCategory()
    });
  }}

  return (
    <main>
      <ResponsiveAppBar/>
       <form onSubmit={handleSubmit(createCategory)}>
        <div className="grid grid-cols-2 gap-4 w-fit m-4">
          <div>Category:</div>
          <div>
            <input
              name="name"
              type="text"
              {...register("name", { required: true })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div>Order:</div>
          <div>
            <input
              name="order"
              type="number"
              {...register("order", { required: true, defaultValue: 0 })}
              className="border border-gray-600 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
          </div>
          <div className="col-span-2 text-right">
            {editMode ?
              <input
                type="submit"
                value="Update"
                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
              />

              :
              <input
                type="submit"
                value="Add"
                className="bg-green-800 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
              />
            }
            {
              editMode &&
              <button
                onClick={() => {
                  reset({ name: '', order: '' })
                  setEditMode(false)
                }}
                className="ml-2 bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-full"
              >Cancel</button>
            }
          </div>
        </div>
      </form> 
      <div className="mx-4">
        <span>Category ({category.length})</span>
        <IconButton aria-label="new-category" color="secondary" onClick={handleOpen}>
          <AddBoxIcon />
        </IconButton>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CategoryForm onSubmit={handleSubmit(createCategory)} />
        </Modal>
        <DataGrid
          slots={{
            toolbar: GridToolbar,
          }}
          rows={category}
          columns={columns}
        />
      </div>
    </main>
  );
}
