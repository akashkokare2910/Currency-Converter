import { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";
import backgroundImage from "./assets/images/currency.jpg";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [error, setError] = useState("");

  const currencyInfo = useCurrencyInfo(from);

  // Ensure currencyInfo is available before getting keys
  const options = currencyInfo ? Object.keys(currencyInfo) : [];
  const toOptions = options.filter((option) => option !== from);

  useEffect(() => {
    // Reset error if the currencies are changed
    if (from !== to) {
      setError("");
    }
  }, [from, to]);

  const swap = () => {
    setFrom((prevFrom) => {
      setTo(prevFrom);
      return to;
    });
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const convert = () => {
    if (from === to) {
      setError("From and To currencies cannot be the same.");
      return;
    }
    if (currencyInfo && currencyInfo[to]) {
      setConvertedAmount(amount * currencyInfo[to]);
      setError("");
    } else {
      setError("Conversion rate not available.");
    }
  };

  return (
    <div
      className="w-full h-screen flex flex-wrap justify-center items-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url(${backgroundImage})`,
      }}
    >
      <div className="w-full">
        <div className="w-full max-w-md mx-auto border border-gray-60 rounded-lg p-5 backdrop-blur-sm bg-white/30">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              convert();
            }}
          >
            <div className="w-full mb-1">
              <InputBox
                label="From"
                amount={amount}
                currencyOptions={options}
                onCurrencyChange={(currency) => setFrom(currency)}
                selectCurrency={from}
                onAmountChange={(amount) => setAmount(amount)}
              />
            </div>
            <div className="relative w-full h-0.5">
              <button
                type="button"
                className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-white rounded-md bg-blue-600 text-white px-2 mt-2 pb-1"
                onClick={swap}
              >
                swap
              </button>
            </div>
            <div className="w-full mt-1 mb-4">
              <InputBox
                label="To"
                amount={convertedAmount}
                currencyOptions={toOptions}
                onCurrencyChange={(currency) => setTo(currency)}
                selectCurrency={to}
                amountDisable={true}
              />
            </div>
            {error && (
              <div className="w-full mb-4 text-red-600 text-center">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg"
            >
              Convert {from.toUpperCase()} to {to.toUpperCase()}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
