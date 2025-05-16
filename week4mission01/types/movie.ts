export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
  }
  
  // 상세 정보용
  export interface MovieDetail {
    id: number;
    title: string;
    overview: string;
    poster_path: string;
    backdrop_path: string;
    release_date: string;
    vote_average: number;
    runtime: number;
  }
  
  // 출연진/감독용
  export interface Credit {
    id: number;
    name: string;
    profile_path: string;
    character?: string;
    job?: string;
  }
  