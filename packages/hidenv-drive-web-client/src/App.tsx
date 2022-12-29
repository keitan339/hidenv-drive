import { Hello } from "./Hello2";
import { AuthProvider } from "./hooks/useAwsAuth";

const App = () => {
  return (
    <>
      <AuthProvider>
        <Hello />
      </AuthProvider>
    </>
  );
};

export default App;
