import { AuthForm } from "./components/AuthForm";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import Nav from "@/components/Nav";

export default async function page() {
	const { data } = await readUserSession();

	if (data.session) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center h-screen">
			<Nav />
			<div className="w-80 md:w-96 m-auto">
				<AuthForm />
			</div>
		</div>
	);
}
