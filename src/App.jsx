import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useFormik } from "formik";
import FormikInputNumber from "./components/FormikInputNumber";
import _ from "lodash";
import { initialValues, createSchema, calculateSum } from "./js/helper";

function App() {
  const formik = useFormik({
    initialValues,
    validate: (values) => {
      const parsed = createSchema(initialValues.tableItems).safeParse(values);
      if (!parsed.success) {
        const errors = parsed.error.errors.map(
          ({ path }) => path[path.length - 1]
        );
        return errors;
      }
      return [];
    },
    onSubmit: (values) => {
      console.log("Form Values:", values);
    },
  });

  const renderHeader = (field, label) => {
    return (
      <div className="header-container">
        <div className="header-sum">{calculateSum(field, formik)}</div>
        <div>{label}</div>
      </div>
    );
  };

  const renderInput = (rowData, currentFieldNamespace) => {
    return (
      <FormikInputNumber
        formik={formik}
        rowData={rowData}
        currentFieldNamespace={currentFieldNamespace}
      />
    );
  };

  const hasNonZeroValues = () => {
    return _.some(formik.values.tableItems, (item) =>
      _.some(item, (value) => _.isNumber(value) && value > 0)
    );
  };

  const isSubmitDisabled = () => {
    return Object.keys(formik.errors).length > 0 || !hasNonZeroValues();
  };

  return (
    <div className="flex justify-content-center">
      <div className="card table-wrapper p-4">
        <form onSubmit={formik.handleSubmit}>
          <DataTable
            value={formik.values.tableItems}
            tableStyle={{ minWidth: "50rem" }}
          >
            <Column field="id" header="ID" />
            <Column field="name" header="Name" />
            <Column
              header={renderHeader("fieldOne", "Field One")}
              body={(rowData) =>
                renderInput(rowData, "fieldOne")
              }
            />
            <Column
              header={renderHeader("fieldTwo", "Field Two")}
              body={(rowData) =>
                renderInput(rowData, "fieldTwo")
              }
            />
            <Column
              header={renderHeader("fieldThree", "Field Three")}
              body={(rowData) =>
                renderInput(rowData, "fieldThree")
              }
            />
          </DataTable>
          <div className="text-right mt-3">
            <Button
              label="Done"
              severity="success"
              raised
              disabled={isSubmitDisabled()}
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
