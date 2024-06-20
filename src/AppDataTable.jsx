import React, { useState, useMemo, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Formik, Form } from "formik";
import InputNumberField from "./components/InputNumber";

function AppDataTable() {
  const [tableItems, setTableItems] = useState([
    {
      id: "1000",
      name: "Bamboo Watch",
      fieldOne: 20,
      fieldTwo: 20,
      fieldThree: 20,
      errorAt: [],
      inputValue: {},
    },
    {
      id: "1001",
      name: "Black Watch",
      fieldOne: 10,
      fieldTwo: 10,
      fieldThree: 10,
      errorAt: [],
      inputValue: {},
    },
    {
      id: "1002",
      name: "Blue Band",
      fieldOne: 5,
      fieldTwo: 5,
      fieldThree: 5,
      errorAt: [],
      inputValue: {},
    },
    {
      id: "1003",
      name: "Blue T-Shirt",
      fieldOne: 17,
      fieldTwo: 17,
      fieldThree: 17,
      errorAt: [],
      inputValue: {},
    },
    {
      id: "1004",
      name: "Bracelet",
      fieldOne: 45,
      fieldTwo: 45,
      fieldThree: 45,
      errorAt: [],
      inputValue: {},
    },
  ]);

  const columns = [
    { field: "id", header: "Id" },
    { field: "name", header: "Name" },
    { field: "fieldOne", header: "Field 1" },
    { field: "fieldTwo", header: "Field 2" },
    { field: "fieldThree", header: "Field 3" },
  ];

  const isDisableButton = () => {
    let hasValidInput = false;

    for (const item of tableItems) {
      if (item.errorAt.length > 0) {
        return true;
      }
      const { inputValue } = item;
      const { fieldOne, fieldTwo, fieldThree } = inputValue;
      if (
        (fieldOne && fieldOne > 0) ||
        (fieldTwo && fieldTwo > 0) ||
        (fieldThree && fieldThree > 0)
      ) {
        hasValidInput = true;
      }
    }
    return !hasValidInput; // send true if button needs to be disabled
  };

  const calculateSums = (items, field) => {
    let sum = 0;
    items.map((item) => {
      if (item?.inputValue?.[field]) {
        sum = sum + item?.inputValue?.[field];
      }
    });
    return sum;
  };

  const sums = useMemo(() => {
    return {
      fieldOne: calculateSums(tableItems, "fieldOne"),
      fieldTwo: calculateSums(tableItems, "fieldTwo"),
      fieldThree: calculateSums(tableItems, "fieldThree"),
    };
  }, [tableItems]);

  const clearRow = (id) => {
    setTableItems((prevState) => {
      return prevState.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            errorAt: [],
            inputValue: {},
          };
        }
        return item;
      });
    });
  };

  const clearIcon = (id) => (
    <i
      className="pi pi-times-circle cursor-pointer"
      style={{ color: "var(--primary-color)", fontSize: "1.5rem" }}
      onClick={() => clearRow(id)}
    ></i>
  );

  const updateInputValue = ({ rowData, field, value }) => {
    if (value > rowData[field]) {
      setTableItems((prevState) => {
        return prevState.map((item) => {
          if (item.id === rowData.id) {
            return {
              ...item,
              errorAt: [...item.errorAt, field],
              inputValue: { ...item.inputValue, [field]: value },
            };
          }
          return item;
        });
      });
    } else {
      setTableItems((prevState) => {
        return prevState.map((item) => {
          if (item.id === rowData.id) {
            return {
              ...item,
              errorAt: item.errorAt.filter((e) => e !== field),
              inputValue: { ...item.inputValue, [field]: value },
            };
          }
          return item;
        });
      });
    }
  };

  return (
    <div className="flex justify-content-center">
      <div className="card table-wrapper p-4">
        <DataTable value={tableItems} tableStyle={{ minWidth: "50rem" }}>
          {columns.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={
                ["fieldOne", "fieldTwo", "fieldThree"].includes(col.field) ? (
                  <div>
                    <div
                      style={{
                        fontWeight: "bold",
                        marginBottom: "0.5rem",
                      }}
                    >
                      {sums[col.field]}
                    </div>
                    {col.header}
                  </div>
                ) : (
                  col.header
                )
              }
              body={
                ["fieldOne", "fieldTwo", "fieldThree"].includes(col.field)
                  ? (rowData) => (
                      <InputNumberField
                        rowData={rowData}
                        field={col.field}
                        updateInputValue={updateInputValue}
                      />
                    )
                  : null
              }
            />
          ))}
          <Column body={(rowData) => clearIcon(rowData.id)} header="Action" />
        </DataTable>
        <div className="text-right mt-3">
          <Button
            label="Done"
            className=""
            severity="success"
            raised
            disabled={isDisableButton()}
            onClick={() => console.log("Form values:", values)}
          />
        </div>
      </div>
    </div>
  );
}

export default AppDataTable;
