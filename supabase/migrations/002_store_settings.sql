-- Create store_settings table to manage CMS content
CREATE TABLE store_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  store_name TEXT NOT NULL DEFAULT 'Little Pearl',
  store_description TEXT NOT NULL DEFAULT 'Premium Indian Baby Wear & Jewellery',
  hero_title TEXT NOT NULL DEFAULT 'Little Moments, Beautifully Adorned.',
  hero_subtitle TEXT NOT NULL DEFAULT 'Discover our exquisite collection of soft, natural fabrics and delicate pearls designed for your little ones.',
  contact_email TEXT NOT NULL DEFAULT 'support@littlepearl.in',
  contact_phone TEXT NOT NULL DEFAULT '+91 99999 99999',
  shipping_banner_text TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Insert the default singleton row
INSERT INTO store_settings (id) VALUES ('00000000-0000-0000-0000-000000000000');

-- Trigger to update timestamp
CREATE TRIGGER store_settings_updated_at
  BEFORE UPDATE ON store_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- RLS
ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

-- Public can read
CREATE POLICY "Anyone can view store settings"
  ON store_settings FOR SELECT
  USING (true);

-- Updates will be handled by Server Actions using Service Role Key to bypass RLS
