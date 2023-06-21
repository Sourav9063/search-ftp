import React, { useContext } from "react";
import { MainDataContext } from "../provider/mainDataProvider";

export default function LikeButton({ media }) {
  const { mainData, setMainData } = useContext(MainDataContext);
  const includedInMediaFvrt = mainData.mediaFvrt?.includes(media);
  const includedInLiveFvrt = mainData.liveFvrt?.includes(media);
  return (
    <>
      <div
        title="Add to favorites"
        className={`third ${
          (mainData.mediaFvrt != undefined && includedInMediaFvrt) ||
          includedInLiveFvrt
            ? "fav"
            : ""
        }`}
        onClick={(e) => {
          console.log(media);
          e.preventDefault();
          e.stopPropagation();
          const includedInMedia = mainData.media?.includes(media);
          // const includedInLive = mainData.live?.includes(media);
          // setMainData((state) => {
          //   if (includedInMedia) {
          //     const fav =
          //       state.mediaFvrt != undefined && state.mediaFvrt
          //         ? state.mediaFvrt
          //         : [];
          //     if (mainData.mediaFvrt != undefined && !includedInMediaFvrt) {
          //       fav.push(media);
          //     } else {
          //       const index = fav.indexOf(media);
          //       fav.splice(index, 1);
          //     }
          //     // const fav = [];
          //     const newState = { ...state, mediaFvrt: fav };
          //     localStorage.setItem("mediaFvrt", JSON.stringify(fav || []));

          //     // window.electron.saveData.send(newState); TODO::change
          //     return newState;
          //   } else {
          //     const fav =
          //       state.liveFvrt != undefined && state.liveFvrt
          //         ? state.liveFvrt
          //         : [];
          //     if (mainData.liveFvrt != undefined && !includedInLiveFvrt) {
          //       fav.push(media);
          //     } else {
          //       const index = fav.indexOf(media);
          //       fav.splice(index, 1);
          //     }
          //     // const fav = [];
          //     const newState = { ...state, liveFvrt: fav };
          //     localStorage.setItem("liveFvrt", JSON.stringify(fav || []));
          //     // window.electron.saveData.send(newState); TODO::change
          //     return newState;
          //   }
          // });

          if (includedInMedia) {
            const fav =
              mainData.mediaFvrt != undefined && mainData.mediaFvrt
                ? mainData.mediaFvrt
                : [];
            if (mainData.mediaFvrt != undefined && !includedInMediaFvrt) {
              fav.push(media);
            } else {
              const index = fav.indexOf(media);
              fav.splice(index, 1);
            }
            // const fav = [];
            const newState = { ...mainData, mediaFvrt: fav };
            localStorage.setItem("mediaFvrt", JSON.stringify(fav || []));
            setMainData(newState);
          } else {
            const fav =
              mainData.liveFvrt != undefined && mainData.liveFvrt
                ? mainData.liveFvrt
                : [];
            if (mainData.liveFvrt != undefined && !includedInLiveFvrt) {
              fav.push(media);
            } else {
              const index = fav.indexOf(media);
              fav.splice(index, 1);
            }
            // const fav = [];
            const newState = { ...mainData, liveFvrt: fav };
            localStorage.setItem("liveFvrt", JSON.stringify(fav || []));

            setMainData(newState);
          }

          // setIsAlreadyFvrt(!isAlreadyFvrt);
        }}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <g>
            <path d="M16.697 5.5c-1.222-.06-2.679.51-3.89 2.16l-.805 1.09-.806-1.09C9.984 6.01 8.526 5.44 7.304 5.5c-1.243.07-2.349.78-2.91 1.91-.552 1.12-.633 2.78.479 4.82 1.074 1.97 3.257 4.27 7.129 6.61 3.87-2.34 6.052-4.64 7.126-6.61 1.111-2.04 1.03-3.7.477-4.82-.561-1.13-1.666-1.84-2.908-1.91zm4.187 7.69c-1.351 2.48-4.001 5.12-8.379 7.67l-.503.3-.504-.3c-4.379-2.55-7.029-5.19-8.382-7.67-1.36-2.5-1.41-4.86-.514-6.67.887-1.79 2.647-2.91 4.601-3.01 1.651-.09 3.368.56 4.798 2.01 1.429-1.45 3.146-2.1 4.796-2.01 1.954.1 3.714 1.22 4.601 3.01.896 1.81.846 4.17-.514 6.67z"></path>
          </g>
        </svg>
      </div>
      <style jsx>{`

        .third > svg {
          box-sizing: content-box;
          width: 1.5rem;
          padding: 0.5rem;
          margin-right: 0.3rem;
          background-color: ${
            includedInMediaFvrt || includedInLiveFvrt ? "crimson" : ""
          };
          border-radius: 1000000px;
          transition: all 0.3s ease-in-out;
        }
        
        }

        .third:hover > svg {
          background-color: rgba(220, 20, 60, 0.253);
          fill: crimson;

          padding: 0.5rem;
        }
        .fav {
          color: rgb(255, 255, 255);
          fill: rgb(255, 255, 255);
        }
        .fav:hover>svg{
          color: rgb(255, 255, 255);
          fill: rgb(255, 255, 255);
        }
      `}</style>
    </>
  );
}
