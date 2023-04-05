import { useEffect } from "react";
import { registerServiceWorker } from "./services";

function App() {
  useEffect(() => {
    const requestNotificationPermission = () => {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // do something
          // console.log(permission);
          registerServiceWorker();
        }
      });
    };

    requestNotificationPermission();
  }, []);
  return <div className="App"></div>;
}

export default App;
