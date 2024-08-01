import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  // NOTE redux recommends that we do calculation in side the selector as shown below not  like you did down there . BTW you were confused about why he used a reducer to calculate the quantity of pizzas , and he use it becsue the quantity amount is inside the object it self   . so we are not adding a new object that has the same pizza or anything .

  // we imported getTotalCartQuantity form the cartSlice it slef here .
  const totalCartQuantity = useSelector(getTotalCartQuantity);

  const totalCartPrice = useSelector(getTotalCartPrice);

  // ----------------------------

  // !NOTE this code we refactored jsut above me here ^ for further explanation go to the cart slice and go all the way down and read the comments  LOOK UP ^ ^.

  // const totalCartQuantity = useSelector((state) =>
  //   state.cart.cart.reduce((sum, currEl) => sum + currEl.quantity, 0)
  // );

  // ----------------------------

  // -----------
  // this is your code, not the teacher's .
  // const numOfItems = cart.length;

  // const totalPrice = cart.reduce((acc, currentEl) => {
  //   acc += currentEl.unitPrice;
  // });
  // console.log(numOfItems, totalPrice);

  // -----------
  if (!totalCartQuantity) return null;

  return (
    <div className="bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 text-sm md:text-base flex item-center justify-between">
      <p className=" font-semibold  text-stone-300  space-x-4 sm:space-x-6 ">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to={"/cart"}>Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
