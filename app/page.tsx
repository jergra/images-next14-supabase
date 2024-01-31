import Images from "@/components/Images";
import React from "react";
import { readUserSession } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";


export default async function page() {

	const { data } = await readUserSession();
	
	if (!data.session) {
		return redirect("/auth-server");
	}

	const logout = async () => {
		"use server";
		const supabse = await createSupabaseServerClient();
		await supabse.auth.signOut();
		redirect("/auth-server");
	};
	
	return (
		<div className="flex flex-col items-center h-full">
			<div className='flex justify-between w-full bg-gray-100 h-16 py-2 px-10 mb-10 items-center'>
				<div className='text-4xl md:text-5xl text-teal-400'>IMAGES</div>
				<div className='flex w-1/6 justify-between'>
					<Link href="/images"><Button className='bg-gray-900 text-primary-foreground shadow hover:bg-primary/90 mr-3'>Profile</Button></Link>
					<form action={logout}>
						<Button>SignOut</Button>
					</form>
				</div>
			</div>
			
			<Images />
		</div>
	);
}
