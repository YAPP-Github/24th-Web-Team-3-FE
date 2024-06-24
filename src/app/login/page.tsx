import Login from "@/common/Login"
import AuthProvider from "@/lib/next-auth"

const LoginPage = () => {
  return (
    <div>
      로그인 페이지
      <AuthProvider>
        <Login />
      </AuthProvider>
    </div>
  )
}

export default LoginPage
