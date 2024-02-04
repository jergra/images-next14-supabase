import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import Images from "@/components/Images";
import Nav from "@/components/Nav";

export default async function page() {

	const { data } = await readUserSession();

	if (data.session) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center h-full">
			<Nav />
			<Images />
		</div>
	);
}
