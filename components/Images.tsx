import Image from "next/image";
import { readImages } from "@/app/images/actions";
import Link from "next/link";

export default async function Images() {
	const { data } = await readImages();

	return (
		<div className="flex flex-wrap m-10 gap-10 pb-20 h-screen overflow-hidden overflow-y-scroll no-scrollbar">
			{data?.reverse().map((image, index) => {
				return (
					<div key={index}>
						<Link href={`/image/${image.id}`}
						>
							<Image
								src={image.url}
								width={398}
								height={398}
								alt=""
							/>
						</Link>
					</div>
				);
			})}
		</div>
	);
}
