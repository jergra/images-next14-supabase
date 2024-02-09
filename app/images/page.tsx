import AddImageForm from "./addImage-form";
import { deleteImageById, readImagesByUserId } from "./actions";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";
import NavAuthorized from "@/components/NavAuthorized";
import ChangeUsernameForm from "./changeUsername-form";
  

export default async function page() {

	const { data } = await readImagesByUserId();

	if (!data) {
		return redirect("/");
	}

	if (data.length) {
		const username = data[0].username
		const email = data[0].email

		return (
			<div className="flex flex-col items-center h-full">
				<NavAuthorized />
				<div className='flex flex-col items-center my-10'>
					<div className='mb-16'>
						<div className='bg-white text-gray-800'>
							Username:<span className='ml-2'>{username ? username : email}</span>
						</div>
						<ChangeUsernameForm />
					</div>
					<AddImageForm />
				</div>
				<div className="w-full flex flex-wrap px-10 mb-20 gap-10">
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
	} else {
		return (
			<div className="flex flex-col items-center h-full">
				<NavAuthorized />
				<div className='flex flex-col items-center my-10'>
					<AddImageForm />
				</div>
				<div className="w-full flex flex-wrap px-10 mb-20 gap-10">
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
}
