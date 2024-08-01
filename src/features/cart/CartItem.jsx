import { useSelector } from "react-redux";

import { formatCurrency } from "../../utils/helpers";
import DeleteItem from "./DeleteItem";
import UpdateITemQuantity from "./UpdateITemQuantity";
import { getCurrentQuantityById } from "./cartSlice";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex justify-between items-center sm:gap-6">
        <p className="text-sm font-bold ">{formatCurrency(totalPrice)}</p>

        <UpdateITemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />

        {/* --------------------- */}
        <DeleteItem pizzaId={pizzaId} />

        {/* <Button type="small">Delete </Button> */}
        {/* --------------------- */}
      </div>
    </li>
  );
}

export default CartItem;
