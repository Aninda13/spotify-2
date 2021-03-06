//Follow how to hide the  tailwind scroll bar hide ts: 1:54:40ish if the scroll bar pops up

import { ChevronDownIcon, LogoutIcon } from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { shuffle } from "lodash";
import {useState, useEffect} from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { playlistIdStateAtom, playlistStateAtom } from "../atoms/playlistAtom";
import useSpotify from "../hooks/useSpotify";
import Songs from "./Songs";

const colors = [
    "from-indigo-500",
    "from-blue-500",
    "from-green-500",
    "from-yellow-500",
    "from-purple-500",
    "from-pink-500",
    "from-red-500",
];

function Center() {
    const {data: session } = useSession()
    // const [color, setColor ] = useState(null)
    const [color, setColor] = useState(null)
    const spotifyApi = useSpotify();
    const playlistId = useRecoilValue(playlistIdStateAtom);
    const [playlist, setPlaylist] = useRecoilState(playlistStateAtom);
    useEffect(() => {
        setColor(shuffle(colors).pop())
    }, [playlistId]);

    useEffect(() => {
        spotifyApi.getPlaylist(playlistId)
        .then((data)=>{
            setPlaylist(data.body)
        }).catch((err) => console.log("something went pretty Wrong", err))
    }, [spotifyApi, playlistId]);
    // console.log('You clicked on certain playlist >>>>' , playlistId)
    // console.log("Curret PlaylistID: " , playlistId)
    // useEffect(() => {
    //     spotifyApi.getPlaylist('37i9dQZF1E4kGXrSFPHnA3').then((data)=>{
    //         console.log(data)
    //     }).catch((err) => {
    //         console.log("New error found from getplaylist: ", err)
    //     })
    // })
    // console.log("You clicked coming from center", playlist);
    // console.log("color from center", color);
  return (
    <div className="flex-grow h-screen overflow-y-scroll">
        <header className="absolute top-5 right-8">
            <div className="flex items-center bg-black space-x-3 opacity-500 hover:opacity-80 cursor-pointer 
            rounded-full p-1 pr-2 text-white" onClick={signOut}>
                <img className="rounded-full w-10 h-10" 
                src={session?.user.image} alt=""
                 />
                <h2>{session?.user.name}</h2>
                <LogoutIcon className="h-5 w-5 " />
            </div>
        </header>
        <section className={`flex items-end space-x-7 bg-gradient-to-b
         to-black ${color} h-80 text-white p-5`}
         >
             <img className="h-44 w-44 shadow-2xl" 
             src={playlist?.images?.[0]?.url} 
             alt="" />
            <div> 
                <p>PLAYLIST</p>
                <h1 className="text-2xl md:text-3xl xl:text-5xl font-bold"> {playlist?.name} </h1>
            </div>
        </section>
        <div>
            <Songs />
        </div>
    </div>
  )
}

export default Center