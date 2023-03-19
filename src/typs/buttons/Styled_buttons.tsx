import styled, { keyframes } from "styled-components";

interface IBold {
  bold?: boolean;
}
interface IColorsForGenericButtons {
  backgroundColor: string;
}

interface IClickedAddToBag {
  clicked: boolean;
  disabled?: boolean;
}

export const Clean_button = styled.button<IBold>`
  all: unset;
  font-size: 18px;
  font-weight: ${(props) => (props.bold == true ? "bold" : "normal")};
`;

export const AdvancedFilterButton = styled.button`
  all: unset;
  font-size: 18px;
  height: 100%;
  padding: 0px 10px;
  &:hover {
    background-color: #d0cfcf;
  }
`;

export const DishTimeSortingButton = styled.button`
  all: unset;
  font-size: 18px;
  &.noBorder {
    border: none;
  }
  &.border {
    border-bottom: #de9000 1.8px solid;
  }
`;

export const AddToBagButton = styled.button<IClickedAddToBag>`
  all: unset;
  font-size: 18px;
  color: white;
  background-color: ${(props) => (props.clicked ? "#5fbd4a" : "black")};
  padding: 14px 0px;
  width: 180px;
  font-family: "HelveticaNeue-Light";
  letter-spacing: 1.5px;
  transition: 0.2s;
  &:active {
    transform: scale(0.95);
  }
`;

export const GenericButtons = styled.button<IColorsForGenericButtons>`
  all: unset;
  font-size: 16px;
  color: ${(props) => (props.backgroundColor === "white" ? "black" : "white")};
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) =>
    props.backgroundColor === "white" ? "black 1px solid" : "none"};
  padding: 10px 0px;
  font-family: "HelveticaNeue-Light";
  letter-spacing: 3px;
  width: 150px;
  min-width: fit-content;
  text-align: center;

  &:hover {
    background-color: ${(props) =>
      props.backgroundColor === "white" ? "#343434" : "#9b9b9b"};
    color: ${(props) => (props.backgroundColor === "white" ? "white" : "")};
    cursor: pointer;
  }
`;

export const ShoppingBagButtons = styled(GenericButtons)`
  font-size: 18px;
  width: 210px;
  font-weight: bold;
  border: black 1px solid;
`;
