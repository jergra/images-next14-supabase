"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";


export async function addImage(url: string) {
	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("images").insert({ url }).single();
	revalidatePath("/images");
	return JSON.stringify(result);
}

export async function readImages() {
	noStore();
	const supabase = await createSupabaseServerClient();

	return await supabase.from("images").select("*");
}

export async function readImagesByUserId() {
	noStore();
	const supabase = await createSupabaseServerClient();

	const {data} = await supabase.auth.getSession();

	return await supabase.from("images").select("*").eq("added_by", data.session?.user.id);
}

export async function deleteImageById(id: string) {
	const supabase = await createSupabaseServerClient();
	await supabase.from("images").delete().eq("id", id);
	revalidatePath("/images");
}
