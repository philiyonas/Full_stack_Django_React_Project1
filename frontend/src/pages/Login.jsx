import Form from "../components/Form"
function Login() {
    return < Form route="/api/token/" method="login" /> // using Form component with route request and method props to specify login form
}
export default Login