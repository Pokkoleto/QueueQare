import { useEffect } from "react";

const StoreLocator = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://webapp.woosmap.com/webapp.js";
    script.async = true;
    document.body.appendChild(script);
    script.addEventListener("load", function () {
      instanciateStoreLocator();
    });
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const instanciateStoreLocator = () => {
    const webapp = new window.WebApp(conf.storeLocatorId, conf.woosmapApiKey);
    webapp.setConf(conf.storeLocatorConfig);
    webapp.render();
  };

  return <div id={conf.storeLocatorId} style={conf.styles} />;
};

const conf = {
  // storeLocatorConfig: {
  //   googlemaps: {
  //     api_key: "AIzaSyBn3kw1bNdgmiXAczwr2DcKLAaW-M3nX14",
  //     places: {
  //       types: ["geocode"],
  //     },
  //   },
  // },
  woosmapApiKey: "woos-e48717c8-61d8-3cd2-b81b-231435f3a0ee",
  storeLocatorId: "store-locator",
  styles: {
    height: "100%",
    width: "100%",
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
};

export default StoreLocator;
