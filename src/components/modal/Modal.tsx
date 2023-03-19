import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOrder } from "../../store/slicers/ordersSlicer";
import { RootState } from "../../store/store";
import { AddToBagButton } from "../../typs/buttons/Styled_buttons";
import { UnderlineHeadline } from "../../typs/headlines/UnderlineHeadline";
import { IModalProps } from "../../typs/interfaces/IModalProps";
import { IOrder } from "../../typs/interfaces/slicersInterfaces";
import "./Modal.css";

const Modal: React.FC<IModalProps> = (props: IModalProps) => {
  const [quantity, SetQuantity] = useState(1);
  const [selectedSide, SetSelectedSide] = useState("");
  const [selectedChanges, setSelectedChanges] = useState<string[]>([]);

  const dispatch = useDispatch();

  const orders = useSelector((state: RootState) => state.orders.value);

  const modalRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      props.onclick();
      return;
    }
  };

  const handleSideChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    SetSelectedSide(event.target.value);
  };

  const handleChangesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const checked = event.target.checked;

    if (checked) {
      setSelectedChanges((prevSelectedChanges) => [
        ...prevSelectedChanges,
        value,
      ]);
    } else {
      setSelectedChanges((prevSelectedChanges) =>
        prevSelectedChanges.filter((item) => item !== value)
      );
    }
  };

  const [AddToBagClicked, SetAddToBagClicked] = useState(false);

  const handleAddToBagClick = () => {
    SetAddToBagClicked(true);
    const order: IOrder = {
      id: props.dish?.id,
      name: props.dish?.name,
      img_url: props.dish?.img_url,
      changes: selectedChanges,
      price: props.dish?.price,
      sides: selectedSide,
      quantity: quantity,
    };
    dispatch(setOrder(order));

    setTimeout(() => {
      SetAddToBagClicked(false);
    }, 3000);
  };
  useEffect(() => {
    console.log(orders);
  }, [AddToBagClicked]);

  return (
    <>
      {props.show && (
        <div className="grey_screen" onClick={handleClick}>
          <div className="modal" ref={modalRef}>
            {props.dish ? (
              <>
                <img
                  className="dish_img"
                  src={props.dish.img_url}
                  alt={`img of ${props.dish.name}`}
                />
                <div className="content">
                  <h3>{props.dish.name}</h3>
                  <h1>{props.dish.ingredients.join(", ")}</h1>
                  <section className="icons_section">
                    {Object.entries(props.dish.icons).map(
                      (icon: Array<string | boolean>, index: number) =>
                        icon[1] == true ? (
                          <img
                            key={index}
                            className="icons"
                            src={`/assets/icons/dishes_types_icons/${icon[0]}.svg`}
                            alt="icons"
                          />
                        ) : null
                    )}
                  </section>
                  <div className="dish_pricing">
                    <hr />
                    <p>₪{props.dish.price}</p>
                    <hr />
                  </div>

                  <div className="choose_a_side_div">
                    <UnderlineHeadline>Choose a side</UnderlineHeadline>
                    <div className="radio-buttons">
                      {props.dish.sides.length > 1 ? (
                        props.dish.sides.map((side) => (
                          <label>
                            <input
                              type="radio"
                              name="side"
                              value={side}
                              onChange={handleSideChange}
                            />
                            {side}
                          </label>
                        ))
                      ) : (
                        <p className="center">There are no available sides</p>
                      )}
                    </div>
                  </div>

                  <div className="changes_div">
                    <UnderlineHeadline>Changes</UnderlineHeadline>
                    <div className="checkboxes">
                      {props.dish.changes.length > 1 ? (
                        props.dish.changes.map((change) => (
                          <label key={change}>
                            <input
                              type="checkbox"
                              name={change.split(" ").join("-")}
                              value={change}
                              checked={selectedChanges.includes(change)}
                              onChange={handleChangesChange}
                            />
                            {change}
                          </label>
                        ))
                      ) : (
                        <p className="center">There are no available changes</p>
                      )}
                    </div>
                  </div>
                  <div className="quantity_div">
                    <UnderlineHeadline>Quantity</UnderlineHeadline>
                    <div className="quantity_controls">
                      <button
                        onClick={() => SetQuantity((prev) => prev - 1)}
                        disabled={quantity == 1}
                        className={quantity === 1 ? "disabled" : ""}
                      >
                        –
                      </button>
                      <span>{quantity}</span>
                      <button onClick={() => SetQuantity((prev) => prev + 1)}>
                        +
                      </button>
                    </div>
                  </div>

                  <AddToBagButton
                    clicked={AddToBagClicked}
                    onClick={handleAddToBagClick}
                  >
                    {AddToBagClicked ? "ADDED!" : "ADD TO BAG"}
                  </AddToBagButton>
                </div>
              </>
            ) : (
              "dish not find"
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
