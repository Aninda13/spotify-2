import { useSession , signIn } from 'next-auth/react'
import {useEffect} from 'react'
import SpotifyWebApi from 'spotify-web-api-node';
// import spotifyApi from '../lib/spotify';

// UseSpotify.js will contain the basic spotify player control logic 

function useSpotify() {
    const { data: session, status } = useSession();
    const spotifyApi = new SpotifyWebApi({
        clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
        clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
    })

    useEffect(() => {
        if(session){
            // If refresh Access token Attemp fails then direct the users to login
            if (session.error === "RefreshAccessTokenError"){
                signIn();
            }
            spotifyApi.setAccessToken(session.user.setAccessToken);
        }
    }, [session]);

  return spotifyApi;
}

export default useSpotify