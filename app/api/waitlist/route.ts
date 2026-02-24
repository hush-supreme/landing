import { supabase } from "@landing/app/lib/supabase";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, firstName, lastName, referralSource, basedInEurope } =
    await request.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 },
    );
  }

  const normalizedEmail = email.trim().toLowerCase();

  // Basic email validation
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 },
    );
  }

  const { error } = await supabase
    .from("waitlist")
    .insert({
      email: normalizedEmail,
      ...(firstName && typeof firstName === "string" && {
        first_name: firstName.trim(),
      }),
      ...(lastName && typeof lastName === "string" && {
        last_name: lastName.trim(),
      }),
      ...(referralSource && typeof referralSource === "string" && {
        referral_source: referralSource,
      }),
      ...(basedInEurope && typeof basedInEurope === "string" && {
        based_in_europe: basedInEurope,
      }),
    });

  if (error) {
    // Unique constraint violation = already signed up
    if (error.code === "23505") {
      return NextResponse.json(
        { message: "You're already on the list!" },
        { status: 200 },
      );
    }
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json(
    { message: "You're on the list!" },
    { status: 201 },
  );
}
