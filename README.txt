Jan 29, 2024

dev/images-next14-supabase

This is an images collection website.

It is derived from:
    Next.js 14 + @supabase/ssr: authencation, oauth, page protection,CRUD
    https://www.youtube.com/watch?v=PdmKlne1gRY

    by Daily Web Coding


Deployed:
    https://images-next14-supabase.vercel.app/


Once deployed need to change homepage url from localhost  to deployed url
at github for OAuth purposes - personal settings - developer settings - OAuth Apps.
Also at Supabase, under Authentication - URL Configuration, change Site URL from 
localhost to deployed URL.



to do:
- make images open in new page with more info
- have images on unauthenticated page, Auth-Server and Auth-Client will
    pop over when clicked in nav
- make it possible to add images from any source, perhaps storing images
    on Cloudinary. This would probably be a separate project.