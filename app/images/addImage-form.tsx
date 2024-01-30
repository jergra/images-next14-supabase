"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { addImage } from "./actions";

const FormSchema = z.object({
	url: z.string().min(1, {
		message: "Password is required.",
	}),
});

export default function AddImageForm() {
	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			url: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {
		startTransition(async () => {
			const result = await addImage(data.url);
			const { error, data: images } = JSON.parse(result);

			if (error?.message) {
				toast({
					variant: "destructive",
					title: "Failed to add image",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error.message}</code>
						</pre>
					),
				});
			} else {
				toast({
					title: "You successfully added an image.",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{data.url} added
							</code>
						</pre>
					),
				});
				form.reset();
			}
		});
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="w-full space-y-6"
			>
				<FormField
					control={form.control}
					name="url"
					render={({ field }) => (
						<FormItem>
							<FormLabel></FormLabel>
							<FormControl>
								<Input
									placeholder="Wikipedia 'Copy Image Link' URL"
									{...field}
									onChange={field.onChange}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit" className="w-full flex gap-2">
					Add Image
					<AiOutlineLoading3Quarters
						className={cn(" animate-spin", { hidden: !isPending })}
					/>
				</Button>
			</form>
		</Form>
	);
}
