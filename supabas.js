// ✅ إعداد Supabase
const SUPABASE_URL = "https://igvhnbevfufbrcepuvyc.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlndmhuYmV2ZnVmYnJjZXB1dnljIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE1ODI4NTIsImV4cCI6MjA3NzE1ODg1Mn0.QGsqHgU4ziN60ACkRJiduFWKkK_JxjhnUtH-zjgLgd4";

const supabase = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// 🧩 تسجيل حساب جديد
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("signupName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPass").value.trim();
    const confirm = document.getElementById("signupConfirm").value.trim();

    if (!name || !email || !password || !confirm) {
      alert("⚠️ من فضلك املأ جميع الحقول");
      return;
    }

    if (password !== confirm) {
      alert("❌ كلمتا المرور غير متطابقتين");
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
      console.error(error);
      alert("❌ فشل إنشاء الحساب: " + error.message);
    } else {
      alert("✅ تم إنشاء الحساب بنجاح! تحقق من بريدك الإلكتروني لتفعيل الحساب.");
      window.location.href = "login.html";
    }
  });
}

// 🔑 تسجيل الدخول
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("loginEmail").value.trim();
    const password = document.getElementById("loginPass").value.trim();

    if (!email || !password) {
      alert("⚠️ أدخل البريد الإلكتروني وكلمة المرور");
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      console.error(error);
      alert("❌ فشل تسجيل الدخول: " + error.message);
    } else {
      alert("✅ تم تسجيل الدخول بنجاح!");
      window.location.href = "dashboard.html";
    }
  });
}
