import Images from "@/components/Images";
import React from "react";
import { readUserSession } from "@/lib/actions";
import { redirect } from "next/navigation";
import Nav from "@/components/Nav";
import NavAuthorized from "@/components/NavAuthorized";

export default async function page() {

	const { data } = await readUserSession();
	
	if (!data.session) {
		return redirect("/auth-server");
	}

	return (
		<div className="flex flex-col items-center h-full">
			{data.session ? (<NavAuthorized />) : (<Nav />)}
			<Images />
		</div>
	);
}
