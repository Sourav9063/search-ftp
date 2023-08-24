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
        <div className="media">
          <AwesomeButton
            style={{ marginRight: "0px", width: "100%" }}
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
          <AwesomeButton
            style={{ width: "100%" }}
            text={"Check Global"}
            onClick={() => {
              setWhat("Checking Global Media");
              setWorking([]);
              setNotSure([]);
              // window.electron.checkLinks.send({
              //   links: mainData.live,
              //   type: "fast",
              // }); TODO: Change
              getWorkingNotSureFromList({
                setWorking,
                setNotSure,
                listOFLinks: mainData.globalMedia,
              });
            }}
          ></AwesomeButton>
        </div>

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
        .media {
          display: flex;
          justify-content: stretch;
          align-items: center;
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
