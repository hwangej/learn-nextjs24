import { Suspense } from "react";
import { API_URL } from "../../../(home)/page";
import MovieInfo from "../../../../components/movie-info";
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

export default async function MovieDetail({
  params: { id },
}: {
  params: { id: string };
}) {
  // const [movie, videos] = await Promise.all([getMovie(id), getVideos(id)]);
  return (
    <div>
      <h3>Movie detail paige</h3>
      <Suspense fallback={<h1>Loading movie info</h1>}>
        {/* Next.js 서버 컴포넌트를 async로 감싸서 사용하게 되면 발생하는 에러임.
        React 컴포넌트는 jsx만 반환하는 것으로 알고있는 tyhpescript가 캐치하는에러임
        따라서 아래 except error를 넣으면 해당코드가 오류로 반환됨 */}
        {/* @ts-expect-error Async Server Component */}
        <MovieInfo id={id} />
      </Suspense>
      <h4>Videos</h4>
      <Suspense fallback={<h1>Loading movie videos</h1>}>
        {/* @ts-expect-error Async Server Component */}
        <MovieVideos id={id} />
      </Suspense>
    </div>
  );
}
