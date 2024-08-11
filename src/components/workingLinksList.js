import React, { useContext, useEffect, useRef, useState } from "react";
import { MainDataContext, useMainData } from "../provider/mainDataProvider";
import LinkItem from "./linkItem";
import AwesomeButton from "./awesomeButton";
import Or from "./Or";
import { getWorkingNotSureFromList } from "@/network/checkFunction/checkFunction";
import { useOnScreen } from "@/hooks/useOnScreen";
import { itemTypes } from "@/constants/strings";
import Search from "@/components/search/Search";

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

  const [notSureShowCount, setNotSureShowCount] = useState(10);
  const [workingShowCount, setWorkingShowCount] = useState(100);
  const [type, setType] = useState(itemTypes.MEDIA);

  return (
    <>
      <header>
        <Or>
          <h1>Working Links</h1>
        </Or>
      </header>
      {working.length > 0 && (
        <>
          <header>
            <Or>
              <h1>Search</h1>
            </Or>
          </header>
          <Search
            mainData={{ working: working.map((link) => link.link) }}
            listId="workingList"
          />
        </>
      )}
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
            setType(itemTypes.LIVE);
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
              setType(itemTypes.MEDIA);
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
              setType(itemTypes.GLOBAL_MEDIA);
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
          {working?.length > 0 &&
            working
              .slice(0, workingShowCount)
              .map((link, index) => (
                <LinkItem
                  type={link.message}
                  media={link.link}
                  key={index + "working"}
                  itemType={type}
                />
              ))}
          {working?.length > 100 && workingShowCount != working.length && (
            <div
              className="showAll"
              onClick={() => {
                setWorkingShowCount((state) => {
                  return Math.min(state + 100, working.length);
                });
              }}
            >
              <Or>
                <p>{true ? "Show More" : "Loaded"}</p>
              </Or>
            </div>
          )}
        </div>

        {notSure?.length > 0 && (
          <div className="h2 not-working">
            <h2>{"Not Sure "}</h2>
            <p> ({notSure.length})</p>
          </div>
        )}

        <div className="list-wrapper">
          {notSure?.length > 0 &&
            notSure
              .slice(0, notSureShowCount)
              .map((link, index) => (
                <LinkItem
                  type={link.message}
                  media={link.link}
                  key={index + "notSure"}
                />
              ))}
          {notSure?.length > 10 && notSureShowCount != notSure.length && (
            <div
              className="showAll"
              onClick={() => {
                setNotSureShowCount((state) => {
                  return Math.min(state + 100, notSure.length);
                });
              }}
            >
              <Or>
                <p>Show More</p>
              </Or>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .showAll {
          cursor: pointer;
          margin-inline: 1rem;
          margin-block: 1rem;
          padding-block: 0.5rem;
          transition: all 0.4s ease;
        }
        .showAll:hover {
          color: var(--hover-bg-color);
          margin-inline: 0px;
        }
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
