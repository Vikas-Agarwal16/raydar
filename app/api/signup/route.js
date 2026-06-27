  import dbConnect from "@/lib/mongodb";
  import User from "@/models/User";
  import bcrypt from "bcryptjs";
  import { NextResponse } from "next/server";

  export async function POST(request) {
    try {
      const { name, email, password } = await request.json();

      // Validation
      if (!name || !email || !password) {
        return NextResponse.json(
          { error: "All fields are required" },
          { status: 400 }
        );
      }

      if (password.length < 8) {
        return NextResponse.json(
          { error: "Password must be at least 8 characters" },
          { status: 400 }
        );
      }

      // Connect to database
      await dbConnect();

      const existingUser = await User.findOne({ email: email.toLowerCase() });

      if (existingUser) {
        return NextResponse.json(
          { error: "An account with this email already exists" },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = await User.create({
        name: name.trim(),
        email: email.toLowerCase().trim(),
        password: hashedPassword,
      });

      console.log("✅ User created successfully:", newUser.email);

      return NextResponse.json(
        { message: "Account created successfully" },
        { status: 201 }
      );
    } catch (error) {
      console.error("Signup error:", error);

      // More specific error messages for debugging
      if (error.name === "MongoNetworkError" || error.message.includes("ECONNREFUSED")) {
        return NextResponse.json(
          { error: "Database connection failed. Please try again." },
          { status: 500 }
        );
      }

      return NextResponse.json(
        { error: "Something went wrong. Please try again." },
        { status: 500 }
      );
    }
  }