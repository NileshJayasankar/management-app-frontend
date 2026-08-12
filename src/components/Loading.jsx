const Loading = ({ message = 'Loading...' }) => {
  return (
    <div className="loading-screen">
      <div className="spinner" />
      <p>{message}</p>
    </div>
  );
};

export default Loading;
