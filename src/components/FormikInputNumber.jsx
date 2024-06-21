import React from "react";
import { InputNumber } from "primereact/inputnumber";
import { fieldsToValidate } from "../js/helper";

const FormikInputNumber = (props) => {
  const { formik, rowData, currentFieldNamespace } = props;

  const currentField = `${currentFieldNamespace}-${rowData.id}`;
  const rowIndex = formik.values.tableItems.indexOf(rowData);
  const fieldName = `tableItems[${rowIndex}].${currentField}`;
  const value = formik.values.tableItems[rowIndex][currentField];
  const defaultValue = rowData.defaultValue[currentFieldNamespace];
  const error = formik.errors?.includes?.(currentField);

  const handleValueChange = async (e) => {
    const newValue = e.value;
    const newFields = fieldsToValidate.reduce((acc, field) => {
      acc[`${field}-${rowData.id}`] = newValue;
      return acc;
    }, {});

    const updatedTableItems = formik.values.tableItems.map((item, idx) =>
      idx === rowIndex
        ? {
            ...item,
            ...newFields,
          }
        : item
    );
    await formik.setValues({ tableItems: updatedTableItems });
    await formik.validateForm();
  };

  return (
    <div className="field-container">
      <InputNumber
        name={fieldName}
        value={value}
        onChange={(e) => handleValueChange(e)}
        className={`custom-input-number ${error && "error"}`}
        useGrouping={false}
      />
      <p className="field-default-value">{defaultValue}</p>
    </div>
  );
};

export default FormikInputNumber;
