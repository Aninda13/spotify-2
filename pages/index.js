import Sidebar from '../components/Sidebar'

export default function Home() {
  return (
    <div className="">
      <h1> This is a Spotify 2.0 Build</h1>
      <main>
        <Sidebar />
        {/* Center */}
      </main>
      <div> { /* Player */ } </div>
    </div>
  )
}
