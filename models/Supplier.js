import mongoose from "mongoose";

const supplierSchema = new mongoose.Schema({
  code: { type: String, required: true },
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  category: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "category" 
  },
});

const Supplier = mongoose.models.supplier || mongoose.model('supplier', supplierSchema);

export default Supplier;