import React from "react";
import { AuthForm } from "./components/AuthForm";

import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function page() {
	const { data } = await readUserSession();

	if (data.session) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center h-screen">
			<div className='w-full flex justify-between h-16 items-center py-2 px-10 bg-gray-100'>
				<div className='text-5xl text-teal-400'>IMAGES</div>
				<div className='flex justify-between w-2/5'>
					<Link href="/auth-server"><Button className='bg-white text-gray-800 shadow hover:bg-primary/10'>Auth Server</Button></Link>
					<Link href="/auth-client"><Button className='bg-primary/10 text-gray-800 shadow hover:bg-primary/10'>Auth Client</Button></Link>
					<Link href="/oauth"><Button className='bg-white text-gray-800 shadow hover:bg-primary/10'>Signin with Github</Button></Link>
				</div>
			</div>
			<div className="w-96 m-auto">
				<AuthForm />
			</div>
		</div>
	);
}
