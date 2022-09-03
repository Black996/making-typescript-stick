export interface DataEntity {
  id: string;
}
export interface Movie extends DataEntity {
  director: string;
}
export interface Song extends DataEntity {
  singer: string;
}

export interface Comic extends DataEntity {
  mangaka: string;
}

export type DataEntityMap = {
  movie: Movie;
  song: Song;
};

export type DataEntities = keyof DataEntityMap;

type DataEntityMethods = {
  [k in keyof DataEntityMap as `get${Capitalize<k>}`]: (id:number)=>DataEntityMap[k] | undefined;
} &  {[k in DataEntities as `getAll${Capitalize<k>}s`]: ()=>DataEntityMap[k][];} & 
{[k in keyof DataEntityMap as `clear${Capitalize<k>}s`]: ()=>void;}
& {[k in keyof DataEntityMap as `add${Capitalize<k>}`]: (item: DataEntityMap[k])=>DataEntityMap[k];}

export class DataStore implements DataEntityMethods {
  movies:Movie[];
  songs:Song[];


  constructor(){
    this.movies = [];
    this.songs = [];
  }

  getSong(id:number){
    return this.songs[id];
  }

  getMovie(id:number){
    return this.movies[id];
  }

  getAllSongs(){
    return this.songs;
  }

  getAllMovies(){
    return this.movies;
  }

  addSong(item:Song){
    this.songs.push(item);
    return item;
  }

  addMovie(item:Movie){
    this.movies.push(item);
    return item;
  }

  clearMovies(){
    this.movies = [];
  }

  clearSongs(){
    this.songs = [];
  }
}
