import Supplier from "@/models/Supplier";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(await Supplier.find({}).populate('category'));
}

export async function POST(request) {
  const body = await request.json();
  console.log(body)
  const supplier = new Supplier(body);
  await supplier.save();
  return NextResponse.json(supplier);
}

export async function PUT(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const supplier = await Supplier.findByIdAndUpdate(_id, updateData, { new: true });
  if (!supplier) {
    return new Response("Supplier not found", { status: 404 });
  }
  return Response.json(supplier);
}

export async function PATCH(request) {
  const body = await request.json();
  const { _id, ...updateData } = body;
  const supplier = await Supplier.findByIdAndUpdate(_id, updateData, { new: true });
  if (!supplier) {
    return new Response("Supplier not found", { status: 404 });
  }
  return Response.json(supplier);
}