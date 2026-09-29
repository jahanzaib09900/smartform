import { supabase } from "./supabase";


// =========================
// SIGN UP
// =========================

export async function signUp(
  email: string,
  password: string,
  fullName = "",
) {
  const { data, error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() || null },
      },
    });

  return {
    data,
    error,
  };
}



// =========================
// LOGIN
// =========================

export async function signIn(
  email: string,
  password: string
) {
  const { data, error } =
    await supabase.auth.signInWithPassword({
      email,
      password,
    });

  return {
    data,
    error,
  };
}


// Alias for login page
export async function login(
  email: string,
  password: string
) {
  return signIn(
    email,
    password
  );
}



// =========================
// LOGOUT
// =========================

export async function signOut() {

  const { error } =
    await supabase.auth.signOut();

  return {
    error,
  };

}



// =========================
// GET CURRENT SESSION
// =========================

export async function getSession() {

  const { data, error } =
    await supabase.auth.getSession();

  return {
    session: data.session,
    error,
  };

}



// =========================
// FORGOT PASSWORD
// =========================

export async function forgotPassword(
  email: string
) {

  const { error } =
    await supabase.auth.resetPasswordForEmail(
      email,
      {
        redirectTo: `${window.location.origin}/reset-password`,
      }
    );


  return {
    error,
  };

}



// =========================
// UPDATE PASSWORD
// =========================

export async function updatePassword(
  password: string
) {

  const { error } =
    await supabase.auth.updateUser({
      password,
    });


  return {
    error,
  };

}