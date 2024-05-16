import React, { useContext } from "react";
import TableCard from "./TableCard";
import { TableDataContext } from "../context/TableData";
import { SyncLoader } from "react-spinners";

const Table = () => {
  const { state } = useContext(TableDataContext);
  return (
    <div className="h-[90%] w-[70%] overflow-auto flex flex-col gap-6">
      {!state.loading && !state.data.length && (
        <div className="flex justify-center items-center h-[50vh]">
          *Find medicine with amazing discounts *
        </div>
      )}
      {state.loading && (
        <SyncLoader
          color="#36d7b7"
          style={{
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
            marginTop: "30px",
          }}
        />
      )}
      {!state.loading &&
        state.data?.map((e, i) => <TableCard key={i} item={e} index={i} />)}
    </div>
  );
};

export default Table;
