import { getAdminCategories } from '@/app/actions/categories'
import NewProductForm from './NewProductForm'

export default async function NewProductPage() {
  const categories = await getAdminCategories()

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <NewProductForm categories={categories} />
    </div>
  )
}
