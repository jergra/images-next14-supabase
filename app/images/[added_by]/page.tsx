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
  
  const indx = images.data[0].email.indexOf('@')
  const userName = images.data[0].email.slice(0, indx)
  
  
  return (
    <div>
      {data.session ? (<NavAuthorized />) : (<Nav />)}
      
      <div className='m-10 text-lg'>Images added by <span className='font-bold'>{userName}</span></div>
  
      <div className="flex flex-wrap h-full gap-10 m-10">
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

