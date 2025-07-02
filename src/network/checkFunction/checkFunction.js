export const getWorkingNotSureFromList = async ({
  setWorking,
  setNotSure,
  listOFLinks,
  preferredKey = [],
}) => {
  const preferredWorkingArray = [];
  const notPreferredWorkingArray = [];

  // Listen for messages from the Service Worker
  navigator.serviceWorker.addEventListener("message", (event) => {
    if (event.data.type === "URL_ACCESSIBILITY_STATUS") {
      const { url, accessible } = event.data;
      let isPreferred = false;
      for (let key of preferredKey) {
        if (url.includes(key)) {
          isPreferred = true;
          break;
        }
      }
      if (accessible) {
        if (isPreferred) {
          preferredWorkingArray.push({ link: url, message: "Working" });
        } else {
          notPreferredWorkingArray.push({ link: url, message: "Working" });
        }
        setWorking([...preferredWorkingArray, ...notPreferredWorkingArray]);
      } else {
        setNotSure((state) => {
          return [...state, { link: url, message: "Not Sure" }];
        });
      }
    }
  });

  listOFLinks.forEach(async (link) => {
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: "CHECK_URL_ACCESSIBILITY",
        url: link,
      });
    } else {
      console.warn("Service Worker not active. Please refresh the page.");
    }
  });
};

// for (let i = 0; i < listOFLinks.length; i++) {
//   const link = listOFLinks[i];
//   try {
//     const response = await fetch(link, { mode: "no-cors" });

//     if (response.ok) {
//       console.log(link);
//       setWorking((state) => {
//         return [...state, { link: link, message: "Working" }];
//       });
//     } else {
//       setWorking((state) => {
//         return [...state, { link: link, message: "Working" }];
//       });
//     }
//   } catch (e) {
//     setNotSure((state) => {
//       return [...state, { link: link, message: "Not Sure" }];
//     });
//   }
// }
