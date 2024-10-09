"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import ResponsiveAppBar from "../components/ResponsiveAppBar";

export default function Home() {
  const APIBASE = process.env.NEXT_PUBLIC_API_BASE;
  const { register, handleSubmit,reset } = useForm();
  const [suppliers, setSuppliers] = useState([]);
  const [category, setCategory] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [supID, setSupID] = useState(null)
  
  const startEdit = (id) => async () => {
    setEditMode(true)
    setSupID(id)

    const response = await fetch (`${APIBASE}/supplier/${id}`)
    const data = await response.json()

    reset ({
      code: data.code,
      name: data.name,
      address: data.address,
      phone: data.phone,
      category: data.category,
    })
  }

  async function fetchSupplier() {
    const data = await fetch(`${APIBASE}/supplier`);
    const p = await data.json();
    console.log(p)
    setSuppliers(p);
  }

  async function fetchCategory() {
    const data = await fetch(`${APIBASE}/category`);
    const c = await data.json();
    setCategory(c);
  }

  const createSupplier = (data) => {
    if (editMode) {
      fetch(`${APIBASE}/supplier/${supID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
      }).then(()=>{
        setEditMode(false)
        setSupID(null)
        reset()
        fetchSupplier();
      })
    }else{
    fetch(`${APIBASE}/supplier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then(() => fetchSupplier());
  }};

  const deleteById = (id) => async () => {
    if (!confirm("Are you sure?")) return;

    await fetch(`${APIBASE}/supplier/${id}`, {
      method: "DELETE",
    });
    fetchSupplier();
  }

  useEffect(() => {
    fetchCategory();
    fetchSupplier();
  }, []);

  return (
    <>
      <ResponsiveAppBar />
      <div className="flex flex-row gap-4">
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
                  {...register("address", { required: true })}
                  className="border border-black w-full"
                />
              </div>
              <div>Phone:</div>
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
                  {category.map((c) => (
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
        </div>
        <div className="border m-4 bg-slate-300 flex-1 w-64">
          <h1 className="text-2xl">Suppliers ({suppliers.length})</h1>
          <ul className="list-disc ml-8">
            {
              suppliers.map((s) => (
                <li key={s._id}>
                  <button className="border border-black p-1/2" onClick={startEdit(s._id)}>📝</button>{' '}
                  <button className="border border-black p-1/2" onClick={deleteById(s._id)}>❌</button>{' '}
                  <Link href={`/supplier/${s._id}`} className="font-bold">
                    {s.name}
                  </Link>{" "}
                  - {s.category.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </>
  );
}
