// === Sellora Supabase Auth Script ===

// 1️⃣ إعداد الاتصال مع Supabase
const SUPABASE_URL = "https://YOUR_PROJECT_URL.supabase.co";
const SUPABASE_KEY = "YOUR_PUBLIC_ANON_KEY";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 2️⃣ التحكم في اللغة
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

if (langBtn && langMenu) {
  langBtn.addEventListener("click", () => {
    langMenu.classList.toggle("show");
  });

  document.querySelectorAll("#langMenu button").forEach(btn => {
    btn.addEventListener("click", e => {
      const lang = e.target.getAttribute("data-lang");
      localStorage.setItem("lang", lang);
      window.location.reload();
    });
  });

  const savedLang = localStorage.getItem("lang") || "en";
  document.documentElement.lang = savedLang;
}

// 3️⃣ تسجيل مستخدم جديد
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

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
    });

    if (error) {
      alert("Error: " + error.message);
    } else {
      alert("Account created successfully! Please check your email to confirm.");
      window.location.href = "login.html";
    }
  });
}

// 4️⃣ تسجيل الدخول
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPass").value;

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert("Login failed: " + error.message);
    } else {
      alert("Login successful!");
      window.location.href = "index.html";
    }
  });
}
