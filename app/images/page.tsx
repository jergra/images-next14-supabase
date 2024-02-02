import React from "react";
import AddImageForm from "./addImage-form";
import { deleteImageById, readImages, readImagesByUserId } from "./actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
  

export default async function page() {

	const { data } = await readImagesByUserId();

	if (!data) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center h-full">
			<Nav />
			<div className='w-96'>
				<AddImageForm />
			</div>
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
