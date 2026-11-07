import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";

export const supabase = createClient(supabaseUrl, supabaseKey);

export type Database = {
  public: {
    Tables: {
      bookings: {
        Row: {
          id: string;
          booking_number: string;
          name: string;
          phone: string;
          email: string | null;
          pickup: string;
          dropoff: string;
          travel_date: string;
          trip_type: string;
          passengers: string | null;
          vehicle_id: string | null;
          vehicle_name: string | null;
          status: string;
          notes: string | null;
          source: string | null;
          amount: number | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          booking_number: string;
          name: string;
          phone: string;
          email?: string | null;
          pickup: string;
          dropoff: string;
          travel_date: string;
          trip_type: string;
          passengers?: string | null;
          vehicle_id?: string | null;
          vehicle_name?: string | null;
          status?: string;
          notes?: string | null;
          source?: string | null;
          amount?: number | null;
        };
        Update: {
          id?: string;
          booking_number?: string;
          name?: string;
          phone?: string;
          email?: string | null;
          pickup?: string;
          dropoff?: string;
          travel_date?: string;
          trip_type?: string;
          passengers?: string | null;
          vehicle_id?: string | null;
          vehicle_name?: string | null;
          status?: string;
          notes?: string | null;
          source?: string | null;
          amount?: number | null;
        };
      };
      notifications: {
        Row: {
          id: string;
          type: string;
          title: string;
          message: string;
          unread: boolean;
          booking_id: string | null;
          admin_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          title: string;
          message: string;
          unread?: boolean;
          booking_id?: string | null;
          admin_id?: string | null;
        };
        Update: {
          id?: string;
          type?: string;
          title?: string;
          message?: string;
          unread?: boolean;
          booking_id?: string | null;
          admin_id?: string | null;
        };
      };
      admins: {
        Row: {
          id: string;
          name: string;
          email: string;
          role: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          role?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          role?: string;
        };
      };
    };
  };
};
