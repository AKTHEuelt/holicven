import { NextResponse } from 'next/server';
import { createOrder } from '@/lib/db';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const order = await createOrder({
      customer_name: body.customer_name,
      customer_email: body.customer_email,
      customer_phone: body.customer_phone,
      product_name: body.product_name,
      product_price: parseFloat(body.product_price),
      quantity: parseInt(body.quantity) || 1
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error('Error creating order:', error);
    return NextResponse.json({ error: 'Failed to create order' }, { status: 500 });
  }
}
