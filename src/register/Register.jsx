import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import image from "../assets/Sign Up.png"
import toast from "react-hot-toast";


export default function Register() {
  const [error, setError] = useState();
  const navigate = useNavigate();
  let scheme = Yup.object().shape({
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    phone: Yup.string().required("Required"),
    password: Yup.string()
      .required(" password required")
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
  });

  async function handleRegister(values) {
    await axios
      .post("https://note-sigma-black.vercel.app/api/v1/users/signUp", values)
      .then((res) => {
        if (res?.data?.msg == "done") {
          toast.success("successfully")
         setTimeout(()=>{
          navigate("/login");
         },2000)
         
        }
      })
      .catch((err) => {
        setError(err?.response.data.msg);
      });
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    validationSchema: scheme,
    onSubmit: handleRegister,
  });

  return (
    <section className="container py-5 d-flex justify-content-center align-items-center gap-4">
      <div className="col-6  ">
      {error ? <h1 className="text-primary">{error}</h1> : ""}
        <Form className="d-flex flex-column" onSubmit={formik.handleSubmit}>
          <Row className="mb-3 d-flex flex-column gap-4">
            <Form.Group>
              <Form.Control
                required
                type="text"
                placeholder="Username"
                name="name"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.name && formik.errors.name ? (
                <div className="  my-2 form-control bg-primary ">
                  {formik.errors.name}
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
            <Form.Group>
              <Form.Control
                required
                type="number"
                placeholder="age"
                name="age"
                value={formik.values.age}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.age && formik.errors.age ? (
                <div className="  my-2 form-control bg-primary ">
                  {formik.errors.age}
                </div>
              ) : (
                ""
              )}
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group>
              <Form.Control
                required
                type="tel"
                placeholder="phone"
                name="phone"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="  my-2 form-control bg-primary ">
                  {formik.errors.phone}
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
            <span>Already have account ?</span>
            <Link to="/login">log in </Link>
           </div>
        </Form>
      </div>
      <div className="col">
      <img src={image} className="w-100" alt="" />
      </div>
    </section>
  );
}
