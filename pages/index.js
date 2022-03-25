import { getSession } from 'next-auth/react'
import Center from '../components/Center'
import Player from '../components/Player';
import Sidebar from '../components/Sidebar'


export default function Home() {
  return (
    <div className="bg-black h-screen overflow-hidden">
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>
      <div className='sticky bottom-0'> 
        <Player />
      </div>
    </div>
  )
}

// this allows the server side predrendering done so that the 
// playlist is loaded beforehand and session is being passed
export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session
    }
  }
}
