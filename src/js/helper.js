import { z } from "zod";

// if you want to add more fields to validate add those keys and values each obj in dataFromApi
// add that field name in fieldsToValidate array
// create new column in datatable for that field

const dataFromApi = {
  tableItems: [
    {
      id: "1000",
      name: "Bamboo Watch",
      fieldOne: 0,
      fieldTwo: 0,
      fieldThree: 0,
      defaultValue: {
        fieldOne: 20,
        fieldTwo: 20,
        fieldThree: 20,
      },
    },
    {
      id: "1001",
      name: "Black Watch",
      fieldOne: 0,
      fieldTwo: 0,
      fieldThree: 0,
      defaultValue: {
        fieldOne: 10,
        fieldTwo: 13,
        fieldThree: 7,
      },
    },
    {
      id: "1002",
      name: "Blue Band",
      fieldOne: 0,
      fieldTwo: 0,
      fieldThree: 0,
      defaultValue: {
        fieldOne: 5,
        fieldTwo: 5,
        fieldThree: 5,
      },
    },
    {
      id: "1003",
      name: "Blue T-Shirt",
      fieldOne: 0,
      fieldTwo: 0,
      fieldThree: 0,
      defaultValue: {
        fieldOne: 17,
        fieldTwo: 17,
        fieldThree: 17,
      },
    },
    {
      id: "1004",
      name: "Bracelet",
      fieldOne: 0,
      fieldTwo: 0,
      fieldThree: 0,
      defaultValue: {
        fieldOne: 45,
        fieldTwo: 45,
        fieldThree: 45,
      },
    },
  ],
};

const fieldsToValidate = ["fieldOne", "fieldTwo", "fieldThree"];

const transformApiData = () => {
  return {
    tableItems: dataFromApi.tableItems.map((item) => {
      const { id, ...rest } = item;
      const transformedFields = {};
      for (const key in rest) {
        if (rest.hasOwnProperty(key) && fieldsToValidate.includes(key)) {
          transformedFields[`${key}-${id}`] = rest[key];
        } else {
          transformedFields[key] = rest[key];
        }
      }
      return {
        id,
        ...transformedFields,
      };
    }),
  };
};

const initialValues = transformApiData();


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
