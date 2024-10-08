import Link from "next/link";
import { useState, useEffect, useContext } from "react";
import useOnlineStatus from "../hooks/useOnlineStatus";
import Offline from "../components/offline";
import { MainDataContext } from "../provider/mainDataProvider";
import LinkItem from "../components/linkItem";
import WorkingLinksList from "../components/workingLinksList";
import Or from "../components/Or";
import { getStaticDataFromGitHub } from "@/network/static/staticdata";
import useIsMobile from "@/hooks/useIsMobile";
import { itemTypes } from "@/constants/strings";
import Search from "@/components/search/Search";

export async function getStaticProps() {
  const { mainData, error } = await getStaticDataFromGitHub();
  return {
    props: {
      mainData,
      error,
    },
    revalidate: 24 * 60 * 60,
  };
}

const Home = (props) => {
  const [liveShowCount, setLiveShowCount] = useState(5);
  const [mediaShowCount, setMediaShowCount] = useState(5);
  const [globalMediaShowCount, setGlobalMediaShowCount] = useState(5);

  const { mainData, setMainData } = useContext(MainDataContext);
  const isMobile = useIsMobile();

  const online = useOnlineStatus();
  useEffect(() => {
    setMainData(props.mainData);
  }, [props.mainData, setMainData]);

  return (
    <>
      {!online ? (
        <Offline />
      ) : (
        <>
          <header>
            <h1>FTP SEARCHER</h1>
            {!mainData && (
              <div className="showAll">
                <Or>LOADING</Or>
              </div>
            )}
            <section className="updatesection">
              <div>To check insecure website follow the guide.</div>
              <Link
                // onClick={(e) => {
                //   e.preventDefault();
                //   window.electron.openExternal(
                //     "/about"
                //   );
                // }}
                href="/guide"
              >
                <div className="showAll developed update">
                  <Or>Guide</Or>
                </div>
              </Link>
            </section>
          </header>
          <main>
            <section>
              <header>
                <Or>
                  <h1>All LiveTV Links</h1>
                </Or>
              </header>
              <div className="list list-wrapper">
                {mainData &&
                  mainData.live
                    ?.slice(0, liveShowCount)
                    .map((live, index) => (
                      <LinkItem
                        key={index + "All Links"}
                        media={live}
                        itemType={itemTypes.LIVE}
                      ></LinkItem>
                    ))}
              </div>

              <div
                className="showAll"
                onClick={() => {
                  setLiveShowCount((state) => {
                    return state == 5 ? mainData.live?.length : 5;
                  });
                }}
              >
                <Or>
                  <p>
                    {liveShowCount == 5 ? "Show All LiveTV" : "Hide All LiveTV"}
                  </p>
                </Or>
              </div>

              <header>
                <Or>
                  <h1>All Media Links</h1>
                </Or>
              </header>
              <div className="list">
                <div className="list-wrapper">
                  {mainData &&
                    mainData.media
                      ?.slice(0, mediaShowCount)
                      .map((media, index) => (
                        <LinkItem
                          bgColor="#355cdd"
                          key={index + "All Links"}
                          media={media}
                          itemType={itemTypes.MEDIA}
                        ></LinkItem>
                      ))}
                </div>
              </div>
              <div
                className="showAll"
                onClick={() => {
                  setMediaShowCount((state) => {
                    return state == 5 ? mainData.media?.length : 5;
                  });
                }}
              >
                <Or>
                  <p>
                    {mediaShowCount == 5 ? "Show All Media" : "Hide All Media"}
                  </p>
                </Or>
              </div>
              <header>
                <Or>
                  <h1>All Global Media Links</h1>
                </Or>
              </header>
              <div className="list">
                <div className="list-wrapper">
                  {mainData &&
                    mainData.globalMedia
                      ?.slice(0, globalMediaShowCount)
                      .map((media, index) => (
                        <LinkItem
                          bgColor="#003566"
                          key={index + "All Links"}
                          media={media}
                          itemType={itemTypes.GLOBAL_MEDIA}
                        ></LinkItem>
                      ))}
                </div>
              </div>
              {mainData?.globalMedia?.length > 5 &&
                globalMediaShowCount != mainData?.globalMedia.length && (
                  <div
                    className="showAll"
                    onClick={() => {
                      setGlobalMediaShowCount((state) => {
                        return Math.min(
                          state + 100,
                          mainData?.globalMedia?.length
                        );
                      });
                    }}
                  >
                    <Or>
                      <p>{"Show More Global Media"}</p>
                    </Or>
                  </div>
                )}
            </section>
            {!isMobile && (
              <section>
                <WorkingLinksList></WorkingLinksList>
              </section>
            )}
            <section>
              <header>
                <Or>
                  <h1>Search</h1>
                </Or>
              </header>
              <Search listId="globalList" mainData={mainData} />
              <header>
                <Or>
                  <h1>Favorites</h1>
                </Or>
              </header>
              {(mainData?.mediaFvrt != undefined &&
                mainData.mediaFvrt?.length > 0) ||
              (mainData?.liveFvrt != undefined &&
                mainData.liveFvrt?.length > 0) ? (
                <div className="list">
                  {mainData.liveFvrt?.length > 0 && (
                    <>
                      <div className="fvrtTitle">
                        <Or>
                          <h3>LiveTV Favorites</h3>
                        </Or>
                      </div>

                      <div className="list-wrapper">
                        {mainData &&
                          mainData.liveFvrt?.map((media, index) => (
                            <LinkItem
                              key={index + "All Links"}
                              media={media}
                              itemType={itemTypes.LIVE}
                            ></LinkItem>
                          ))}
                      </div>
                    </>
                  )}
                  {mainData.mediaFvrt?.length > 0 && (
                    <>
                      <div className="fvrtTitle fvrtTitle-2">
                        <Or>
                          <h3>Media Favorites</h3>
                        </Or>
                      </div>

                      <div className="list-wrapper">
                        {mainData &&
                          mainData.mediaFvrt?.map((media, index) => (
                            <LinkItem
                              bgColor="#fb8b24"
                              key={index + "All Links"}
                              media={media}
                              itemType={itemTypes.MEDIA}
                            ></LinkItem>
                          ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="fvrtTitle fvrtTitle-2">
                  <Or>
                    <div>No Favorites</div>
                  </Or>
                </div>
              )}
            </section>
            {isMobile && (
              <section>
                <WorkingLinksList></WorkingLinksList>
              </section>
            )}
          </main>
          <Link
            // onClick={(e) => {
            //   e.preventDefault();
            //   // window.open(
            //   //   "https://sourav9063.github.io/my_portfolio/",
            //   //   "_blank",
            //   //   "width=1600, height=900"
            //   // );
            //   window.electron.openExternal(
            //     "https://sourav9063.github.io/my_portfolio/"
            //   );
            // }}
            href="https://sourav9063.github.io/my_portfolio/"
            target="_blank"
          >
            <div className="showAll developed">
              <Or>Developed by Sourav Ahmed</Or>
            </div>
          </Link>
        </>
      )}
      <Link href={"/download"} target="_blank">
        <div className="download">
          <Or>
            <div className="download-text">
              <p>Download</p>
              {/* <p>Desktop App</p> */}
            </div>
          </Or>
        </div>
      </Link>

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
        .fvrtTitle {
          margin-inline: 1rem;
          padding-block: 0.5rem;
          transition: all 0.4s ease;
        }
        .fvrtTitle-2 {
          margin-top: 1rem;
        }
        main {
          display: flex;
          justify-content: space-evenly;
          height: fit-content;
          min-height: 100vh;
          max-width: 100vw;
        }
        main > * {
          max-width: 32vw;
          min-width: 25vw;
          padding: 0.5rem;
        }
        section:nth-child(2) {
          border-inline: 1px solid var(--border-color-2);
        }
        .developed {
          margin-inline: 20vw;
        }
        .developed:hover {
          margin-inline: 1rem;
        }
        .update {
          margin-top: 0px;
          margin-bottom: 0px;
          display: block;
          opacity: 0;
          transform: scale(0);
        }
        .updatesection {
          margin-top: 1rem;
          border: 1px solid var(--border-color-2);
          padding: 0.5rem;
          opacity: 0.25;
          transition: all 0.2s ease;
          height: 2.5rem;
          overflow: hidden;
        }
        .updatesection:hover {
          opacity: 1;
          height: 4.5rem;
        }
        .updatesection:hover .update {
          display: block;
          opacity: 1;
          transform: scale(1);
        }
        .download {
          position: absolute;
          top: 0;
          right: 0;
          border: 1px solid var(--border-color-2);
          padding-inline: 1rem;
          padding-block: 0.5rem;
          margin: 0.5rem;
          cursor: pointer;
          transition: all 0.4s ease;
        }
        .download:hover {
          color: var(--hover-bg-color);
          transform: scale(1.1);
          text-decoration: underline;
        }
        .download-text {
          text-align: center;
        }
        .download-text p {
          font-size: 14px;
        }
        @media (max-width: 600px) {
          main {
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
          main > * {
            min-width: 90vw;
          }

          .list-wrapper {
            display: flex;
            flex-direction: row;
            overflow: scroll;
          }
          .download {
            position: relative;
          }
        }
      `}</style>
    </>
  );
};

export default Home;

{
  /* <h1>Hello Electron!</h1>
{message && <p>{message}</p>}

<h1>{online ? "Online" : "Offline"}</h1>
{notes && notes.map((note, index) => <h2 key={index}>{note}</h2>)}
<form onSubmit={handleSubmit}>
  <input
    type="text"
    value={input}
    onChange={(e) => setInput(e.target.value)}
  />
</form>
<button
  onClick={(e) => {
    const pre = notes ? notes : [];
    if (input) {
      window.electron.saveData.send({
        notes: [input, ...pre],
      });
      setInput("");
    }
  }}
>
  Save
</button>
<br />
{linkPath && (
  <Link href={linkPath} target="_blank">
    About
  </Link>
)}
<Link href={"/about"}>About</Link>
<Link href={"/about/sourav"}>About</Link> */
}

// const [linkPath, setLinkPath] = useState(null);
// const [input, setInput] = useState("");
// const [message, setMessage] = useState(null);
// const [notes, setNotes] = useState(null);

// useEffect(() => {
//   // const handleMessage = (event, message) => setMessage(message);

//   // const handleLoadData = (event, message) => {
//   //   // console.log(message);
//   //   setNotes(message?.data?.notes);
//   // };
//   // const handleSaveData = (event, message) => {
//   //   // console.log(message);
//   //   setNotes(message?.data?.notes);
//   // };
//   // const handleLinkPath = (event, message) => {
//   //   // console.log(message);
//   //   setLinkPath(message);
//   // };

//   // window.electron.message.on(handleMessage);
//   // window.electron.loadData.on(handleLoadData);
//   // window.electron.saveData.on(handleSaveData);
//   // window.electron.linkPath.on(handleLinkPath);
//   // window.electron.loadData.send();
//   // window.electron.linkPath.send("about");

//   return () => {
//     // window.electron.message.off(handleMessage);
//     // window.electron.loadData.off(handleLoadData);
//     // window.electron.saveData.off(handleSaveData);
//     // window.electron.linkPath.off(handleLinkPath);
//   };
// }, []);

// // const handleSubmit = (event) => {
// //   event.preventDefault();
// //   window.electron.message.send({
// //     input: input,
// //     link: "https://sites.google.com/view/bdixftpserverlist/media-ftp-servers",
// //   });
// //   setMessage(null);
// // };
