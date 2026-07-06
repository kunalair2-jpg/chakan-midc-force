-- Create the warehouses table
CREATE TABLE warehouses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    area NUMERIC NOT NULL,
    available NUMERIC NOT NULL,
    price NUMERIC NOT NULL,
    rating NUMERIC DEFAULT 5.0,
    reviews INTEGER DEFAULT 0,
    category TEXT NOT NULL,
    tag TEXT,
    image TEXT NOT NULL,
    images JSONB NOT NULL DEFAULT '[]',
    facilities JSONB NOT NULL DEFAULT '[]',
    description TEXT NOT NULL,
    -- JSON column for all specs
    specs JSONB NOT NULL DEFAULT '{}',
    mapX NUMERIC,
    mapY NUMERIC,
    lat NUMERIC,
    lng NUMERIC,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Turn on Row Level Security (RLS)
ALTER TABLE warehouses ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read warehouses (Public access for the marketplace)
CREATE POLICY "Allow public read access to warehouses" ON warehouses FOR SELECT USING (true);

-- Allow authenticated users to insert (for the owner dashboard)
-- Note: In a real app, you'd restrict this to just warehouse owners
CREATE POLICY "Allow authenticated users to insert warehouses" ON warehouses FOR INSERT WITH CHECK (true);
-- For development, we'll temporarily allow public inserts so your dashboard works right away without login
CREATE POLICY "Allow public insert for dev" ON warehouses FOR INSERT WITH CHECK (true);

-- Insert some dummy data so the app isn't empty!
INSERT INTO warehouses (slug, title, city, state, area, available, price, rating, reviews, category, tag, image, images, facilities, description, specs, lat, lng)
VALUES
(
  'mumbai-cold-chain-hub',
  'Cold Chain Hub',
  'Navi Mumbai',
  'Maharashtra',
  82000,
  26000,
  72,
  4.92,
  38,
  'Cold storage',
  'Verified',
  'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80"]',
  '["Temperature control", "24/7 security", "Loading docks", "Fire NOC"]',
  'Grade-A cold storage space close to JNPT with multi-temperature chambers, reefer docking, and compliance support for food and pharma operators.',
  '{"microMarket": "Pimpri Chinchwad", "highwayDistance": "Within 2 km", "airportDistance": "20-40 km", "railwayDistance": "Under 5 km", "containerAccess": true, "clearHeight": 12, "grade": "Grade A", "flooring": "Epoxy-coated", "floorLoad": 5, "minLease": "1-3 years", "availableFrom": "Immediately", "powerLoad": 500, "powerBackup": "Full DG backup", "fireSafety": "Fire sprinkler", "fireNoc": true, "roadWidth": "18 m+ road"}',
  19.0330,
  73.0297
),
(
  'delhi-fulfillment-park',
  'Fulfillment Park',
  'Gurugram',
  'Haryana',
  120000,
  44000,
  49,
  4.86,
  52,
  'E-commerce',
  'Fast response',
  'https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80',
  '["https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1200&q=80", "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=900&q=80"]',
  '["Racking", "WMS ready", "Labor available", "Power backup"]',
  'Fulfillment-ready warehouse with dock-level access, high throughput layout, parcel sorting space, and team rooms for growing D2C and marketplace sellers.',
  '{"microMarket": "Chakan", "highwayDistance": "Within 1 km", "airportDistance": "Under 20 km", "railwayDistance": "15-30 km", "containerAccess": true, "clearHeight": 10, "grade": "Grade B", "flooring": "Trimix", "floorLoad": 4, "minLease": "6-12 months", "availableFrom": "Within 1 month", "powerLoad": 300, "powerBackup": "Partial backup", "fireSafety": "Fire hydrant", "fireNoc": true, "roadWidth": "12 m road"}',
  28.4595,
  77.0266
);
