import Form from "../components/Form"

function Register() {
    return <Form route="/api/user/register/" method="register" /> // using Form component with route request and method props to specify registration form
}
export default Register