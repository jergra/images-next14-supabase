"use server";

import { readUserSession } from "@/lib/actions";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { unstable_noStore as noStore, revalidatePath } from "next/cache";


export async function addImage(url: string, description: string, wiki_info_url: string) {
	const { data } = await readUserSession();
	const email = data.session?.user.email

	const index = email?.indexOf('@')
  	const username = email?.slice(0, index)

	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("images").insert({ url, description, wiki_info_url, email, username }).single();
	revalidatePath("/images");
	return JSON.stringify(result);
}

export async function changeUsername(newUsername: string) {
	const { data } = await readUserSession();
	const email = data.session?.user.email

	const supabase = await createSupabaseServerClient();
	const result = await supabase.from("images").update({ username: newUsername }).eq("email", email);
  
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

export async function readImagesByAddedBy(added_by: string) {
	noStore();
	const supabase = await createSupabaseServerClient();

	return await supabase.from("images").select("*").eq("added_by", added_by);
}

export async function readImageById(id: string) {
	noStore();
	const supabase = await createSupabaseServerClient();
	return await supabase.from("images").select().eq("id", id);
}

export async function deleteImageById(id: string) {
	const supabase = await createSupabaseServerClient();
	await supabase.from("images").delete().eq("id", id);
	revalidatePath("/images");
}
