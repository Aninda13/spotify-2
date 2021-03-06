import { useRecoilValue } from "recoil"
import { playlistStateAtom } from "../atoms/playlistAtom";
import Song from "./Song";


function Songs() {
    const playlist = useRecoilValue(playlistStateAtom);
  return (
    <div className= " px-8 flex flex-col space-y-1 pb-27  text-white">
        {playlist?.tracks.items.map((track, i) => (
        <Song key={track.track.id} track={track} order={i} />
            
        ))}

    </div>
  );

}

export default Songs;