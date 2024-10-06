import Product from "@/models/Product";

export async function GET(request, { params }) {
  const id = params.id;
  const product = await Product.findById(id).populate("category");
  console.log({ product });
  return Response.json(product);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  return Response.json(await Product.findByIdAndDelete(id));
}

export async function PUT(request, {params}) {
  const id = params.id;
  const body = await request.json();
  const {...updateData } = body;
  const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!product) {
    return Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}