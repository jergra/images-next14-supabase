import { AuthForm } from "./components/AuthForm";
import { redirect } from "next/navigation";
import { readUserSession } from "@/lib/actions";
import NavAuth from "@/components/NavAuth";

export default async function page() {
	const { data } = await readUserSession();

	if (data.session) {
		return redirect("/");
	}

	return (
		<div className="flex flex-col items-center h-screen">
			<NavAuth />
			<div className="w-96 m-auto">
				<AuthForm />
			</div>
		</div>
	);
}
