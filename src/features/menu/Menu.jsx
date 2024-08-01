import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  const menu = useLoaderData();
  console.log(menu, "HERE MENU");

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem pizza={pizza} key={pizza.id} />
      ))}
    </ul>
  );
}

/// Hey just because you were confused about the loader function here is an explanation , we defined a loader funtion and used it in the Menu compnant up above, by using the useLoaderData() am not entirly sure about this , but this is atleast 90% correct .

export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;

/// the sentance water falls has been mentioned alot during the lecture, in describing how we use to feetch data , when we render the page first and then fetch the data.
