import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../features/auth/authSlice.js";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const registerValidation = Yup.object().shape({
    fullName: Yup.string()
      .min(2, "Full name must be at least 2 characters")
      .required("Full name is required"),

    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),

    gender: Yup.string()
      .oneOf(["male", "female", "other"], "Please select a valid gender")
      .required("Gender is required"),

    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits and Numeric")
      .required("Phone number is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),

    avatar: Yup.mixed()
      .nullable()
  });

  return (
    
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {status === "loading" && <p className="text-blue-500">Registering...</p>}
      {status === "failed" && <p className="text-red-500">{error}</p>}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        
        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
          Create a new account
        </h2>
      </div>

      <Formik
        initialValues={{
          fullName: "",
          email: "",
          gender: "",
          phoneNumber: "",
          password: "",
          avatar: null,
        }}
        validationSchema={registerValidation}
        onSubmit={async(values, { setSubmitting, resetForm }) => {
            console.log("jake")
          const formData = new FormData();
          Object.entries(values).forEach(([key, value]) => {
            formData.append(key, value);
          });

          try {
            console.log("Submitting form", values);
            await dispatch(registerUser(formData)).unwrap();
            resetForm();
            toast.success("Registration successful!");
             navigate("/login");
          } catch (error) {
            toast.error(error || "Registration failed");
            console.error("Registration failed:", error);
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          isSubmitting,
        }) => (
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form
              className="space-y-6"
              onSubmit={handleSubmit}
              encType="multipart/form-data"
            >
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-900"
                >
                  Full Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.fullName}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.fullName && touched.fullName && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.fullName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-900"
                >
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.email && touched.email && (
                    <p className="text-red-600 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Gender */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-900"
                >
                  Gender
                </label>
                <div className="mt-2">
                  <select
                    name="gender"
                    id="gender"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.gender}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-indigo-600 sm:text-sm"
                  >
                    <option value="">Select gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errors.gender && touched.gender && (
                    <p className="text-red-600 text-sm mt-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-900"
                >
                  Phone Number
                </label>
                <div className="mt-2">
                  <input
                    type="tel"
                    name="phoneNumber"
                    id="phoneNumber"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.phoneNumber}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.phoneNumber && touched.phoneNumber && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                    required
                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline-indigo-600 sm:text-sm"
                  />
                  {errors.password && touched.password && (
                    <p className="text-red-600 text-sm mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              </div>

              {/* Avatar */}
              <div>
                <label
                  htmlFor="avatar"
                  className="block text-sm font-medium text-gray-900"
                >
                  Avatar
                </label>
                <div className="mt-2">
                  <input
                    type="file"
                    name="avatar"
                    id="avatar"
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue("avatar", event.currentTarget.files[0]);
                    }}
                    className="block w-full text-sm text-gray-900 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-indigo-500"
                  />
                  {errors.avatar && touched.avatar && (
                    <p className="text-red-600 text-sm mt-1">{errors.avatar}</p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                onClick={() => console.log("hel")}
                  type="submit"
                  disabled={isSubmitting}
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-500 focus:outline-indigo-600 focus:outline-2 focus:outline-offset-2"
                >
                  Register
                </button>
              </div>
            </form>

            <p className="mt-10 text-center text-sm text-gray-500">
              Already have an account?
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-500"
              >
                {" "}
                Sign in here
              </Link>
            </p>
          </div>
        )}
      </Formik>
    </div>
  );
}
