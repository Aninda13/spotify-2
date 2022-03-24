import useSpotify from "../hooks/useSpotify"
import { millisToMinutesAndSeconds } from "../lib/time";
import {colorStateAtom} from "../atoms/playlistAtom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from 'react';

function Song({order, track}) {
    const spotifyApi = useSpotify();
    const color = useRecoilState(colorStateAtom)
    const [newColor, setColor] = useState(null)
    useEffect(() => {
        setColor('bg-'+color[0].replace('from-', ''))
    } , [newColor])
    console.log("color: ", newColor)
  return (
    <div className={`grid grid-cols-2 px-5 py-4  hover:${'bg-'+color[0].replace('from-', '')} text-gray-500 `}>
        <div className="flex items-center space-x-4">
            <p> {order + 1}</p>
            <img className="h-10 w-10" src={track.track.album.images[0]?.url} alt="" />
            <div>
                <p className="w-36 lg:w-62  truncate text-white">{track.track.name}</p>
                <p className="w-40 ">{track.track.artists[0].name}</p>
            </div>
        </div>

        <div className="flex items-center justify-between ml-auto md:ml-0">
            <p className="w-40 hidden md:inline " >{ track.track.album.name }</p>
            <p>{millisToMinutesAndSeconds(track.track.duration_ms)}</p>
        </div>
    </div>
  )
}

export default Song