import * as React from "react";

const App: React.FunctionComponent<unknown> = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const submitSpeedBump = async (
    speedBumpUrl: string,
    newTab: Window | null
  ) => {
    try {
      // * Make Fetch Call
      setIsLoading(true);
      const response = await fetch(
        "https://slowfil.es/file?type=js&delay=2000&status=500"
      );

      if (response.status === 200) {
        setIsLoading(false);
        if (!newTab) {
          throw new Error("No newTab!");
        }
        newTab.location.href = speedBumpUrl;
      } else {
        setIsLoading(false);
        newTab?.close();
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    const speedBumpLink = document.getElementsByTagName("a");

    for (let i = 0; i < speedBumpLink.length; i++) {
      const URLString = speedBumpLink[i].getAttribute("href");

      if (
        URLString !== null &&
        (URLString.indexOf("://") >= 0 || URLString.indexOf("www.") >= 0)
      ) {
        speedBumpLink[i].onclick = function (event) {
          event.preventDefault();

          const newTab = window.open("", "_blank");
          if (!newTab) {
            throw new Error("No newTab!");
          }
          newTab.document.write("Loading preview...");
          submitSpeedBump(URLString, newTab);
        };
      }
    }
  }, []);

  return (
    <div>
      {isLoading && <span>LOADING</span>}
      <a
        href="https://www.google.com/"
        rel="noreferrer noopener"
        target="_blank"
      >
        Google
      </a>
    </div>
  );
};

export default App;
