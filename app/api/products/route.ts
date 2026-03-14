import { NextResponse } from 'next/server';
import { LUMIERE_PRODUCT } from '@/lib/products';

export async function GET() {
  return NextResponse.json({
    products: [LUMIERE_PRODUCT],
    total: 1,
  });
}
