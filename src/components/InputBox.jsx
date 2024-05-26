import React from "react";
import Select from "react-select";

const InputBox = ({
  label,
  amount,
  currencyOptions,
  onCurrencyChange,
  selectCurrency,
  onAmountChange,
  amountDisable = false,
}) => {
  const options = currencyOptions.map((option) => ({
    value: option,
    label: option.toUpperCase(),
  }));

  return (
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-black-700">
        {label}
      </label>
      <Select
        value={options.find((option) => option.value === selectCurrency)}
        onChange={(selectedOption) => onCurrencyChange(selectedOption.value)}
        options={options}
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => onAmountChange(e.target.value)}
        disabled={amountDisable}
        className="mt-2 w-full px-3 py-2 border rounded-md"
      />
    </div>
  );
};

export default InputBox;
