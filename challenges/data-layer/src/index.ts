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
  [k in keyof DataEntityMap as `get${Capitalize<k>}`]: (id: string) => DataEntityMap[k] | undefined;
} & { [k in DataEntities as `getAll${Capitalize<k>}s`]: () => DataEntityMap[k][]; } 
  & { [k in keyof DataEntityMap as `clear${Capitalize<k>}s`]: () => void; }
  & { [k in keyof DataEntityMap as `add${Capitalize<k>}`]: (item: DataEntityMap[k]) => DataEntityMap[k]; }

type DataSources = { [k in keyof DataEntityMap]: Record<string, DataEntityMap[k]> };
export class DataStore implements DataEntityMethods {
  #ds: DataSources =
    {
      song: {},
      movie: {}
    };


  #isDefined<T>(arg: T | undefined):arg is T {
    return typeof arg !== 'undefined';
  }

  #dataEntityMapper<T extends keyof DataSources>(dataSource:DataSources[T]){
   return Object.keys(dataSource).map((source)=>dataSource[source]).filter(this.#isDefined);
  }

  getSong(id:string){
    return this.#ds.song[id];
  }

  getMovie(id:string){
    return this.#ds.movie[id];
  }

  getAllSongs(){
    return [];
  }

  getAllMovies(){
    return [];
  }

  addSong(item:Song){
    // this.songs.push(item);
    return item;
  }

  addMovie(item:Movie){
    // this.movies.push(item);
    return item;
  }

  clearMovies(){
    // this.movies = [];
  }

  clearSongs(){
    // this.songs = [];
  }
}
