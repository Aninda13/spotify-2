import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
import { RecoilRoot } from 'recoil'
// Recoil is similar to Redux as we can lift certain components such as playlist.id higher than a certain level 
//we needed something like recoil or, redux to get that done or, (contex)
function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  return(
    <SessionProvider session={session}>
       <RecoilRoot>
          <Component {...pageProps} />
       </RecoilRoot>
    </SessionProvider>
  )
}

export default MyApp
