const mongoose = require("mongoose");
const slugify = require("slugify");
const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      maxlength: [120, "Product name cannot exceed 120 characters"],
    },
    slug: {
      type: String,
      unique: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      maxlength: [2000, "Description cannot exceed 2000 characters"],
    },
    tags: {
      type: [String],
      default: [],
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price cannot be negative"],
    },
    colour: {
      type: String,
      required: [true, "Product colour is required"],
      trim: true,
    },
    size: {
      type: String,
      enum: {
        values: ["sm", "md", "lg", "xl"],
        message: "Invalid size value",
      },
      required: [true, "Product size is required"],
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    totalStock: {
      type: Number,
      required: [true, "Total stock is required"],
      min: [0, "Stock cannot be negative"],
    },
    soldCount: {
      type: Number,
      default: 0,
      min: [0, "Sold count cannot be negative"],
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next();

  try {
    const baseSlug = slugify(this.name, { lower: true, strict: true });
    let slug = baseSlug;
    let counter = 1;

    while (true) {
      const existingProduct = await mongoose.models.Product.findOne({ slug });
      if (!existingProduct) break;
      slug = `${baseSlug}-${counter}`;
      counter++;
    }

    this.slug = slug;
    next();
  } catch (err) {
    next(err);
  }
});
ProductSchema.index({ tags: 1 });
ProductSchema.index({ price: 1 });
ProductSchema.index({ colour: 1 });
ProductSchema.index({ size: 1 });

const ProductModel = mongoose.model("Product", ProductSchema);

module.exports = ProductModel;
