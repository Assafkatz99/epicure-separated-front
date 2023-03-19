import Icons from "../../typs/interfaces/ICard";
import { IDish } from "./slicersInterfaces";

export interface IModalProps {
  show: boolean;
  onclick: () => void;
  dish: IDish | undefined;
}
