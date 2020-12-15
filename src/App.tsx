import * as React from "react";

const App: React.FunctionComponent<unknown> = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const submitSpeedBump = async (speedBumpUrl: string) => {
    try {
      // * Make Fetch Call
      setIsLoading(true);
      const response = await fetch(
        "https://slowfil.es/file?type=js&delay=2000"
      );

      if (response.status === 200) {
        setIsLoading(false);
        window.open(speedBumpUrl, "_blank");
      } else {
        setIsLoading(false);
        alert("Incorrect status code!");
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
          submitSpeedBump(URLString);
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
