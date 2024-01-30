Jan 29, 2024

dev/images-next14-supabase

this is an images collection website

it is derived from:
    Next.js 14 + @supabase/ssr: authencation, oauth, page protection,CRUD
    https://www.youtube.com/watch?v=PdmKlne1gRY

    by Daily Web Coding


once deployed need to change homepage url from localhost  to deployed url
at github for OAuth purposes - personal settings - developer settings - OAuth Apps - 
Might need to change url at app/auth-server/actions/index.ts line 33 as well.


to do:
- deploy 
- change 'photo' and 'todo' terminology to 'image' 
- add homepage logo e.g. 'wikipedia images' 
- make images open in new page with more info
- favicon