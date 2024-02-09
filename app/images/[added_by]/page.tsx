import { readImagesByAddedBy } from "@/app/images/actions"
import Nav from "@/components/Nav";
import NavAuthorized from "@/components/NavAuthorized";
import { readUserSession } from "@/lib/actions";
import Image from "next/image"
import Link from "next/link";

type Props = {
  params: { added_by: string }
}

export default async function page({ params: { added_by } }: Props) {

  const { data } = await readUserSession();

  const images: any = await readImagesByAddedBy(added_by);
  
  const username = images.data[0].username
  
  
  return (
    <div>
      {data.session ? (<NavAuthorized />) : (<Nav />)}
      
      <div className='m-10 text-lg'>Images added by <span className='font-bold'>{username}</span></div>
  
      <div className="flex flex-wrap h-full gap-10 m-10 mb-20">
        {images.data?.reverse().map((image: any, index: any) => {
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
      
    </div>
  )
}

