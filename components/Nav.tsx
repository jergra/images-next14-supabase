import Link from "next/link";
import { Button } from "@/components/ui/button";


export default function Nav() {
  return (
    <div className='w-full flex justify-between h-16 items-center py-2 px-2 md:px-10 bg-gray-100'>
        <Link href='/auth-server'><div className='text-3xl md:text-5xl text-teal-300 hover:text-teal-400'>IMAGES</div></Link>
        <div className='flex justify-between w-2/3 md:w-2/5'>
            <Link href="/auth-server-form"><Button className='text-xs md:text-base bg-white text-gray-800 shadow hover:bg-gray-200 mr-2'>Auth Server</Button></Link>
            <Link href="/auth-client"><Button className='text-xs md:text-base bg-white text-gray-800 shadow hover:bg-gray-200 mr-2'>Auth Client</Button></Link>
            <Link href='/oauth'><Button className='text-xs md:text-base bg-white text-gray-800 shadow hover:bg-gray-200'>Signin with Github</Button></Link>
        </div>
    </div>
  )
}
