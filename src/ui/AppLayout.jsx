import { Outlet, useNavigation } from 'react-router-dom';
import CartOverview from '../features/cart/CartOverview';
import Header from './Header';
import Loader from './Loader';

function AppLayout() {
  // this is diffrent from useNavigate(), this we are using to load a loading spinner .
  const navigation = useNavigation();

  // am flabbergasted to see this tbh, this returns an object that has a property of status, that can tell you wether the app is laoding or idle, insane ain't bruv ?!

  console.log(navigation);

  // so this is ganan return true or false i think, every time the applayout re-renders it will assgin it to something new  idle/ready/loading etcetera.. .
  const isLoading = navigation.state === 'loading';

  return (
    <div className="grid  h-screen grid-rows-[auto_1fr_auto]  ">
      {isLoading && <Loader />}

      <Header />
      <div className="overflow-auto p-3">
        <main className="mx-auto  max-w-3xl overflow-auto ">
          <Outlet />
        </main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;

/* BING CHAT..

 ME : yes  i understand how to use it , i just wanna know how does react router know that there is something loading, or rather what triggers the navigation object to fire ?

Copy
Searching for: how does react router know that there is something loading

Generating answers for you…

 BING : I see. Well, react-router knows that there is something loading by using the loader function that you provide for each route. The loader function is a function that returns a promise that resolves to the data that you need for that route. For example, you can use the loader function to fetch some data from an API or a database. You can find more information about the loader function on react-router documentation.

The navigation object fires when you perform a navigation action, such as clicking on a link, using the browser’s back or forward buttons, or calling the navigate method from the useNavigate hook. When you do that, react-router will check if the destination route has a loader function, and if so, it will wait for the promise to resolve before rendering the component. While waiting, it will update the status property of the navigation object to reflect the current state of the navigation. You can find more information about the navigation actions on react-router documentation.

I hope this answers your question. If you have any more questions, please let me know. I’m happy to help. 😊

Learn more


1

reactrouter.com
2

stackoverflow.com
3

geeksforgeeks.org
4

github.com


ME : ohhh, so if i don't have data to being fetched the status will remain idle ?
Generating answers for you…

Yes, that is correct. If you don’t have data to be fetched, the status will remain idle, unless there is another reason for the navigation to be pending, ready, or suspended. For example, if you have a prompt or a modal that requires the user’s confirmation before navigating, the status will be pending until the user confirms or cancels. Or if you have a lazy component or an image that requires some time to load, the status will be suspended until the suspense boundary resolves. But if you don’t have any of these cases, the status will be idle by default. 😊
*/
