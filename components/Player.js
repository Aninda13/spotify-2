import {useState, useEffect} from 'react'
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useSession } from 'next-auth/react';
import useSongInfo from '../hooks/useSongInfo';

function Player() {
    const spotifyApi = useSpotify();
    const {data:session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();
    console.log("Songinfo from player" ,songInfo);
  return (
    <div>
        {/* {Left Side} */}
        <div>
            <img className='hidden md:inline h-10 w-10' src={songInfo?.album.images?.[0]?.url} alt="" />
        </div>
    </div>
  )
}

export default Player;