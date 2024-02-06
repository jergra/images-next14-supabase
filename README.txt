Jan 29, 2024

dev/images-next14-supabase

This is a multi-user images collection website.

It is derived from:
    Next.js 14 + @supabase/ssr: authencation, oauth, page protection,CRUD
    https://www.youtube.com/watch?v=PdmKlne1gRY

    by Daily Web Coding


Deployed:
    https://images-next14-supabase.vercel.app/


- Once deployed need to change homepage url from localhost  to deployed url
at github for OAuth purposes - personal settings - developer settings - OAuth Apps.
Also at Supabase, under Authentication - URL Configuration, change Site URL from 
localhost to deployed URL.
- See 'pricewise-web-scraper-nodemailer' project at your github for a fuller
example of the image/[id] structure.



to do:
- make it possible to add images from any source, perhaps storing images
    on Cloudinary. This would probably be a separate project.