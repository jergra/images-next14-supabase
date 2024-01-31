import React from "react";
import AddImageForm from "./addImage-form";
import { deleteImageById, readImages, readImagesByUserId } from "./actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import Link from "next/link";
  

export default async function page() {

	const { data } = await readImagesByUserId();

	if (!data) {
		return redirect("/");
	}

	const logout = async () => {
		"use server";
		const supabse = await createSupabaseServerClient();
		await supabse.auth.signOut();
		redirect("/auth-server");
	};

	return (
		<div className="flex flex-col items-center h-full">
			<div className='flex justify-between w-full bg-gray-100 h-16 items-center py-2 px-10 mb-12'>
				<div className='text-4xl md:text-5xl text-teal-400'><Link href="/">IMAGES</Link></div>
				<div className='flex w-1/6 justify-between'>
					
					<Link href="/images"><Button className='bg-gray-900 text-primary-foreground shadow hover:bg-primary/90 mr-3'>Profile</Button></Link>
					<form action={logout}>
						<Button>SignOut</Button>
					</form>
				</div>
			</div>
			<div className='w-96'><AddImageForm /></div>
			<div className="w-full flex flex-wrap p-10 mb-10 gap-10">
				
				{data?.reverse().map((image, index) => {
					const deleteImage = deleteImageById.bind(null, image.id);
					return (
						<div key={index} className='flex'>
							<div>
								<Image
									src={image.url}
									width={530}
									height={530}
									alt=""
								/>
							</div>
							<form 
								action={deleteImage}
								className='pl-2'
							>
								<Button>X</Button>
							</form>
						</div>
					);
				})}
			</div>
		</div>
	);
}
