// File: app/api/products/route.js
import { NextResponse } from 'next/server';

// Sample product data (in production, this would come from a database)
const products = [
  {
    id: "tank-truck-rollover-simulator",
    name: "Tank Truck Rollover Simulator",
    description: "High-impact training simulator for hazmat teams.",
    image: "/img/Tank-Truck-Rollover.jpg",
    price: 8120.00,
    category: "simulator",
    inStock: true,
    inventory: 5,
    weight: 500, // lbs
    dimensions: "10x8x6 feet",
    sku: "TTS-001"
  },
  {
    id: "tank-truck-accessory-pack",
    name: "Tank Truck Accessory Pack",
    description: "Complete add-on kit for tank truck simulators.",
    image: "/img/Tank-Truck.jpg",
    price: 975.00,
    category: "simulator",
    inStock: true,
    inventory: 12,
    weight: 50,
    dimensions: "2x2x1 feet",
    sku: "TTA-001"
  },
  {
    id: "basic-hot-tap-rollover-kit",
    name: "Basic Hot Tap Rollover Kit",
    description: "Entry-level kit for hot tap rollover scenarios.",
    image: "/img/1-Basic-Hot.jpg",
    price: 1075.00,
    category: "simulator",
    inStock: false,
    inventory: 0,
    weight: 25,
    dimensions: "18x12x8 inches",
    sku: "HTK-001"
  },
  {
    id: "pop-up-pool-basin-100",
    name: "Pop-Up Pool - Catch Basin 100 Gallon",
    description: "Flexible containment basin for spill response.",
    image: "/img/Basin_4.jpg",
    price: 99.00,
    category: "Containment",
    inStock: true,
    inventory: 25,
    weight: 15,
    dimensions: "Folded: 12x12x6 inches",
    sku: "PPB-100"
  },
  {
    id: "storm-drain-filter",
    name: "Storm Drain Filter",
    description: "Simple and effective storm drain filter solution.",
    image: "/img/storm-drain.jpg",
    price: 29.95,
    category: "Drain Filters",
    inStock: true,
    inventory: 100,
    weight: 2,
    dimensions: "24x24x2 inches",
    sku: "SDF-001"
  },
  {
    id: "spill-responder-kit-bags",
    name: "Spill Responder Kit Bags",
    description: "Portable kits for rapid spill containment.",
    image: "/img/Large-Spill.jpg",
    price: 104.00,
    category: "Spill Kits",
    inStock: true,
    inventory: 30,
    weight: 8,
    dimensions: "18x12x6 inches",
    sku: "SRK-001"
  }
];

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const inStock = searchParams.get('inStock');

    let filteredProducts = [...products];

    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(p => 
        p.category.toLowerCase() === category.toLowerCase()
      );
    }

    if (inStock === 'true') {
      filteredProducts = filteredProducts.filter(p => p.inStock);
    }

    return NextResponse.json({
      products: filteredProducts,
      total: filteredProducts.length
    });
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return NextResponse.json(
      { error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  try {
    const { id, inventory } = await request.json();
    
    const productIndex = products.findIndex(p => p.id === id);
    if (productIndex === -1) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    // Update inventory
    products[productIndex].inventory = inventory;
    products[productIndex].inStock = inventory > 0;

    return NextResponse.json({
      success: true,
      product: products[productIndex]
    });
  } catch (error) {
    console.error('Failed to update product:', error);
    return NextResponse.json(
      { error: 'Failed to update product' },
      { status: 500 }
    );
  }
}