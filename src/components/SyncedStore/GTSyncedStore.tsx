import React, { useEffect, useMemo, useRef } from "react";
import GTEasyState from "../EasyState/GTEasyState";
import { IGTSyncedStore } from "./interface";
import { useTriggerState } from "react-trigger-state";
import syncedStore, { getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";
import { useSyncedStore } from "@syncedstore/react";
import { store } from "../../y/store";

const connections = new Map();

function GTSyncedStore({ name, children }: IGTSyncedStore) {
  const [pageState, setPageState] = useTriggerState({
    name,
  });

  // (() => {
  //   // only connect once
  //   if (connections.has(name)) {
  //     return;
  //   }

  //   const store = syncedStore({ ei: [], fragment: "xml" });

  //   const doc = getYjsDoc(store);

  //   const webrtcProvider = new WebrtcProvider(`syncedstore-${name}`, doc);

  //   const opts = {
  //     disconnect() {
  //       webrtcProvider.disconnect();
  //     },
  //     connect() {
  //       webrtcProvider.connect();
  //     },
  //   };

  //   // add new connection
  //   connections.set(name, { opts, store });
  // })();

  // const state = useSyncedStore(connections.get(name)?.store);
  const state = useSyncedStore(store);

  useEffect(() => {
    // state.ei.push("a");

    // state.state = pageState;
    // console.log(state.ei);

    for (const key of state.todos) {
      console.log(key);
    }
  }, []);

  return (
    <GTEasyState name={name}>
      {state.todos.map((todo, i) => {
        return (
          <li
            key={i}
            style={{ textDecoration: todo.completed ? "line-through" : "" }}
          >
            <label>
              <input
                type="checkbox"
                checked={todo.completed}
                onClick={() => (todo.completed = !todo.completed)}
              />
              {todo.title}
            </label>
          </li>
        );
      })}

      <input
        placeholder="Enter a todo item and hit enter"
        type="text"
        onKeyDownCapture={(event) => {
          if (event.key === "Enter") {
            const target = event.target as HTMLInputElement;
            // Add a todo item using the text added in the textfield
            state.todos.push({ completed: false, title: target.value });
            target.value = "";
          }
        }}
        style={{ width: "200px", maxWidth: "100%" }}
      />
      {children}
    </GTEasyState>
  );
}

export default GTSyncedStore;
