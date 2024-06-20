import { z } from "zod";

const initialValues = {
  tableItems: [
    {
      id: "1000",
      name: "Bamboo Watch",
      "fieldOne-1000": 0,
      "fieldTwo-1000": 0,
      "fieldThree-1000": 0,
      defaultValue: {
        fieldOne: 20,
        fieldTwo: 20,
        fieldThree: 20,
      },
    },
    {
      id: "1001",
      name: "Black Watch",
      "fieldOne-1001": 0,
      "fieldTwo-1001": 0,
      "fieldThree-1001": 0,
      defaultValue: {
        fieldOne: 10,
        fieldTwo: 13,
        fieldThree: 7,
      },
    },
    {
      id: "1002",
      name: "Blue Band",
      "fieldOne-1002": 0,
      "fieldTwo-1002": 0,
      "fieldThree-1002": 0,
      defaultValue: {
        fieldOne: 5,
        fieldTwo: 5,
        fieldThree: 5,
      },
    },
    {
      id: "1003",
      name: "Blue T-Shirt",
      "fieldOne-1003": 0,
      "fieldTwo-1003": 0,
      "fieldThree-1003": 0,
      defaultValue: {
        fieldOne: 17,
        fieldTwo: 17,
        fieldThree: 17,
      },
    },
    {
      id: "1004",
      name: "Bracelet",
      "fieldOne-1004": 0,
      "fieldTwo-1004": 0,
      "fieldThree-1004": 0,
      defaultValue: {
        fieldOne: 45,
        fieldTwo: 45,
        fieldThree: 45,
      },
    },
  ],
};

const fieldsToValidate = ["fieldOne", "fieldTwo", "fieldThree"];

const createSchema = (tableItems) => {
  const tableItemSchema = tableItems.map((item) => {
    const fieldsSchema = {};
    fieldsToValidate.forEach((field) => {
      fieldsSchema[`${field}-${item.id}`] = z
        .number()
        .max(item.defaultValue[field]);
    });
    return z.object(fieldsSchema);
  });
  return z.object({
    tableItems: z.array(z.union(tableItemSchema)),
  });
};

const calculateSum = (fieldPrefix, formik) => {
    return formik.values.tableItems.reduce((sum, item) => {
      const field = `${fieldPrefix}-${item.id}`;
      const value = item[field];
      return sum + (isNaN(value) ? 0 : Number(value));
    }, 0);
  };

export { initialValues, createSchema, calculateSum, fieldsToValidate };
