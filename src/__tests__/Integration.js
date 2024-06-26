import React from "react";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { ListContext } from "../listContext";
import Parent from "../components/Parent";
import { tabOneList as mockItems } from "../constant";

let tabOneMockData = []
let tabOneSelectedData = []
let tabTwoMockData = []
let tabTwoSelectedData = []
let tabThreeMockData = []

const getRandomValues = (array, n) =>  array.sort(() => 0.5 - Math.random()).slice(0, n);

const setDataForAllVariables = ({ tabOne=5, tabTwo=4, tabThree=3 }) => {
  if((tabOne <= mockItems.length) && (tabOne > tabTwo) && (tabTwo > tabThree)) {
    tabOneMockData = getRandomValues(mockItems, tabOne);
    tabOneSelectedData = getRandomValues(tabOneMockData, tabTwo); // for tab two
    tabTwoMockData = [...tabOneSelectedData];
    tabTwoSelectedData = getRandomValues(tabOneSelectedData, tabThree) // for tab three
    tabThreeMockData = [...tabTwoSelectedData]
  } else {
    throw new Error("Initial values for array aren't valid");
  }
}
setDataForAllVariables({});

const mockContextValue = {
  currentTab: 1,
  onSelectList: jest.fn(),
  itemsForTabTwo: [],
  itemsForTabThree: [],
  changeTab: jest.fn(),
};

const renderContext = (contextValue = mockContextValue) => {
  return render(
    <ListContext.Provider value={contextValue}>
      <Parent />
    </ListContext.Provider>
  );
};

describe("Tab One", () => {
  afterEach(cleanup);
  beforeEach(renderContext);

  test("render list at first", () => {
    tabOneMockData.forEach((item) => {
      expect(
        screen.getByTestId(`tabone-checkbox-${item.id}`)
      ).toBeInTheDocument();
    });
  });

  test("Make sure continue button is disable", () => {
    expect(screen.getByTestId("continue")).toBeDisabled();
  });

  test("Enable submit for tab two", () => {
    const selectedItem = tabOneMockData[0];
    fireEvent.click(screen.getByTestId(`tabone-checkbox-${selectedItem.id}`));
    expect(mockContextValue.onSelectList).toHaveBeenCalledWith(
      true,
      selectedItem
    );

    cleanup();
    renderContext({
      ...mockContextValue,
      itemsForTabTwo: [{ ...selectedItem, isChecked: true }],
    });
    expect(screen.getByTestId("continue")).toBeEnabled();
  });
});

describe("Tab Two", () => {
  afterEach(cleanup);
  beforeEach(() => {
    renderContext({
      ...mockContextValue,
      currentTab: 2,
      itemsForTabTwo: tabTwoMockData,
    });
  });

  test("render list at first", () => {
    tabTwoMockData.forEach((item) => {
      expect(
        screen.getByTestId(`tabone-checkbox-${item.id}`)
      ).toBeInTheDocument();
    });
  });

  test("Make sure continue button is disable", () => {
    expect(screen.getByTestId("continue")).toBeDisabled();
  });

  test("Enable submit for tab one", () => {
    const selectedItem = tabTwoMockData[0];
    fireEvent.click(screen.getByTestId(`tabone-checkbox-${selectedItem.id}`));
    expect(mockContextValue.onSelectList).toHaveBeenCalledWith(
      true,
      selectedItem
    );

    cleanup();
    renderContext({
      ...mockContextValue,
      currentTab: 2,
      itemsForTabThree: [{ ...selectedItem, isChecked: true }],
    });
    expect(screen.getByTestId("continue")).toBeEnabled();
  });
});

describe("Tab Three", () => {
  afterEach(cleanup);
  beforeEach(() => {
    renderContext({
      ...mockContextValue,
      currentTab: 3,
      itemsForTabThree: tabThreeMockData,
    });
  });

  test("render list at first", () => {
    tabThreeMockData.forEach((item) => {
      expect(
        screen.getByTestId(`tabone-checkbox-${item.id}`)
      ).toBeInTheDocument();
    });
  });

  test("Make sure continue button is not there", () => {
    expect(screen.queryByTestId("continue")).not.toBeInTheDocument();
  });

  test("Enable submit for tab two", () => {
    const selectedItem = tabThreeMockData[0];
    fireEvent.click(screen.getByTestId(`tabone-checkbox-${selectedItem.id}`));
    expect(mockContextValue.onSelectList).toHaveBeenCalledWith(
      true,
      selectedItem
    );

    cleanup();
    renderContext({
      ...mockContextValue,
      currentTab: 3,
      itemsForTabThree: [{ ...selectedItem, isChecked: true }],
    });
  });

  test("Going back to tab two to check the selected items for tab three are checked", () => {
    expect(screen.getByTestId("back")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("back"));
    cleanup();
    renderContext({
      ...mockContextValue,
      currentTab: 2,
      itemsForTabTwo: tabTwoMockData,
      itemsForTabThree: tabTwoSelectedData,
    });
    tabTwoSelectedData.forEach((item) => {
      const checkbox = screen.getByTestId(`tabone-checkbox-${item.id}`);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });
  });

  test("Going back to tab one to check the selected items for tab two are checked", () => {
    expect(screen.getByTestId("back")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("back"));
    cleanup();
    renderContext({
      ...mockContextValue,
      currentTab: 1,
      itemsForTabTwo: tabOneSelectedData,
    });
    tabOneSelectedData.forEach((item) => {
      const checkbox = screen.getByTestId(`tabone-checkbox-${item.id}`);
      expect(checkbox).toBeInTheDocument();
      expect(checkbox).toBeChecked();
    });
  });
  
  test("Remove one of the selected list item from tab one and goto tab two and make sure that removed item is not there", () => {
    let tabOneLastItem = tabOneSelectedData[tabOneSelectedData.length - 1];
    tabOneSelectedData.pop();
    tabTwoMockData = [...tabOneSelectedData];
    renderContext({
      ...mockContextValue,
      currentTab: 1,
      itemsForTabTwo: tabOneSelectedData,
    });
    fireEvent.click(screen.getByTestId("continue"));
    cleanup();
    renderContext({
      ...mockContextValue,
      currentTab: 2,
      itemsForTabTwo: tabTwoMockData,
      itemsForTabThree: tabTwoSelectedData
    });
    expect(screen.queryByTestId(`tabone-checkbox-${tabOneLastItem.id}`)).not.toBeInTheDocument();
  })

  test("Remove one of the selected list item from tab two and goto tab three and make sure that removed item is not there", () => {
    let tabOneLastItem = tabTwoSelectedData[tabTwoSelectedData.length - 1];
    tabTwoSelectedData.pop();
    tabThreeMockData = [...tabTwoSelectedData];
    renderContext({
      ...mockContextValue,
      currentTab: 2,
      itemsForTabTwo: tabTwoMockData,
      itemsForTabThree: tabTwoSelectedData
    });
    fireEvent.click(screen.getByTestId("continue"));
    cleanup();
    renderContext({
      ...mockContextValue,
      currentTab: 3,
      itemsForTabThree: tabThreeMockData
    });
    expect(screen.queryByTestId(`tabone-checkbox-${tabOneLastItem.id}`)).not.toBeInTheDocument();
  })
});
