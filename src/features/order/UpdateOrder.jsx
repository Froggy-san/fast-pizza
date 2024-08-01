import { useFetcher } from "react-router-dom";
import Button from "../../ui/button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({ order }) {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}

export default UpdateOrder;

export async function action({ request, params }) {
  console.log("update");

  const data = { priority: true };
  await updateOrder(params.orderId, data);
  return null;
}

/// as of now i don't really understand what the fuck did he just do if i am being honest here , but i can tell you what i think he idd, i think this compnant uses this action by making a PATCH request to the API by using the updateOrder function and please note that the updateOrder function am talking about isn't the compnant rather a function in the apiRestruant file.

// so when we use that action it updates the object it self on the API and makes the o(order) companent rerender witch fetchs the same object again by using the params , and naturaly that object that the order compnent will get is the updated one . and that is what i understood from it, i will watch the video again and see if am ganan update this comment or not , sorry if i disappoint .
