// ui.js - UI utilities and internationalization
// Version: 14 (Fixed & Optimized)

// ========== Internationalization ==========
window.I18N = {
  uk: {
    sound: "Звук",
    input_label: "Введіть відповідь",
    title: "Додавання та віднімання",
    settings: "Налаштування",
    level: "Рівень",
    level_easy: "Легкий (≤10)",
    level_medium: "Середній (≤100 без переходу)",
    level_adv: "Просунутий (≤100 з переходом)",
    mode: "Режим відповіді",
    mode_2: "2 варіанти",
    mode_3: "3 варіанти",
    mode_input: "Ввід відповіді",
    series: "Серія",
    endless: "Без обмежень",
    start: "Почати",
    next: "Далі",
    back: "Налаштування",
    exit: "Вихід",
    submit: "Відповісти",
    total: "Всього",
    correct: "Вірно",
    wrong: "Помилки",
    streak: "Серія",
    right_toast: "Правильно! 🎉",
    wrong_toast: "Спробуй ще раз! 💪",
    results_title: "Ти на правильному шляху!",
    total_label: "Всього",
    correct_label: "Вірно",
    wrong_label: "Помилки",
    accuracy_label: "Точність",
    time_label: "Час",
    try_again: "Спробувати ще"
  },
  en: {
    sound: "Sound",
    input_label: "Type the answer",
    title: "Addition & Subtraction",
    settings: "Settings",
    level: "Difficulty",
    level_easy: "Easy (≤10)",
    level_medium: "Medium (≤100 no carry)",
    level_adv: "Advanced (≤100 with carry/borrow)",
    mode: "Answer mode",
    mode_2: "2 options",
    mode_3: "3 options",
    mode_input: "Type answer",
    series: "Series",
    endless: "Endless",
    start: "Start",
    next: "Next",
    back: "Settings",
    exit: "Exit",
    submit: "Submit",
    total: "Total",
    correct: "Correct",
    wrong: "Wrong",
    streak: "Streak",
    right_toast: "Correct! 🎉",
    wrong_toast: "Try again! 💪",
    results_title: "You're on the right track!",
    total_label: "Total",
    correct_label: "Correct",
    wrong_label: "Wrong",
    accuracy_label: "Accuracy",
    time_label: "Time",
    try_again: "Try Again"
  },
  ru: {
    sound: "Звук",
    input_label: "Введите ответ",
    title: "Сложение и вычитание",
    settings: "Настройки",
    level: "Уровень сложности",
    level_easy: "Лёгкий (≤10)",
    level_medium: "Средний (≤100 без перехода)",
    level_adv: "Продвинутый (≤100 с переходом)",
    mode: "Режим ответа",
    mode_2: "2 варианта",
    mode_3: "3 варианта",
    mode_input: "Ввод ответа",
    series: "Серия",
    endless: "Без ограничения",
    start: "Старт",
    next: "Следующий",
    back: "Настройки",
    exit: "Выход",
    submit: "Ответить",
    total: "Всего",
    correct: "Верно",
    wrong: "Ошибки",
    streak: "Серия",
    right_toast: "Правильно! 🎉",
    wrong_toast: "Попробуй ещё раз! 💪",
    results_title: "Ты на правильном пути!",
    total_label: "Всего",
    correct_label: "Верно",
    wrong_label: "Ошибки",
    accuracy_label: "Точность",
    time_label: "Время",
    try_again: "Попробовать ещё"
  },
  es: {
    sound: "Sonido",
    input_label: "Escribe la respuesta",
    title: "Suma y Resta",
    settings: "Ajustes",
    level: "Nivel",
    level_easy: "Fácil (≤10)",
    level_medium: "Medio (≤100 sin llevada)",
    level_adv: "Avanzado (≤100 con llevada/préstamo)",
    mode: "Modo de respuesta",
    mode_2: "2 opciones",
    mode_3: "3 opciones",
    mode_input: "Escribir respuesta",
    series: "Serie",
    endless: "Sin límite",
    start: "Inicio",
    next: "Siguiente",
    back: "Ajustes",
    exit: "Salir",
    submit: "Responder",
    total: "Total",
    correct: "Correcto",
    wrong: "Errores",
    streak: "Racha",
    right_toast: "¡Correcto! 🎉",
    wrong_toast: "¡Intenta de nuevo! 💪",
    results_title: "¡Estás en el camino correcto!",
    total_label: "Total",
    correct_label: "Correcto",
    wrong_label: "Errores",
    accuracy_label: "Precisión",
    time_label: "Tiempo",
    try_again: "Intentar de nuevo"
  }
};

/**
 * Apply internationalization to the page (FIXED)
 * @param {string} lang - Language code (uk, en, ru, es)
 */
window.applyI18n = function(lang) {
  // Нормализация: если пришел 'ua', но в словаре только 'uk', или наоборот
  const dict = window.I18N[lang] || window.I18N.uk || window.I18N.ua;

  // Update all elements with data-i18n attribute
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    if (dict && dict[key]) {
      el.textContent = dict[key];
    }
  });

  // Update HTML lang attribute
  document.documentElement.lang = lang;

  // Update active language button (Smart check)
  document.querySelectorAll(".lang-btn").forEach(b => {
    const btnLang = b.dataset.lang;
    // Считаем 'ua' и 'uk' одинаковыми
    const isMatch = (btnLang === lang) ||
                    (btnLang === 'uk' && lang === 'ua') ||
                    (btnLang === 'ua' && lang === 'uk');

    b.classList.toggle("active", isMatch);
  });
};

/**
 * Show toast notification
 * @param {string} msg - Message to display
 * @param {boolean} ok - True for success (green), false for error (red)
 */
window.showToast = function(msg, ok = true) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.className = "toast" + (ok ? "" : " error");
  
  requestAnimationFrame(() => {
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 1200);
  });
};

/**
 * Render task on the board
 * @param {Object} task - Task object with a, b, op, answer
 */
window.renderTask = function(task) {
  const taskEl = document.getElementById("task");
  taskEl.textContent = `${task.a} ${task.op} ${task.b} = ?`;
  
  // Remove expanded class for new task
  const board = document.querySelector('.board');
  if (board) {
    board.classList.remove('expanded');
  }
};

/**
 * Render answer options (for 2/3 choice modes)
 * @param {Array} options - Array of option objects with value and correct
 */
window.renderOptions = function(options) {
  const wrap = document.getElementById("answers");
  wrap.innerHTML = "";
  
  if (!options) return;
  
  options.forEach(opt => {
    const btn = document.createElement("button");
    btn.className = "answer-btn";
    btn.textContent = opt.value;
    btn.dataset.correct = opt.correct ? "1" : "0";
    wrap.appendChild(btn);
  });

};
