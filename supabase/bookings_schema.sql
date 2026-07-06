-- Create the booking_requests table
CREATE TABLE booking_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    warehouse_slug TEXT NOT NULL,
    warehouse_title TEXT NOT NULL,
    area_requested NUMERIC NOT NULL,
    storage_type TEXT NOT NULL,
    move_in_date DATE NOT NULL,
    requirements TEXT NOT NULL,
    request_type TEXT NOT NULL, -- 'quote' or 'message'
    status TEXT DEFAULT 'Pending', -- 'Pending', 'Negotiating', 'Approved', 'Rejected'
    company_name TEXT DEFAULT 'Guest Company', -- Defaulting for now since we have no auth
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE booking_requests ENABLE ROW LEVEL SECURITY;

-- Allow public read access (for the owner dashboard prototyping)
CREATE POLICY "Allow public read access to bookings" ON booking_requests FOR SELECT USING (true);

-- Allow public insert (so guests can submit the booking form)
CREATE POLICY "Allow public insert for bookings" ON booking_requests FOR INSERT WITH CHECK (true);
