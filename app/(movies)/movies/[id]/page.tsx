import { getModifiedCookieValues } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { Suspense } from "react";
import MovieInfo, { getMovie } from "../../../../components/movie-info";
import MovieVideos from "../../../../components/movie-videos";

//1. function async
//2. fetch 함수 작성

// async function getMovie(id: string) {
//   console.log(`Fetching movies: ${Date.now()}`);
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   const response = await fetch(`${API_URL}/${id}`);
//   return response.json();
// }

// async function getVideos(id: string) {
//   console.log(`Fetching videos: ${Date.now()}`);
//   await new Promise((resolve) => setTimeout(resolve, 5000));
//   const response = await fetch(`${API_URL}/${id}/videos`);
//   return response.json();
// }

interface IParams {
  params: { id: string };
}

export async function generateMetadata({ params: { id } }: IParams) {
  const movie = await getMovie(id);
  return {
    title: movie.title,
  };
}

export default async function MovieDetailPage({ params: { id } }: IParams) {
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  return (
    <div>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        {/* @ts-expect-error Async Server Component */}
        <MovieInfo id={id} />
      </Suspense>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        {/* @ts-expect-error Async Server Component */}
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
