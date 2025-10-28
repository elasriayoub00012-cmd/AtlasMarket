// Initialize Supabase client
const SUPABASE_URL = "https://igvhnbevfufbrcepuvyc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndmhuYmV2ZnVmYnJjZXB1dnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1ODI4NTIsImV4cCI6MjA3NzE1ODg1Mn0.QGsqHgU4ziN60ACkRJiduFWKkK_JxjhnUtH-zjgLgd4";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Handle signup form
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value;
    const email = document.getElementById("signupEmail").value;
    const password = document.getElementById("signupPass").value;
    const confirm = document.getElementById("signupConfirm").value;

    if (password !== confirm) {
      alert("Passwords do not match!");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) {
      alert("❌ Signup failed: " + error.message);
    } else {
      alert("✅ Account created successfully! Please check your email for confirmation.");
      window.location.href = "login.html";
    }
  });
}

// Handle login form
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPass").value;

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert("❌ Login failed: " + error.message);
    } else {
      alert("✅ Logged in successfully!");
      window.location.href = "dashboard.html"; // الصفحة اللي غادي نمشيو ليها من بعد
    }
  });
}
