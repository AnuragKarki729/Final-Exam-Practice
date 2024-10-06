import Product from "@/models/Product";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await Product.find());
}

export async function POST(request) {
  const body = await request.json();
  console.log(body)
  const product = new Product(body);
  await product.save();
  return NextResponse.json(product);
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}

export async function PATCH(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const product = await Product.findByIdAndUpdate(_id, updateData, { new: true });
  if (!product) {
    return new Response("Product not found", { status: 404 });
  }
  return Response.json(product);
}