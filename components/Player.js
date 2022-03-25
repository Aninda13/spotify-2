import {useState, useEffect} from 'react'
import useSpotify from '../hooks/useSpotify';
import { useRecoilState } from 'recoil';
import { currentTrackIdState, isPlayingState } from '../atoms/songAtom';
import { useSession } from 'next-auth/react';
import useSongInfo from '../hooks/useSongInfo';
import {  ReplyIcon,  SwitchHorizontalIcon } from '@heroicons/react/outline';
import { FastForwardIcon, PlayIcon, PauseIcon, RewindIcon } from '@heroicons/react/solid';

function Player() {
    const spotifyApi = useSpotify();
    const {data:session, status } = useSession();
    const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackIdState);
    const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
    const [volume, setVolume] = useState(50);

    const songInfo = useSongInfo();
    console.log("Songinfo from player" ,songInfo);
    const fetchCurrentSong = () => {
        if(!songInfo){
            spotifyApi.getMyCurrentPlayingTrack().then((data) => 
            {   console.log("Now Playing: ", data.body?.item);
                setCurrentTrackId(data.body?.item?.id);

                spotifyApi.getMyCurrentPlaybackState().then((data) => {
                    setIsPlaying(data.body?.is_playing);
                })
            });
        }
    }
    const handlePlayPause = () => {
        spotifyApi.getMyCurrentPlaybackState().then((data) => {
            if(data.body?.is_playing){
                spotifyApi.pause();
                setIsPlaying(false);
            } else {
                spotifyApi.play();
                setIsPlaying(true);
            }
        });
    };
    useEffect(() => {
        if (spotifyApi.getAccessToken() && !currentTrackId) {
            fetchCurrentSong();
            setVolume(50);
        }
    } , [currentTrackId, spotifyApi, session]);
  return (
    <div className='h-24 bg-gradient-to-b from-black to-gray-900 text-white  
    grid grid-cols-3 text-xs md:text-base px-2 md:px-8 pb-0'>
        {/* {Left Side} */}
        <div className="flex items-center space-x-4">
            <img className='hidden md:inline h-10 w-10' 
            src={songInfo?.album.images?.[0]?.url} 
            alt="" />
            <div>
                <h3>{songInfo?.name}</h3>
                <p>{songInfo?.artists?.[0]?.name}</p>
            </div>
        </div>
        {/* { Center} */}
        <div className='flex items-center justify-evenly'>
            <SwitchHorizontalIcon className='button' />
            <RewindIcon 
            // onClick={() => spotifyApi.skipToPrevious()}
            className='button' />

            {/* // isPlaying is supposed to interChange the buttons 
            // but a bug is cause the pause button to over inflate in size
            // but only when the isPlay is true 
            // to be fixed in the future */}
            {/* {isPlaying ? 
            (< PauseIcon classname="button" />):
            (< PlayIcon className="button h-10 w-10"/>)} */}

            <PlayIcon onClick={handlePlayPause} className='button h-10 w-10'/>

            <FastForwardIcon 
            // onClick={() => spotifyApi.skipToNext()}
            className='button'/>
            <ReplyIcon className='button' />
        </div>
    </div>
  )
}

export default Player;