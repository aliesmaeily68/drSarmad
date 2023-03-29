import Layout from "../../Components/Layout/Layout";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";

function RegisterPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = ({ name, email, password }) => {
    const newUserObj = {
      userId: uuidv4(),
      name,
      password,
      email,
      isAdmin: false,
    };
    fetch("api/users", {
      method: "POST",
      body: JSON.stringify(newUserObj),
    });
  };
  return (
    <Layout headTitle="ثبت نام">
      <div>
        <Container className=" d-flex justify-content-center">
          <Form className="w-25" onSubmit={handleSubmit(submitHandler)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Name </Form.Label>
              <Form.Control
                {...register("name", { required: true })}
                id="name"
                type="text"
                placeholder="Enter name"
              />
              {errors.name && (
                <Form.Text className="text-danger">
                  نام نباید خالی باشد.
                </Form.Text>
              )}
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                {...register("email", { required: true })}
                id="email"
                type="email"
                placeholder="Enter email"
              />
              {errors.email && (
                <Form.Text className="text-danger">
                  ایمیل نباید خالی باشد.
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                {...register("password", {
                  required: true,
                  minLength: {
                    value: 8,
                    message: "نام کاربری از 8 کاراکتر کمتر نباشد",
                  },
                })}
                id="password"
                type="password"
                placeholder="Password"
              />
              {errors.password && (
                <Form.Text className="text-danger">
                  {errors.password.message}
                </Form.Text>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">
              ثبت نام
            </Button>
          </Form>
        </Container>
      </div>
    </Layout>
  );
}

export default RegisterPage;
