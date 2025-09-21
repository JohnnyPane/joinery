import { useMe } from '../../hooks/useMe.js';

const Home = () => {
  const { data: user, isLoading, isError, error } = useMe();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>Welcome to Joinery</h1>
      {user ? (
        <p>Hello, {user.name}!</p>
      ) : (
        <p>Please log in to access your dashboard.</p>
      )}
    </div>
  );
}

export default Home;