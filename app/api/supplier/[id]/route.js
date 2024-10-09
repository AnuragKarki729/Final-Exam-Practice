import Supplier from "@/models/Supplier";
import Product from "@/models/Supplier";

export async function GET(request, { params }) {
  const id = params.id;
  const supplier = await Supplier.findById(id).populate("category")
  console.log({supplier});
  return Response.json(supplier);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  return Response.json(await Supplier.findByIdAndDelete(id));
}

export async function PUT(request, {params}) {
  const id =params.id
  const body = await request.json();

  const updated = await Supplier.findByIdAndUpdate(id, body, {new:true})

  if (!updated){
    return new Response(JSON.stringify({message:'Supplier not found'}), {status:404})
  }
  
  return new Response(JSON.stringify(updated),{status:200, headers:{"Content-Type": "application/json"}})
}