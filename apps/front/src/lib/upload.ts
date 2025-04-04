import {createClient} from '@supabase/supabase-js'

export async function uploadThumbnail(image: File) {
  const supabaseUrl = process.env.SUPABASE_URL ?? ""
  const supabaseKey = process.env.SUPABASE_API_KEY ?? ""
  const supabaseBucket = process.env.SUPABASE_BUCKET ?? ""

  const supabase = createClient(
    supabaseUrl,
    supabaseKey
  )

  const data
    = await supabase
    .storage
    .from(supabaseBucket)
    .upload(`${image.name}_${Date.now()}`, image)

  if (!data?.data?.path) throw new Error("Failed to upload file")

  const urlData
    = supabase
    .storage
    .from(supabaseBucket)
    .getPublicUrl(data?.data?.path)

  return urlData.data.publicUrl
}