import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { useAuth } from "./hooks/useAwsAuth";
import { SignIn } from "./SignIn";

export const Hello = () => {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div></div>;
  }

  const TopPage = () => (
    <div>
      <p>トップページ</p>
      <p>{auth.isAuthenticated ? "ログイン済" : "未ログイン"}</p>
      <p>
        <Link to="/signin">ログイン</Link>
      </p>
    </div>
  );

  const PrivateDashboard = () => (
    <>
      <div>ようこそ！ {auth.username} さん！</div>
      <button onClick={() => auth.signOut()}>ログアウト</button>
    </>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<TopPage />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="dashboard" element={<PrivateDashboard />}></Route>
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </BrowserRouter>
  );
};
