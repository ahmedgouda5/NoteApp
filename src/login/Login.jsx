import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import image from "../assets/Sign Up.png";
import toast from "react-hot-toast/headless";
export default function Login() {
  // let userToken = localStorage.getItem("token") || null
  
  const [error, setError] = useState();
  const navigate = useNavigate();
  let scheme = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Required"),

    password: Yup.string()
      .required(" password required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  async function handleLogin(values) {
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signIn", values)
      .then((res) => {
        if (res?.data?.msg == "done") {
          console.log(res);
          localStorage.setItem("token", res?.data?.token);
          navigate("/");
        
        }
      })
      .catch((err) => {
        setError(err?.response.data.msg);
      });
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: scheme,
    onSubmit: handleLogin,
  });

  return (
    <>
      <section className="container  py-5  d-flex  justify-content-center align-items-center    g-4">
        <div className="col m-3 ">
          <div>
            <img src={image} className="w-100" alt="" />
          </div>
        </div>
        <div className="col-6">
          {error ? <h1 className="text-primary">{error}</h1> : ""}
          <h1 className="my-3">Log in :</h1>
          <Form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
            <Row className="mb-3 d-flex flex-column gap-4">
              <Form.Group>
                <Form.Control
                  required
                  type="text"
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.email && formik.errors.email ? (
                  <div className="  my-2 form-control bg-primary ">
                    {formik.errors.email}
                  </div>
                ) : (
                  ""
                )}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group>
                <Form.Control
                  required
                  type="text"
                  placeholder="password"
                  name="password"
                  value={formik.values.password}
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                />
                {formik.touched.password && formik.errors.password ? (
                  <div className="  my-2 form-control bg-primary ">
                    {formik.errors.password}
                  </div>
                ) : (
                  ""
                )}
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Button type="submit " className="">
              Submit
            </Button>
            <div className="mt-2">
              <span>Not have account ?</span>
              <Link to="/register">Register </Link>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
}
