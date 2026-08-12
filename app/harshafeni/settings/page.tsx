'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateStoreSettings } from '@/app/actions/settings'
import { createClient } from '@/lib/supabase/client'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [settings, setSettings] = useState<any>(null)

  useEffect(() => {
    async function loadSettings() {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('store_settings')
        .select('*')
        .single()
        
      if (!error && data) {
        setSettings(data)
      }
      setLoading(false)
    }
    loadSettings()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSaving(true)
    
    const formData = new FormData(e.currentTarget)
    const result = await updateStoreSettings(formData)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Settings updated successfully')
    }
    setSaving(false)
  }

  if (loading) {
    return <div className="p-8">Loading settings...</div>
  }

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-display font-semibold text-on-surface">Store Settings</h1>
        <p className="text-on-surface-variant font-body">Manage your main page lines, contact info, and store metadata.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Store Details</CardTitle>
            <CardDescription>This information is used throughout the site and for SEO.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Store Name</label>
                <Input name="store_name" defaultValue={settings?.store_name} required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Contact Phone</label>
                <Input name="contact_phone" defaultValue={settings?.contact_phone} required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Contact Email</label>
              <Input name="contact_email" type="email" defaultValue={settings?.contact_email} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Store Description (SEO & Footer)</label>
              <textarea 
                name="store_description" 
                defaultValue={settings?.store_description} 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                required 
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Homepage Customization</CardTitle>
            <CardDescription>Update the text that appears on the main landing page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Hero Title (Main Heading)</label>
              <Input name="hero_title" defaultValue={settings?.hero_title} required />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Hero Subtitle</label>
              <textarea 
                name="hero_subtitle" 
                defaultValue={settings?.hero_subtitle} 
                className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                required 
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Shipping Banner Text (Top of page)</label>
              <Input 
                name="shipping_banner_text" 
                defaultValue={settings?.shipping_banner_text || ''} 
                placeholder="e.g. Free shipping on orders over ₹2000" 
              />
              <p className="text-xs text-muted-foreground">Leave blank to hide the banner.</p>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button type="submit" size="lg" disabled={saving}>
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </form>
    </div>
  )
}
