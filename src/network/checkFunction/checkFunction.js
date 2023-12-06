export const getWorkingNotSureFromList = async ({
  setWorking,
  setNotSure,
  listOFLinks,
}) => {
  console.log("checking");
  listOFLinks.forEach(async (link) => {
    try {
      const response = await fetch(link, { mode: "no-cors" });

      if (response.ok) {
        console.log(link);
        setWorking((state) => {
          return [...state, { link: link, message: "Working" }];
        });
      } else {
        setWorking((state) => {
          return [...state, { link: link, message: "Working" }];
        });
      }
    } catch (e) {
      setNotSure((state) => {
        return [...state, { link: link, message: "Not Sure" }];
      });
    }
  });
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
};
