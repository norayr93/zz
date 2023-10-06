import "./App.css";
import { useState } from "react";

function App() {
  const [state, setState] = useState({
    vendorId: "",
    userId: "",
    token: "",
  });

  const onOpen = () => {
    window.grailpay.open();
  };

  const onInit = async () => {
    console.log("Initializing");

    const initObj = {
      token: state.token || "2464|0LxF7U7Hzp0tU1BG0LWTGKOzTUp5OTSqmaQGXHep",
      onSuccess: function (data) {
        console.log("Bank account is successfully connected", data);
      },
      onError: function (error) {
        console.error("Error happened", error);
      },
      onClose: function (data) {
        console.log("Widget closed", data);
      },
    };

    const res = await window.grailpay.init(initObj);
    console.log(res, "init response");
  };

  const getAccount = () => {
    window.grailpay.getAccount();
  };

  return (
    <div className="App">
      <div style={{ display: "flex", marginBottom: "24px" }}>
        <label>
          User uuid
          <input
            type="text"
            value={state.userId}
            onChange={(e) =>
              setState((prev) => ({ ...prev, userId: e.target.value }))
            }
          />
        </label>
        <label>
          Vendor id
          <input
            type="text"
            value={state.vendorId}
            onChange={(e) =>
              setState((prev) => ({ ...prev, vendorId: e.target.value }))
            }
          />
        </label>
        <label>
          Token
          <input
            type="text"
            value={state.token}
            onChange={(e) =>
              setState((prev) => ({ ...prev, token: e.target.value }))
            }
          />
        </label>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button
          onClick={onInit}
          style={{ width: "120px", marginRight: "12px" }}
          type="button"
          id="init-widget"
        >
          Initialize widget
        </button>
        <button
          onClick={onOpen}
          style={{ width: "120px" }}
          type="button"
          id="open-widget"
        >
          Open widget
        </button>
        <button style={{ width: "250px" }} id="grp__pay">
          Trigger the Widget with button
        </button>
        <button
          onClick={() => {
            window.grailpay.close();
          }}
          style={{ width: "120px" }}
          id="close-widget"
        >
          Close widget
        </button>
        <button
          onClick={getAccount}
          style={{ width: "150px" }}
          id="fetch-account"
        >
          Fetch account information
        </button>
      </div>
    </div>
  );
}

export default App;
