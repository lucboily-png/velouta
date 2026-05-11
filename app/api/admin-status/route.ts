import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  const { data } = await supabase
    .from('site_settings')
    .select('*')
    .eq('key', 'online_status')
    .single()

  return Response.json({
    online: data.value === 'true'
  })
}

export async function POST(req: Request) {
  const body = await req.json()

  await supabase
    .from('site_settings')
    .update({
      value: body.online ? 'true' : 'false'
    })
    .eq('key', 'online_status')

  return Response.json({ success: true })
}