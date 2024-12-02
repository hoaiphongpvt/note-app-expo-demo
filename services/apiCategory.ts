import supabase from './supabase'

export async function getCategories() {
  let { data: categories, error } = await supabase.from('category').select('*')

  if (error) {
    console.error(error)
    throw new Error('Categories could not be loaded')
  }
  return categories
}
