import { useRouteError } from 'react-router-dom';
import LinkButton from './LinkButton';

function Error() {
  // const navigate = useNavigate();

  // to get error need to search a bit to know more about it .

  const error = useRouteError();
  console.log(error);
  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      {/* <button onClick={() => navigate(-1)}>&larr; Go back</button> */}
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
