import React, { useContext, useEffect, useState } from "react";
import { MainDataContext, useMainData } from "../provider/mainDataProvider";
import LinkItem from "./linkItem";
import AwesomeButton from "./awesomeButton";
import Or from "./Or";
import { getWorkingNotSureFromList } from "@/network/checkFunction/checkFunction";

export default function WorkingLinksList() {
  const {
    mainData,
    setMainData,
    what,
    setWhat,
    working,
    setWorking,
    notSure,
    setNotSure,
  } = useMainData();

  useEffect(() => {
    const handleCheckData = (event, message) => {
      if (message.message == "Working") {
        setWorking((state) => {
          return [...state, message];
        });
      }
      if (message.message == "Not Sure") {
        setNotSure((state) => {
          return [...state, message];
        });
      }
    };

    return () => {};
  }, []);

  return (
    <>
      <header>
        <Or>
          <h1>Working Links</h1>
        </Or>
      </header>

      {/* <button
        onClick={() => {
          console.log("init length")
          console.log(mainData.media.length);
          console.log(mainData.live.length);
          console.log("init length")

          mainData.mediaCol.forEach((element) => {
            if (
              !mainData.media.includes(element)
              // &&
              // !mainData.live.includes(element)
            ) {
              mainData.media.push(element);
            }
            console.log(mainData.media.length);
          });
          mainData.liveTvCol.forEach((element) => {
            if (!mainData.live.includes(element)) {
              mainData.live.push(element);
            }
            console.log(mainData.live.length);
          });
      

          window.electron.saveData.send(mainData);
        }}
      >
        PushCols
      </button>
      <button
        onClick={() => {
          mainData.mediaCol = [];
          mainData.liveTvCol = [];
        }}
      >
        ClearCols
      </button> 
      <button
        onClick={() => {
          mainData.media = mainData.media.filter((item, index) => {
            return mainData.media.indexOf(item) === index;
          });
          mainData.live = mainData.live.filter((item, index) => {
            return mainData.live.indexOf(item) === index;
          });
          console.log(mainData.media.length);
          console.log(mainData.live.length);

        }}
      >
        DltDup

      </button> 
      <button
        onClick={() => {

          window.electron.saveData.send(mainData);
        }}
      >
        SaveToTmp_0

      </button>  */}

      <div className="list">
        {what && (
          <div className="fvrtTitle">
            <Or>
              <h3>{what}</h3>
            </Or>
          </div>
        )}
        <AwesomeButton
          text={"Check LiveTV"}
          onClick={() => {
            setWhat("Checking LiveTV");
            setWorking([]);
            setNotSure([]);
            // window.electron.checkLinks.send({
            //   links: mainData.live,
            //   type: "fast",
            // }); TODO: Change
            getWorkingNotSureFromList({
              setWorking,
              setNotSure,
              listOFLinks: mainData.live,
              // listOFLinks: [
              //   "https://fnfonline.wixsite.com/fnfonline",
              //   "http://103.170.204.84",
              //   "https://goku.sx/home",
              // ],
            });
          }}
        ></AwesomeButton>
        <AwesomeButton
          color="#072ac8"
          text={"Check Media"}
          onClick={() => {
            setWhat("Checking Media");
            setWorking([]);
            setNotSure([]);
            // window.electron.checkLinks.send({
            //   links: mainData.media,
            //   type: "fast",
            // }); TODO: Change
            getWorkingNotSureFromList({
              setWorking,
              setNotSure,
              listOFLinks: mainData.media,
              // listOFLinks: [
              //   "https://fnfonline.wixsite.com/fnfonline",
              //   "http://103.170.204.84",
              //   "https://goku.sx/home",
              // ],
            });
          }}
        ></AwesomeButton>

        {/* <button
            onClick={() => {
              setWorking([]);
              setNotSure([]);
              window.electron.checkLinks.send({
                links: mainData.media,
                type: "fast",
              });
            }}
          >
            Check
          </button> */}
        {working.length > 0 && (
          <div className="h2">
            <h2>Working</h2>
            <p>({working.length})</p>
          </div>
        )}
        <div className="list-wrapper">
          {working &&
            working.map((link, index) => (
              <LinkItem
                type={link.message}
                media={link.link}
                key={index + "working"}
              />
            ))}
        </div>

        {notSure.length > 0 && (
          <div className="h2 not-working">
            <h2>{"Not Sure "}</h2>
            <p> ({notSure.length})</p>
          </div>
        )}

        <div className="list-wrapper">
          {notSure &&
            notSure.map((link, index) => (
              <LinkItem
                type={link.message}
                media={link.link}
                key={index + "notSure"}
              />
            ))}
        </div>
      </div>

      <style jsx>{`
        section {
          min-height: 100vh;
          display: grid;
          place-content: center;
          height: fit-content;
          border-left: 1px solid var(--border-color);
          padding: 0.5rem;
          width: 100%;
        }
        .h2 {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .h2 > h2 {
          padding-right: 0.5rem;
        }
        .not-working {
          margin-top: 1rem;
        }
        .fvrtTitle {
          margin-inline: 1rem;
          margin-bottom: 1rem;
          padding-block: 0.5rem;
          transition: all 0.4s ease;
        }
        @media (max-width: 600px) {
          .list-wrapper {
            display: flex;
            flex-direction: row;
            overflow: scroll;
          }
        }
      `}</style>
    </>
  );
}
