
import { Box } from "@mui/material";
export default async function Home({ params }) {
    const API_BASE = process.env.NEXT_PUBLIC_API_URL;
    const data = await fetch(`${API_BASE}/supplier/${params.id}`, { cache: "no-store" });
    const supplier = await data.json();
    console.log({ supplier, category: supplier.category });
    // const id = params.id;
    return (
        <>
        <Box component="section" className="border border-gray-800 m-5 text-center">
        <h1>Stock Management v1.0</h1>
        <ul>
        <li><a href="/product">Products</a></li>
          <li><a href="/category">Category</a></li>
          <li><a href="/supplier">Supplier</a></li>
          <li><a href= "/v2">Version 2</a></li>
        </ul>
        </Box>
      <div className="m-4">
        
        <h1>Supplier Info</h1>
        <p className="font-bold text-xl text-blue-800">{supplier.name}</p>
        <p>Address: {supplier.address}</p>
        <p>Phone: {supplier.phone}</p>
        <p>Category: {supplier.category.name}</p>
      </div>
      </>
    );
  }
  