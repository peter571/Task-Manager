import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import { useAppDispatch, useAppSelector } from "../../hooks/hook";
import { RegisterValues } from "../../types";
import { registerUser } from "./userSlice";
import { toast } from "react-toastify";
import { userSelector } from "./userSlice";
import { useAccountContext } from "../../context/AccountContext";

export default function Register() {
  const initialValues = {
    email: "",
    name: "",
    password: "",
    confirmPassword: "",
    avatar: "",
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isloading } = useAppSelector(userSelector);
  const { changeHasAccount } = useAccountContext();
  const [registerDetails, setRegisterDetails] = useState<RegisterValues>(initialValues);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const user = await dispatch(registerUser(registerDetails)).unwrap();
      localStorage.setItem("account_user", JSON.stringify(user));
      setRegisterDetails(initialValues)
      toast.success(`Successfully logged in to ${user.user.name}`);
      navigate("/spaces");
    } catch (error) {
      toast.warn(`${error}`);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegisterDetails({ ...registerDetails, [e.target.name]: e.target.value });
  }

  const handleImageInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    const reader = new FileReader();

    reader.onload = function () {
      const imgUrl = reader.result;
      setRegisterDetails({ ...registerDetails, avatar: imgUrl });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="auth__form">
      <div className="div-container">
        <h1 className="logo text-center">Register</h1>
        <input
          className="form__input py-2"
          type="text"
          name="name"
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          className="form__input py-2"
          type="email"
          name="email"
          onChange={handleChange}
          placeholder="Enter email"
          required
        />
        <input
          className="form__input py-2 cursor-pointer"
          type="file"
          name="avatar"
          onChange={handleImageInput}
          placeholder="Choose profile image"
          required
        />
        <input
          className="form__input py-2"
          type="password"
          name="password"
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <input
          className="form__input py-2"
          type="password"
          name="confirmPassword"
          onChange={handleChange}
          placeholder="Confirm password"
          required
        />
        <button type="submit" className="btn" disabled={isloading}>
          {isloading ? <Loader /> : "Register"}
        </button>
        <p>
          Already have an account?{" "}
          <Link
            className="text-blue-500"
            to="/"
            onClick={() => changeHasAccount()}
          >
            Log in
          </Link>
        </p>
      </div>
    </form>
  );
}
