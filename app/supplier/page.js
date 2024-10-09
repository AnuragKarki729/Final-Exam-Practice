"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { Box } from "@mui/material";

export default function Supplier() {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    console.debug("API_BASE", API_BASE);
    const { register, handleSubmit } = useForm();
    const [suppliers, setSuppliers] = useState([]);
    const [categorys, setCategory] = useState([]);

    async function fetchSuppliers() {
        const data = await fetch(`${API_BASE}/supplier`);
        // const data = await fetch(`http://localhost:3000/product`);
        const p = await data.json();
        setSuppliers(p);
        console.log(p)
    }

    async function fetchCategory() {
        const data = await fetch(`${API_BASE}/category`);
        const c = await data.json();
        setCategory(c);
      }


    const createSupplier = (data) => {
        fetch(`${API_BASE}/supplier`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }).then(() => fetchSuppliers());
    };

    const deleteById = (id) => async () => {
        if (!confirm("Are you sure?")) return;

        await fetch(`${API_BASE}/supplier/${id}`, {
            method: "DELETE",
        });
        fetchSuppliers();
    }

    useEffect(() => {
        fetchSuppliers();
        fetchCategory();
    }, []);

    return (
        <div>
   <Box component="section" className="border border-gray-800 m-5 text-center">
        <h1>Stock Management v1.0</h1>
        <ul>
        <li><a href="/product">Products</a></li>
          <li><a href="/category">Category</a></li>
          <li><a href="/supplier">Supplier</a></li>
          <li><a href= "/v2/category">Version 2</a></li>
        </ul>
        </Box>

            <h2>Suppliers Management</h2>
            <div className="d-flex justify-content-end mb-3">
                <button className="btn btn-primary">New Supplier</button>
            </div>


            <div className="flex-1 w-64 ">
                <form onSubmit={handleSubmit(createSupplier)}>
                    <div className="grid grid-cols-2 gap-4 m-4 w-1/2">
                        <div>Code:</div>
                        <div>
                            <input
                                name="code"
                                type="text"
                                {...register("code", { required: true })}
                                className="border border-black w-full"
                            />
                        </div>
                        <div>Name:</div>
                        <div>
                            <input
                                name="name"
                                type="text"
                                {...register("name", { required: true })}
                                className="border border-black w-full"
                            />
                        </div>
                        <div>Address:</div>
                        <div>
                            <textarea
                                name="address"
                                type="text"
                                {...register("address", { required: true })}
                                className="border border-black w-full"
                            />
                        </div>
                        <div>phone:</div>
                        <div>
                            <input
                                name="phone"
                                type="text"
                                {...register("phone", { required: true })}
                                className="border border-black w-full"
                            />
                        </div>
                        <div>Category:</div>
            <div>
              <select
                name="category"
                {...register("category", { required: true })}
                className="border border-black w-full"
              >
                {categorys.map((c) => (
                  <option key={c._id} value={c._id}>{c.name}</option>
                ))}
              </select>
            </div>
                        <div className="col-span-2">
                            <input
                                type="submit"
                                value="Add"
                                className="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                            />
                        </div>
                    </div>
                </form>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Supplier Name</th>
                            <th>Category</th>
                            <th>Phone Number</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {suppliers.map((supplier) => (
                            <tr key={supplier._id}>
                                <td><Link href={`/supplier/${supplier._id}`} className="font-bold">{" "}{supplier.name}
                                </Link></td>
                                <td>{supplier.category.name}</td>
                                <td>{supplier.phone}</td>
                                <td>
                                    <button className="btn btn-outline-primary me-2">Update</button>
                                    <button
                                        className="btn btn-outline-danger"
                                        onClick={deleteById(supplier._id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}