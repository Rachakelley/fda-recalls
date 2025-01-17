import React from "react";
import { Unstable_NumberInput as BaseNumberInput } from "@mui/base";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import "./LimitSelector.css";

const LimitSelector = React.forwardRef(function CustomNumberInput(
  { limit, setLimit, ...props },
  ref
) {
  return (
    <BaseNumberInput
      slots={{
        root: "div",
        input: "input",
        incrementButton: "button",
        decrementButton: "button",
      }}
      slotProps={{
        root: { className: "limit-selector-root" },
        input: { className: "limit-selector-input" },
        incrementButton: {
          children: <AddIcon fontSize="small" />,
          className: "limit-selector-button increment",
        },
        decrementButton: {
          children: <RemoveIcon fontSize="small" />,
          className: "limit-selector-button",
        },
      }}
      onChange={(event, value) => setLimit(value)}
      value={limit}
      min={1}
      max={100}
      {...props}
      ref={ref}
    />
  );
});

export default LimitSelector;
