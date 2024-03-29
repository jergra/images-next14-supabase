import Link from "next/link";
import { Button } from "./ui/button";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";


export default function NavAuthorized() {

	const logout = async () => {
		"use server";
		const supabse = await createSupabaseServerClient();
		await supabse.auth.signOut();
		redirect("/auth-server");
	};

	
  return (
    <div className='flex justify-between w-full bg-gray-100 h-16 items-center py-2 px-2 md:px-10 '>
		<div className='text-3xl md:text-5xl text-teal-300 hover:text-teal-200'><Link href="/">IMAGES</Link></div>
		<div className='flex  w-1/2 md:w-1/6 justify-between'>
			<Link href="/images"><Button className='bg-gray-900 text-primary-foreground shadow hover:bg-primary/90 mr-3'>Profile</Button></Link>
			<form action={logout}>
				<Button>SignOut</Button>
			</form>
		</div>
	</div>
  )
}
