export const getWorkingNotSureFromList = async ({
  setWorking,
  setNotSure,
  listOFLinks,
  preferredKey = [],
}) => {
  const preferredWorkingArray = [];
  const notPreferredWorkingArray = [];
  listOFLinks.forEach(async (link) => {
    let isPreferred = false;
    for (let key of preferredKey) {
      if (link.includes(key)) {
        isPreferred = true;
        break;
      }
    }

    try {
      await fetch(link, { mode: "no-cors" });
      if (isPreferred) {
        preferredWorkingArray.push({ link: link, message: "Working" });
      } else {
        notPreferredWorkingArray.push({ link: link, message: "Working" });
      }
      setWorking([...preferredWorkingArray, ...notPreferredWorkingArray]);
    } catch (e) {
      setNotSure((state) => {
        return [...state, { link: link, message: "Not Sure" }];
      });
    }
  });
  console.log(preferredWorkingArray.length);
  console.log(notPreferredWorkingArray.length);
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
