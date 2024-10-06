import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const id = params.id;
  const product = await Product.findById(id).populate("category");
  console.log({ product });
  return NextResponse.json(product);
}

export async function DELETE(request, { params }) {
  const id = params.id;
  return NextResponse.json(await Product.findByIdAndDelete(id));
}

export async function PUT(request, {params}) {
  const id = params.id;
  const body = await request.json();
  const {...updateData } = body;
  const product = await Product.findByIdAndUpdate(id, updateData, { new: true });
  if (!product) {
    return NextResponse("Product not found", { status: 404 });
  }
  return NextResponse.json(product);
}