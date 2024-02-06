'use client'

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
import { changeUsername } from "./actions"


const FormSchema = z.object({
	newUsername: z.string(),
});

export default function ChangeUsernameForm() {

	const [isPending, startTransition] = useTransition();

	const form = useForm<z.infer<typeof FormSchema>>({
		resolver: zodResolver(FormSchema),
		defaultValues: {
			newUsername: "",
		},
	});

	function onSubmit(data: z.infer<typeof FormSchema>) {

		startTransition(async () => {
            const result = await changeUsername(data.newUsername);
			const { error, data: images } = JSON.parse(result);

			if (error?.message) {
				toast({
					variant: "destructive",
					title: "Failed to change username",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">{error.message}</code>
						</pre>
					),
				});
			} else {
				toast({
					title: "You successfully changed your username.",
					description: (
						<pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
							<code className="text-white">
								{data.newUsername} is your username
							</code>
						</pre>
					),
				});
				form.reset();
			}
		});
	}

	return (
		<div>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
                    className='flex'
				>
					 <FormField
						control={form.control}
						name="newUsername"
						render={({ field }) => (
							<FormItem>
								<FormLabel></FormLabel>
								<FormControl>
									<Input
										placeholder="new username"
										{...field}
										onChange={field.onChange}
                                        className='w-40'
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type="submit" className='ml-4 mt-2'>
						Update
						<AiOutlineLoading3Quarters
							className={cn(" animate-spin", { hidden: !isPending })}
						/>
					</Button>
				</form>
			</Form>
		</div>
	);
}
