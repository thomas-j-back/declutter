// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.42.0?no-cach'


Deno.serve(async (req) => {
  const { email } = await req.json()
  
  if(!email) {
    return new Response(JSON.stringify({error: '"email" is required.'}),{status: 400});
  }

  const supabaseClient = createClient(
    Deno.env.get('REMOTE_URL')!,
    Deno.env.get('REMOTE_SERVICE_ROLE_KEY')!, // this key has admin privileges,
  );


  const { data, error} = await supabaseClient.from('profiles').select('email_confirmed_at', 'email').eq('email', email);

  if(!data || !data.length ) {
    return new Response(JSON.stringify({error: 'User with given email not found' }), {status: 404})
  }

  if(error){
    return new Response(JSON.stringify({error: 'Could not retrieve user: ' + error.message }), {status: 404})

  }

  return new Response(
    JSON.stringify({emailConfirmedAt: data[0].email_confirmed_at}),
    {status: 200}
  )

})

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/isUserConfirmed' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
