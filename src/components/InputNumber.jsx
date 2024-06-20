import { InputNumber } from "primereact/inputnumber";
import React from "react";
import { Field } from "formik";

const InputNumberField = ({ rowData, field, updateInputValue }) => {
  return (
    <>
      <InputNumber
        value={rowData.inputValue[field] || 0}
        onValueChange={(e) => {
            updateInputValue({ rowData, field, value: e.value })
        }}
        useGrouping={false}
        invalid={rowData.errorAt.includes(field)}
      />
      <p className="field-default-value">{rowData[field]}</p>
    </>
  );
};

export default InputNumberField;
