export const getStaticDataFromGitHub = async () => {
  try {
    const response = await fetch(
      "https://sourav9063.github.io/ftp-nextron/api/db.json",
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await response.json();
    if (response.ok) {
      return { mainData: data, error: null };
    } else {
      throw new Error("Error fetching data");
    }
  } catch (e) {
    return { mainData: null, error: e };
  }
};
