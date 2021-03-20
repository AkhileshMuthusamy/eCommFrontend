export interface Category {
  _id: string;
  child: Array<string>;
  name: string;
  parent_id: string;
}

export interface Product {
  _id: string;
  name: string;
  SKU: string;
  category: string;
  sellingPrice: number;
  description: string;
  dimension: string;
  weight: number;
  manufacturer: string;
  images: Array<ProductImage>;
}

export interface ProductImage {
  contentType: string;
  filename: string;
  imageBase64: string;
}

export interface CartProduct {
  _id: string;
  name: string;
  sellingPrice: number;
  quantity: number;
  grandPrice: number;
}
