export default async function Home({ params }) {
    const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
  
    const data = await fetch(`${API_BASE}/supplier/${params.id}`, { cache: "no-store" });
    const supplier = await data.json();
    console.log({ supplier, category: supplier.category });
    // const id = params.id;
    return (
      <div className="m-4">
        <h1>Suppliers</h1>
        <p className="font-bold text-xl text-blue-800">{supplier.name}</p>
        <p>{supplier.address}</p>
        <p>{supplier.phone} Baht</p>
        <p>Category: {supplier.category.name}</p>
      </div>
    );
  }
  