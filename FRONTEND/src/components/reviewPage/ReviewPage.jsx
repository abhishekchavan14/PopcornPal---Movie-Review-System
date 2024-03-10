import React from "react";
import TopRatedMovies from "./TopRatedMovies";
import Container from "../Container";
import TopRatedWebSeries from "./TopRatedWebSeries";
import TopRatedDocumentaries from "./TopRatedDocumentaries";
import HeroSlideShow from "./HeroSlideShow";

export default function ReviewPage() {
  return (
    <div className="w-full h-full py-4 md:px-10 flex flex-col justify-center items-center">
      <div className="w-[100%] md:w-[80%]">
        <HeroSlideShow />
      </div>
      <div className="space-y-3 py-5">
        <TopRatedMovies />
        <TopRatedWebSeries />
        <TopRatedDocumentaries />
      </div>
    </div>
  );
}

// <div className="w-full h-full ">
//       <div className="bg-[#1e1e1e] fixed z-[-10] flex flex-col justify-center items-center text-white mt-5 p-10">
//         <div id="div1" className="border flex">
//           <div id="top-movies-webseries" >
//             <div id="slider">Slider</div>
//             <div id="movies-webseries">
//               <div id="movies">Movies</div>
//               <div id="web-series">Webseries</div>
//             </div>
//           </div>
//           <div id="review" className="border">Review</div>
//         </div>
//         <div id="div2" className="border">
//           <div id="documentaries">Documentaries</div>
//           <div id="tvseries">TV Series</div>
//         </div>
//         <div id="footer" className="border">Footer</div>
//       </div>
//     </div>
