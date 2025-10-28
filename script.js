// ================================
// 🌐 LANGUAGE SWITCHER
// ================================
const langBtn = document.getElementById("langBtn");
const langMenu = document.getElementById("langMenu");

if (langBtn && langMenu) {
  langBtn.addEventListener("click", () => {
    langMenu.classList.toggle("show");
  });

  const translations = {
    en: {
      title: "Welcome to Sellora",
      subtitle: "The best deals and products in one place",
      login: "Login",
      signup: "Sign Up",
    },
    ar: {
      title: "مرحبًا بك في سيلورا",
      subtitle: "أفضل العروض والمنتجات في مكان واحد",
      login: "تسجيل الدخول",
      signup: "إنشاء حساب",
    },
    fr: {
      title: "Bienvenue sur Sellora",
      subtitle: "Les meilleures offres et produits en un seul endroit",
      login: "Connexion",
      signup: "Créer un compte",
    },
    es: {
      title: "Bienvenido a Sellora",
      subtitle: "Las mejores ofertas y productos en un solo lugar",
      login: "Iniciar sesión",
      signup: "Registrarse",
    },
  };

  langMenu.querySelectorAll("button").forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.dataset.lang;
      document.getElementById("title").textContent = translations[lang].title;
      document.getElementById("subtitle").textContent = translations[lang].subtitle;
      document.getElementById("loginBtn").textContent = translations[lang].login;
      document.getElementById("signupBtn").textContent = translations[lang].signup;
      langMenu.classList.remove("show");
    });
  });
}

// ================================
// 🔄 BUTTON NAVIGATION
// ================================
const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    window.location.href = "login.html";
  });
}

if (signupBtn) {
  signupBtn.addEventListener("click", () => {
    window.location.href = "signup.html";
  });
}

// ================================
// 🧠 SLIDER EFFECT (AUTO SLIDE)
// ================================
const slides = document.querySelector(".slides");
if (slides) {
  let index = 0;
  setInterval(() => {
    index = (index + 1) % slides.children.length;
    slides.style.transform = `translateX(-${index * 100}%)`;
  }, 4000);
}
