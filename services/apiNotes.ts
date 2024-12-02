import supabase from './supabase'

export async function getNotes() {
  let { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    console.error(error)
    throw new Error('Notes could not be loaded')
  }
  return notes
}

export async function getNote(id: number) {
  let { data: notes, error } = await supabase
    .from('notes')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(error)
    throw new Error('Notes could not be loaded')
  }
  return notes
}

export async function createNote(note: {
  title: string
  content: string
  category_id: number
}) {
  const { data, error } = await supabase.from('notes').insert([note]).select()
  if (error) {
    console.log(error)
    throw new Error('Note could not be created!')
  }
  return data
}

export async function updateNote(updatedNote: {
  id: number
  title: string
  content: string
  category_id: number
  updated_at: Date
}) {
  const { id, ...dataUpdate } = updatedNote
  const { data, error } = await supabase
    .from('notes')
    .update(dataUpdate)
    .eq('id', id)
    .select()

  if (error) {
    console.log(error)
    throw new Error('Note could not be updated!')
  }

  return data
}

export async function deleteNote(id: Number) {
  const { data, error } = await supabase.from('notes').delete().eq('id', id)

  if (error) {
    console.error(error)
    throw new Error('Note could not be deleted')
  }
  return data
}
