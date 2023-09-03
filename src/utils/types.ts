export interface IResult {
    id: number;
    readable: boolean;
    title: string;
    title_short: string;
    title_version: string;
    link: string;
    duration: number;
    rank: number;
    explicit_lyrics: boolean;
    explicit_content_lyrics: number
    preview: string;
    md5_image: string;
    artist: IArtist;
    album?: IAlbum;
    type: string;
}


export interface IArtist {
    id: number;
    name: string;
    link: string;
    picture: string;
    picture_small:string;
    picture_medium:string;
    picture_big: string;
    picture_xl: string;
    tracklist: string;
    type: string;
    nb_album?: number;
    nb_fan?: number;
    radio?: boolean;
    share?: string;
}

export interface IAlbum {
    id: number;
    title: string;
    cover: string;
    md5_image: string;
    cover_small:string;
    cover_medium:string;
    cover_big: string;
    cover_xl: string;
    tracklist: string;
    type: string;
    release_date?: string;
}