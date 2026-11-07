import { NextResponse } from "next/server";
import { z } from "zod";

import { supabase } from "@/lib/supabase";

const bookingSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Valid phone number is required"),
  pickup: z.string().min(2, "Pickup location is required"),
  dropoff: z.string().min(2, "Drop location is required"),
  date: z.string().min(1, "Travel date is required"),
  tripType: z.string().min(1, "Trip type is required"),
  passengers: z.string().optional(),
  details: z.string().optional(),
  source: z.string().optional().default("website"),
});

export async function POST(request: Request) {
  try {
    const payload = await request.json();
    const parsed = bookingSchema.safeParse(payload);

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking payload", issues: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const bookingNumber = `MORYA-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        booking_number: bookingNumber,
        name: parsed.data.name,
        phone: parsed.data.phone,
        pickup: parsed.data.pickup,
        dropoff: parsed.data.dropoff,
        travel_date: new Date(parsed.data.date).toISOString(),
        trip_type: parsed.data.tripType,
        passengers: parsed.data.passengers || null,
        notes: parsed.data.details || null,
        source: parsed.data.source,
        status: "pending",
      })
      .select()
      .single();

    if (bookingError) {
      console.error("Booking insert error:", bookingError);
      return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
    }

    await supabase.from("notifications").insert({
      type: "booking",
      title: "New booking received",
      message: `${booking.name} booked a ride from ${booking.pickup} to ${booking.dropoff} on ${new Date(booking.travel_date).toLocaleDateString("en-IN")}.`,
      booking_id: booking.id,
      unread: true,
    });

    return NextResponse.json({ ok: true, booking });
  } catch (error) {
    console.error("Booking route error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 500 });
  }
}
