import Layout from "../../Components/Layout/Layout";
import { Container, Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import Link from "next/link";

function LoginPage() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const submitHandler = (email, password) => {};
  return (
    <Layout headTitle="ورود">
      <div>
        <Container className=" d-flex justify-content-center">
          <Form className="w-25" onSubmit={handleSubmit(submitHandler)}>
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
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <div className="d-flex justify-content-around">
              <Button variant="primary" type="submit">
                ارسال
              </Button>
              <Link href="/register">
                <Button variant="primary" type="button">
                  ثبت نام
                </Button>
              </Link>
            </div>
          </Form>
        </Container>
      </div>
    </Layout>
  );
}

export default LoginPage;
