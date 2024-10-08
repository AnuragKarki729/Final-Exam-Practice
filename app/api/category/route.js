import Category from "@/models/Category";
import { NextResponse } from "next/server";

export async function GET(request) {
  try{
  // console.log('GET /api/category',request.nextUrl.searchParams.get("pno"))
  const pno = request.nextUrl.searchParams.get("pno")
  if (pno) {
    const size = 3 // TODO fix this hard code
    const startIndex = (pno - 1) * size
    const categories = await Category.find()
      .sort({ order: -1 })
      .skip(startIndex)
      .limit(size)
    return NextResponse.json(categories)
  }

  const s = request.nextUrl.searchParams.get("s")
  if (s) {
    const categories = await Category
      .find({ name: { $regex: s, $options: 'i' } })
      .sort({ order: -1 })
    return NextResponse.json(categories)
  }

  const categories = await Category.find().sort({ order: -1 })
  return NextResponse.json(categories)
} catch{
  return NextResponse.json({ message: 'Error' })
}}

export async function POST(request) {
  const body = await request.json()
  const category = new Category(body)
  await category.save()
  return NextResponse.json(category)
}



// for V2
export async function PUT(request) {
  const body = await request.json()
  const category = await Category.findByIdAndUpdate(body._id, body)
  return NextResponse.json(category)
}