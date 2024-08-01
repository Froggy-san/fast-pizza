import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

// const fakeCart = [
//   {
//     pizzaId: 12,
//     name: "Mediterranean",
//     quantity: 2,
//     unitPrice: 16,
//     totalPrice: 32,
//   },
//   {
//     pizzaId: 6,
//     name: "Vegetale",
//     quantity: 1,
//     unitPrice: 13,
//     totalPrice: 13,
//   },
//   {
//     pizzaId: 11,
//     name: "Spinach and Mushroom",
//     quantity: 1,
//     unitPrice: 15,
//     totalPrice: 15,
//   },
// ];

function CreateOrder() {
  // const cart = fakeCart;

  const [withPriority, setWithPriority] = useState(false);

  const {
    username,
    status: addressStatus,
    position,
    address,
    errorAddress,
  } = useSelector((state) => state.user);

  const isLoadingAdress = addressStatus === "loading";

  console.log(address, "Adress here !!");
  const navigation = useNavigation();

  const cart = useSelector(getCart);
  console.log(cart, "CART HERE !!!! ");

  const totalCartPrice = useSelector(getTotalCartPrice);

  const dispatch = useDispatch();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;

  const totalPrice = totalCartPrice + priorityPrice;

  // this might be confusing for you so am telling you that but we are getting this error object becase we conected the action on this route that has this compnent that we are on right now so from that action we can get the data that returned from that action like down below . for more explantion go watch video number 12 .

  const formErrors = useActionData();

  const isSubmitting = navigation.state === "submitting";

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      {/*

      this Form isn't a comonenet nor an html element it is a From from react-router-dom used to post api request into an api
      
      */}

      {/*

 teach said we don't need to put the action attribute becasue router will go to the clossest router ...

<Form method ="POST" action = "/order/new" > 
*/}

      <Form method="POST">
        <div className="mb-5 flex gap-2  flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input flex-1"
            defaultValue={username} // i wrote value but jonas said it's not how we do it becasue we can't change the value couse it's not a controled element we should use defaultvlaue insteaad  it's an html element btw not a react thing.
          />
        </div>

        <div className="mb-5 flex gap-2  flex-col sm:flex-row sm:items-center ">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input type="tel" name="phone" required className="input" />

            {formErrors?.phone && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2  flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              type="text"
              name="address"
              required
              defaultValue={address}
              disabled={isLoadingAdress}
              className="input
            "
            />

            {addressStatus === "error" && (
              <p className="text-xs mt-2 text-red-700 bg-red-100 p-2 rounded-md">
                {errorAddress} asdasdad
              </p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <span className="absolute right-[3px] z-50">
              <Button
                type="small"
                disabled={isLoadingAdress}
                onClick={(e) => {
                  dispatch(fetchAddress());
                  e.preventDefault();
                }}
              >
                Get Positions
              </Button>
            </span>
          )}
        </div>
        {/* the accent property to change the checkbox background color */}
        <div className="mb-12 flex gap-5 items-center ">
          <input
            className="h-6 w-6 accent-yellow-400
            focus:outline-none focus:ring focus:ring-yellow-400
            focus:ring-offset-2
            
            "
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          {
            /* this is a way to get the infromation of the cart variable up there , when we submit the form , down in the action  function */
            <>
              <input type="hidden" name="cart" value={JSON.stringify(cart)} />

              <input
                type="hidden"
                name="position"
                value={
                  position.longitude && position.latitude
                    ? `${position.latitude},${position.longitude}`
                    : ""
                }
              />
            </>
          }

          {/*offset is the space between the ring/  outline and the element  */}
          <Button type="primary" disabled={isSubmitting || isLoadingAdress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now  ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

/// NOTE this is like the loader function but here we post data into a server where as the loader gets the data from the server .

export async function action({ request }) {
  // the reqeust object
  console.log(request, "REQUEST HERE !!");

  // getting the data from the form
  const formData = await request.formData();

  // turning the data into an object
  const data = Object.fromEntries(formData);
  console.log(data, "FORM DATA HERE !!");
  console.log(data.priority, " CHECK HERE !!!!!");
  console.log();

  // refactoring the object to turn the cart sting back into an object .
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  console.log(order, "ORDER HERE !! 12312312");

  /// Error handling in a form
  const errors = {};

  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone number , we might need it to contact you";

  if (Object.keys(errors).length > 0) return errors;

  // this function will "POST" the new order into the API , and also ganna return data look at the funtion code to know more  that is why we are awaiting to get the id from it witch is created by the api it self .

  // if everything is ok create order and redirect

  const newOrder = await createOrder(order);

  // ---- we shouldn't do that often

  store.dispatch(clearCart());

  // ---- we shouldn't do that often

  /// NOTE down below we want to redirect the user into anther page, we used to use useNaviage()  but useNavigae is a hook , and we can't use hooks inside function , we can only use it in compnents, and here is the selution to that problem .

  // also NOTE the the id we are getting here is from the new object we just got from the "newOrder" the API added that ID just so you aren't confused as to where we wrote the id, we didn't the api did that .

  // redirecting the page to /order/:id
  return redirect(`/order/${newOrder.id}`);

  // return null; // we have to always return something in an action request .
}

export default CreateOrder;

// MORE EXPLANATION :

/*
 1) we make the form into a react-router <Form>

 2) now we can use the action function , it is a funtion we use like the loader function , to make a request, it takes "request" as a porp 

 3) this line  const formData = await request.formData();  is ganna take the whole data with in the form , one of these data peices is the "cart" data witch i think you will find it confusing in the future , we got that data by making an "input" that is hidden that has the value attribute = to the cart data . and later on in the action function we do turn it into an object again . 
 
 
 */
