import { atom } from "recoil";

// Atom is like a section of a global state from which we can put/pull data out any time we want

export const playlistStateAtom = atom({
    key: "playlistState",
    default: null,

});

export const playlistIdStateAtom = atom({
    key: "playlistIdState",
    default: "6zQo5HVhHBCT4rKmqsOZi9",
})

