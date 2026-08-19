"use server";

import bcrypt from "bcryptjs";
import { connect } from "@/lib/dbConnect";

export const postUser = async (payload) => {
  try {
    const { name, email, password } = payload;

    // VALIDATION
    if (!name || !email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    // CHECK USER EXISTS
    const userExists = await connect("users").findOne({ email });

    if (userExists) {
      return {
        success: false,
        message: "User already exists",
      };
    }

    const newUser = {
      name,
      email,
      password: await bcrypt.hash(password, 14),
      provider: "credentials",
      role: "user",
      createdAt: new Date().toISOString(),
    };

    const result = await connect("users").insertOne(newUser);

    if (result.acknowledged) {
      return {
        success: true,
        message: "Your account has been created successfully!",
      };
    }

    return {
      success: false,
      message: "Failed to create user",
    };
  } catch (error) {
    console.error("Registration error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};

export const loginUser = async (payload) => {
  try {
    const { email, password } = payload;

    if (!email || !password) {
      return {
        success: false,
        message: "All fields are required",
      };
    }

    const user = await connect("users").findOne({ email });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return {
        success: false,
        message: "Invalid password",
      };
    }

    return {
      success: true,
      message: "Login successful",
    };
  } catch (error) {
    console.error("Login error:", error);

    return {
      success: false,
      message: "Something went wrong",
    };
  }
};
