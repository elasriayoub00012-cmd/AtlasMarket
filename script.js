// Basic translation data
const translations = {
  en: {
    title: "Welcome to Sellora",
    subtitle: "The best deals and products in one place",
    login: "Login",
    signup: "Sign Up",
    loginTitle: "Login",
    signupTitle: "Create your account",
    userLabel: "Username or Email",
    passLabel: "Password",
    nameLabel: "Full name",
    emailLabel: "Email",
    confirmLabel: "Confirm Password",
    createBtn: "Create Account",
    languageLabel: "Language"
  },
  ar: {
    title: "مرحبا بك في Sellora",
    subtitle: "أفضل العروض والمنتجات في مكان واحد",
    login: "تسجيل الدخول",
    signup: "تسجيل",
    loginTitle: "تسجيل الدخول",
    signupTitle: "أنشئ حسابك",
    userLabel: "اسم المستخدم أو البريد",
    passLabel: "كلمة المرور",
    nameLabel: "الاسم الكامل",
    emailLabel: "البريد الإلكتروني",
    confirmLabel: "تأكيد كلمة المرور",
    createBtn: "إنشاء حساب",
    languageLabel: "اللغة"
  },
  fr: {
    title: "Bienvenue sur Sellora",
    subtitle: "Les meilleures offres et produits au même endroit",
    login: "Connexion",
    signup: "S'inscrire",
    loginTitle: "Connexion",
    signupTitle: "Créez votre compte",
    userLabel: "Nom d'utilisateur ou Email",
    passLabel: "Mot de passe",
    nameLabel: "Nom complet",
    emailLabel: "Email",
    confirmLabel: "Confirmer le mot de passe",
    createBtn: "Créer un compte",
    languageLabel: "Langue"
  },
  es: {
    title: "Bienvenido a Sellora",
    subtitle: "Las mejores ofertas y productos en un solo lugar",
    login: "Iniciar sesión",
    signup: "Regístrate",
    loginTitle: "Iniciar sesión",
    signupTitle: "Crea tu cuenta",
    userLabel: "Usuario o Email",
    passLabel: "Contraseña",
    nameLabel: "Nombre completo",
    emailLabel: "Correo electrónico",
    confirmLabel: "Confirmar contraseña",
    createBtn: "Crear cuenta",
    languageLabel: "Idioma"
  }
};

// language handling (stored in localStorage so it remembers)
function getLang(){ return localStorage.getItem('sellora_lang') || 'en'; }
function setLang(lang){
  localStorage.setItem('sellora_lang', lang);
  applyLanguage();
}
function applyLanguage(){
  const lang = getLang();
  const dict = translations[lang] || translations.en;

  // index page items
  const tTitle = document.getElementById('title');
  const tSub = document.getElementById('subtitle');
  if(tTitle) tTitle.textContent = dict.title;
  if(tSub) tSub.textContent = dict.subtitle;

  // buttons
  const loginBtn = document.querySelectorAll('.login-btn');
  const signupBtn = document.querySelectorAll('.signup-btn');
  loginBtn.forEach(b => b.textContent = dict.login);
  signupBtn.forEach(b => b.textContent = dict.signup);

  // forms
  const loginTitle = document.getElementById('loginTitle');
  if(loginTitle) loginTitle.textContent = dict.loginTitle;
  const signupTitle = document.getElementById('signupTitle');
  if(signupTitle) signupTitle.textContent = dict.signupTitle;

  const labelUser = document.getElementById('labelUser');
  if(labelUser) labelUser.textContent = dict.userLabel;
  const labelPass = document.getElementById('labelPass');
  if(labelPass) labelPass.textContent = dict.passLabel;

  const labelName = document.getElementById('labelName');
  if(labelName) labelName.textContent = dict.nameLabel;
  const labelEmail = document.getElementById('labelEmail');
  if(labelEmail) labelEmail.textContent = dict.emailLabel;
  const labelPassword = document.getElementById('labelPassword');
  if(labelPassword) labelPassword.textContent = dict.passLabel;
  const labelConfirm = document.getElementById('labelConfirm');
  if(labelConfirm) labelConfirm.textContent = dict.confirmLabel;

  const createBtn = document.querySelector('.signup-btn');
  if(createBtn) createBtn.textContent = dict.createBtn;

  // lang button text
  const langBtn = document.querySelectorAll('.lang-btn');
  langBtn.forEach(b => b.textContent = '🌐 ' + (dict.languageLabel || 'Language'));
}

// language menu toggle
document.addEventListener('click', function(e){
  const menu = document.getElementById('langMenu');
  if(!menu) return;
  const langBtn = document.querySelector('.lang-btn');
  if(e.target === langBtn) {
    menu.style.display = (menu.style.display === 'block') ? 'none' : 'block';
  } else {
    // click elsewhere -> hide
    if(!menu.contains(e.target)) menu.style.display = 'none';
  }
});

// attach menu language choices
document.addEventListener('DOMContentLoaded', function(){
  const menu = document.getElementById('langMenu');
  if(menu){
    menu.querySelectorAll('button[data-lang]').forEach(btn=>{
      btn.addEventListener('click', function(){
        const code = btn.getAttribute('data-lang');
        setLang(code);
        // small UX: hide menu
        menu.style.display = 'none';
      });
    });
  }

  // apply language on load
  applyLanguage();

  // index buttons navigate
  const loginNav = document.getElementById('loginBtn');
  const signupNav = document.getElementById('signupBtn');
  if(loginNav) loginNav.addEventListener('click', ()=> window.location.href = 'login.html');
  if(signupNav) signupNav.addEventListener('click', ()=> window.location.href = 'signup.html');

  // LOGIN functionality (localStorage)
  const loginForm = document.getElementById('loginForm');
  if(loginForm){
    loginForm.addEventListener('submit', function(e){
      e.preventDefault();
      const u = document.getElementById('loginUser').value.trim();
      const p = document.getElementById('loginPass').value;
      const users = JSON.parse(localStorage.getItem('sellora_users')||'[]');
      const found = users.find(x => (x.email === u || x.username === u) && x.password === p);
      if(found){
        alert('Login successful — welcome, ' + (found.name || found.email));
        // store current user
        localStorage.setItem('sellora_current', JSON.stringify(found));
        window.location.href = 'index.html';
      } else {
        alert('Login failed — wrong credentials.');
      }
    });
  }

  // SIGNUP functionality
  const signupForm = document.getElementById('signupForm');
  if(signupForm){
    signupForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('signupName').value.trim();
      const email = document.getElementById('signupEmail').value.trim();
      const pass = document.getElementById('signupPass').value;
      const conf = document.getElementById('signupConfirm').value;
      if(!name || !email || !pass) return alert('Please fill all fields');
      if(pass !== conf) return alert('Passwords do not match');
      const users = JSON.parse(localStorage.getItem('sellora_users')||'[]');
      if(users.find(u => u.email === email)) return alert('Email already used');
      const newUser = { id: Date.now(), name, email, password: pass, username: email };
      users.push(newUser);
      localStorage.setItem('sellora_users', JSON.stringify(users));
      alert('Account created! You can login now.');
      window.location.href = 'login.html';
    });
  }
});
