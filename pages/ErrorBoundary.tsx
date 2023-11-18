type FallbackProps = {
  error: Error;
  resetErrorBoundary: () => void;
};
const Fallback: React.FC<FallbackProps> = ({ error, resetErrorBoundary }) => {
  // Call resetErrorBoundary() to reset the error boundary and retry the render.

  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: "red" }}>{error.message}</pre>
    </div>
  );
};

export default Fallback;
