import { MainDataContext } from "@/provider/mainDataProvider";
import React, { useContext, useState } from "react";

import styles from "./Search.module.css";
import LinkItem from "@/components/linkItem";
import { isValidUrl } from "@/constants/strings";

export default function Search({ mainData }) {
  const [search, setSearch] = useState("");
  const { globalMedia = [], media = [], live = [], working = [] } = mainData;
  const options = [...working, ...globalMedia, ...media, ...live];
  return (
    <div className={styles["search"]}>
      <input
        type="input"
        list="datalist"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <datalist id="datalist">
        {options.map((option) => (
          <option key={option} value={option}></option>
        ))}
      </datalist>
      {search && search != "" && isValidUrl(search) && (
        <LinkItem media={search} />
      )}
    </div>
  );
}
