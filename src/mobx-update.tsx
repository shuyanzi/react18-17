import useStore from "./store/useStore";
import { Observer, observer } from "mobx-react";

export default function MU() {
  const infoStore = useStore('info');
  const total = infoStore.total;

  return (
    <Observer>
        {() => (
          <>
            <div className="">use store</div>
            <button onClick={() => (infoStore.total = 3)}>infoStore.total = 3</button>
            <div className="">{infoStore.total}</div>
            {/* <div className="">{total}</div> */}
          </>
        )}
    </Observer>
  );
}
// export default observer(() => {
//     const infoStore = useStore("info");
//     const total = infoStore.total;
//     return (
//        <div>
//           <button onClick={() => (infoStore.total = 3)}>infoStore.total = 3</button>
//           {total}
//        </div>
//    );
//  });