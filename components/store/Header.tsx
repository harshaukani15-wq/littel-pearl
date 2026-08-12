import { NAV_LINKS, STORE_NAME } from '@/lib/constants'
import { getStoreSettings } from '@/app/actions/settings'
import { HeaderClient } from './HeaderClient'

export async function Header() {
  const settings = await getStoreSettings()
  const storeName = settings?.store_name || STORE_NAME
  return <HeaderClient storeName={storeName} navLinks={NAV_LINKS} />
}
