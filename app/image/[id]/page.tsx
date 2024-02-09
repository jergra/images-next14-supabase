import { readImageById } from "@/app/images/actions"
import Nav from "@/components/Nav"
import NavAuthorized from "@/components/NavAuthorized"
import { readUserSession } from "@/lib/actions"
import Image from "next/image"
import Link from "next/link"

type Props = {
  params: { id: string }
}

export default async function page({ params: { id } }: Props) {

  const { data } = await readUserSession();

  const image: any = await readImageById(id)

  const username = image.data[0].username
  
  return (
    <div>
      {data.session ? (<NavAuthorized />) : (<Nav />)}
      <div className='flex flex-col md:flex-row m-10'>
        <Image
          src={image.data[0].url}
          width={700}
          height={700}
          alt=""
        />
        <div className='md:ml-20 md:w-1/4'>
          <div className='my-4 md:mb-4 md:mt-0'>{image.data[0].description}</div>
          <div className='mb-12 text-blue-700'>
            <Link href={image.data[0].wiki_info_url} target="_blank">
              Wikipedia page
            </Link>
          </div>
          <div>
            Added by: <span className='text-blue-700 ml-1'><Link href={`/images/${image.data[0].added_by}`}>{username}</Link></span>
          </div>
        </div>
      </div>
    </div>
  )
}

