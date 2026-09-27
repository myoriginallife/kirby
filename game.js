(() => {
  "use strict";

  // 카테고리별 문제 데이터 (art.js 의 KIRBY_ART 키와 연결)
  const DATA = [
    // 친구·주인공
    { id: "kirby", name: "커비", cat: "friends", hint: "별의 전사! 무엇이든 빨아들여요" },
    { id: "bandana-dee", name: "반다나 와들디", cat: "friends", hint: "파란 두건과 창이 트레이드마크" },
    { id: "meta-knight", name: "메타 나이트", cat: "friends", hint: "가면을 쓴 수수께끼의 검사" },
    { id: "dedede", name: "디디디 대왕", cat: "friends", hint: "스스로 푸푸푸 나라의 왕이라 불러요" },
    { id: "magolor", name: "마호로아", cat: "friends", hint: "로어호를 타고 온 이방인" },
    { id: "rick", name: "릭", cat: "friends", hint: "커비를 태우고 달리는 햄스터" },
    { id: "coo", name: "쿠", cat: "friends", hint: "하늘을 나는 부엉이 친구" },
    { id: "gooey", name: "구이", cat: "friends", hint: "긴 혀를 가진 파란 친구" },

    // 적·보스
    { id: "waddle-dee", name: "와들디", cat: "enemies", hint: "가장 흔한 졸병, 입이 없어요" },
    { id: "waddle-doo", name: "와들두", cat: "enemies", hint: "외눈에서 빔을 쏴요" },
    { id: "gordo", name: "고르도", cat: "enemies", hint: "가시투성이! 무적이에요" },
    { id: "bronto-burt", name: "브론토 버트", cat: "enemies", hint: "날개로 파닥파닥 날아다녀요" },
    { id: "scarfy", name: "스카피", cat: "enemies", hint: "빨아들이려 하면 무섭게 변해요" },
    { id: "kracko", name: "크랙코", cat: "enemies", hint: "외눈 번개 구름" },
    { id: "whispy", name: "위스피 우즈", cat: "enemies", hint: "사과를 떨어뜨리는 나무 보스" },
    { id: "marx", name: "마르크", cat: "enemies", hint: "공 위에 선 장난꾸러기 광대" },
    { id: "dark-matter", name: "다크 매터", cat: "enemies", hint: "어둠에서 온 외눈의 존재" },
    { id: "zero", name: "제로", cat: "enemies", hint: "다크 매터를 이끄는 거대한 눈" },
    { id: "galacta-knight", name: "갤럭타 나이트", cat: "enemies", hint: "은하 최강의 전사, 하얀 날개" },
    { id: "chilly", name: "칠리", cat: "enemies", hint: "빨간 양동이를 쓴 눈사람" },
    { id: "mr-frosty", name: "미스터 프로스티", cat: "enemies", hint: "얼음을 던지는 바다코끼리" },
    { id: "hot-head", name: "핫 헤드", cat: "enemies", hint: "머리에 불꽃이 활활" },
    { id: "sparky", name: "스파키", cat: "enemies", hint: "찌릿찌릿 전기를 뿜는 젤리" },
    { id: "blade-knight", name: "블레이드 나이트", cat: "enemies", hint: "투구를 쓴 꼬마 검사" },
    { id: "knuckle-joe", name: "너클 조", cat: "enemies", hint: "주먹 하나로 싸우는 격투가" },
    { id: "cappy", name: "캐피", cat: "enemies", hint: "버섯 갓을 쓰고 있어요" },
    { id: "broom-hatter", name: "브룸 해터", cat: "enemies", hint: "빗자루로 청소하는 마녀 모자" },
    { id: "rocky", name: "로키", cat: "enemies", hint: "쿵! 떨어지는 바위" },
    { id: "shotzo", name: "쇼초", cat: "enemies", hint: "포탄을 쏘는 대포" },

    // 카피 능력
    { id: "ability-fire", name: "파이어", cat: "ability", hint: "불꽃을 내뿜어요" },
    { id: "ability-ice", name: "아이스", cat: "ability", hint: "차가운 숨결로 꽁꽁" },
    { id: "ability-sword", name: "소드", cat: "ability", hint: "초록 모자와 검" },
    { id: "ability-fighter", name: "파이터", cat: "ability", hint: "격투기의 달인" },
    { id: "ability-hammer", name: "해머", cat: "ability", hint: "커다란 나무 망치" },
    { id: "ability-sleep", name: "슬립", cat: "ability", hint: "쿨쿨... 잠만 자요" },
    { id: "ability-cook", name: "쿡", cat: "ability", hint: "적을 요리해서 회복!" },
    { id: "ability-whip", name: "휩", cat: "ability", hint: "카우보이처럼 채찍을" },
    { id: "ability-ninja", name: "닌자", cat: "ability", hint: "표창과 은신술" },
    { id: "ability-spark", name: "스파크", cat: "ability", hint: "몸에 전기를 둘러요" },
    { id: "ability-bomb", name: "봄", cat: "ability", hint: "폭탄을 던져요" },
    { id: "ability-parasol", name: "파라솔", cat: "ability", hint: "우산으로 막고 공격" },
    { id: "ability-mic", name: "마이크", cat: "ability", hint: "노래로 화면 전체 공격" },
    { id: "ability-needle", name: "니들", cat: "ability", hint: "온몸에서 가시가 쭉!" },
    { id: "ability-stone", name: "스톤", cat: "ability", hint: "단단한 돌로 변신" },
    { id: "ability-yoyo", name: "요요", cat: "ability", hint: "요요를 자유자재로" },
    { id: "ability-water", name: "워터", cat: "ability", hint: "물결을 타고 공격" },
    { id: "ability-beam", name: "빔", cat: "ability", hint: "광선 채찍을 휘둘러요" },
  ];

  const CAT_LABELS = { friends: "친구·주인공", enemies: "적·보스", ability: "카피 능력" };
  const DIFF_MULTIPLIERS = { easy: 1, normal: 1.5, hard: 2 };
  const LEVEL_MODES = ["easy", "normal", "hard"];
  const QUESTIONS_PER_LEVEL = 10;
  const SHARE_URL = "https://myoriginallife.github.io/kirby/";

  const LIVES_MAX = 3;
  const BASE_SCORE = 10;
  const STREAK_BONUS = 5;
  const LEVEL_BONUS_RATE = 0.15;
  const ANSWER_DELAY = 1200;
  const LEVELUP_DELAY = 2200;
  const STORAGE_KEY_SCORE = "kirby-guess-best";
  const STORAGE_KEY_LEVEL = "kirby-guess-best-level";

  const ART = window.KIRBY_ART || {};

  const $ = (sel) => document.querySelector(sel);

  const screens = {
    start: $("#start-screen"),
    game: $("#game-screen"),
    gameover: $("#gameover-screen"),
  };

  const els = {
    startBtn: $("#start-btn"),
    retryBtn: $("#retry-btn"),
    menuBtn: $("#menu-btn"),
    logoArt: $("#logo-art"),
    score: $("#score"),
    level: $("#level"),
    streak: $("#streak"),
    lives: $("#lives"),
    levelFill: $("#level-fill"),
    levelCount: $("#level-count"),
    questionLabel: $("#question-label"),
    categoryTag: $("#category-tag"),
    charArt: $("#char-art"),
    hint: $("#char-hint"),
    choices: $("#choices"),
    feedback: $("#feedback"),
    feedbackText: $("#feedback-text"),
    finalScore: $("#final-score"),
    finalLevel: $("#final-level"),
    finalCorrect: $("#final-correct"),
    finalStreak: $("#final-streak"),
    newRecord: $("#new-record"),
    bestScore: $("#best-score"),
    bestLevel: $("#best-level"),
    levelupOverlay: $("#levelup-overlay"),
    levelupNum: $("#levelup-num"),
    levelupDesc: $("#levelup-desc"),
    shareBtn: $("#share-btn"),
    shareModal: $("#share-modal"),
    sharePreview: $("#share-preview"),
    shareConfirmBtn: $("#share-confirm-btn"),
    shareDownloadBtn: $("#share-download-btn"),
    shareCloseBtn: $("#share-close-btn"),
    shareCanvas: $("#share-canvas"),
  };

  let level = 1;
  let levelCorrect = 0;
  let maxLevel = 1;
  let difficulty = "easy";
  let deck = [];
  let score = 0;
  let streak = 0;
  let maxStreak = 0;
  let correctCount = 0;
  let lives = LIVES_MAX;
  let current = null;
  let lastId = null;
  let answering = false;
  let lastResult = null;
  let shareBlob = null;

  const DIFF_DESC = {
    easy: "힌트 공개",
    normal: "힌트 없음",
    hard: "실루엣 모드",
  };

  function svgToImage(svgStr) {
    const img = new Image();
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgStr);
    return img;
  }
  const kirbyImg = ART.kirby ? svgToImage(ART.kirby) : null;

  function safeGet(key, fallback) {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function safeSet(key, val) {
    try {
      localStorage.setItem(key, String(val));
    } catch {
      /* 저장 불가 환경 무시 */
    }
  }

  function showScreen(name) {
    Object.values(screens).forEach((s) => s.classList.remove("active"));
    screens[name].classList.add("active");
    document.body.classList.toggle("in-game", name === "game");
  }

  function getLevelConfig(lv) {
    const idx = lv - 1;
    const cycle = Math.floor(idx / 12);
    return {
      level: lv,
      difficulty: LEVEL_MODES[idx % LEVEL_MODES.length],
      questionsRequired: QUESTIONS_PER_LEVEL + cycle * 5,
      levelMultiplier: 1 + (lv - 1) * LEVEL_BONUS_RATE,
    };
  }

  // 첫 레벨부터 전체 캐릭터를 섞어서 출제하고, 한 바퀴 다 나오기 전엔 중복 없음
  function drawFromDeck() {
    if (deck.length === 0) {
      deck = shuffle(DATA);
      // 새 덱의 첫 문제가 직전 문제와 같지 않도록
      if (deck.length > 1 && deck[deck.length - 1].id === lastId) {
        [deck[0], deck[deck.length - 1]] = [deck[deck.length - 1], deck[0]];
      }
    }
    return deck.pop();
  }

  function applyLevelConfig() {
    const cfg = getLevelConfig(level);
    difficulty = cfg.difficulty;
    els.level.textContent = level;
    updateLevelProgress();
    applyDifficultyVisuals();
  }

  function updateLevelProgress() {
    const cfg = getLevelConfig(level);
    const pct = Math.min(100, (levelCorrect / cfg.questionsRequired) * 100);
    els.levelFill.style.width = `${pct}%`;
    els.levelCount.textContent = `${levelCorrect} / ${cfg.questionsRequired}`;
  }

  const getBestScore = () => parseInt(safeGet(STORAGE_KEY_SCORE, "0"), 10) || 0;
  const getBestLevel = () => parseInt(safeGet(STORAGE_KEY_LEVEL, "1"), 10) || 1;

  function updateBestDisplay() {
    els.bestScore.textContent = getBestScore();
    els.bestLevel.textContent = getBestLevel();
  }

  function calcPoints(streakCount) {
    const cfg = getLevelConfig(level);
    const base = BASE_SCORE + (streakCount - 1) * STREAK_BONUS;
    return Math.round(base * DIFF_MULTIPLIERS[cfg.difficulty] * cfg.levelMultiplier);
  }

  function pickRandom(arr, count, exclude) {
    const copy = arr.filter((x) => x !== exclude);
    const result = [];
    for (let i = 0; i < count && copy.length > 0; i++) {
      const idx = Math.floor(Math.random() * copy.length);
      result.push(copy.splice(idx, 1)[0]);
    }
    return result;
  }

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  function renderLives() {
    els.lives.innerHTML = "";
    for (let i = 0; i < LIVES_MAX; i++) {
      const star = document.createElement("span");
      star.className = "heart" + (i >= lives ? " lost" : "");
      star.textContent = "⭐";
      els.lives.appendChild(star);
    }
  }

  function applyDifficultyVisuals() {
    els.charArt.classList.toggle("silhouette", difficulty === "hard");
    els.hint.classList.toggle("hidden-num", difficulty !== "easy");
  }

  function clearFeedback() {
    els.feedback.className = "feedback hidden";
    els.feedbackText.textContent = "";
  }

  function showFeedback(type, text) {
    els.feedback.className = `feedback ${type}`;
    els.feedbackText.textContent = text;
  }

  function startRound() {
    clearFeedback();
    answering = false;
    els.choices.innerHTML = "";

    const answer = drawFromDeck();
    lastId = answer.id;
    current = answer;

    // 오답 보기는 같은 종류(능력 ↔ 캐릭터)에서 고른다
    const isAbility = answer.cat === "ability";
    const sameKind = DATA.filter((d) => (d.cat === "ability") === isAbility);
    const wrong = pickRandom(sameKind, 3, answer);
    const options = shuffle([answer, ...wrong]);

    options.forEach((opt) => {
      const btn = document.createElement("button");
      btn.className = "choice-btn";
      btn.textContent = opt.name;
      btn.dataset.id = opt.id;
      btn.addEventListener("click", () => handleAnswer(btn, opt.id));
      els.choices.appendChild(btn);
    });

    els.questionLabel.textContent = isAbility ? "이 커비의 카피 능력은?" : "이 캐릭터의 이름은?";
    els.categoryTag.textContent = CAT_LABELS[answer.cat];
    els.hint.textContent = `💡 ${answer.hint}`;
    els.charArt.innerHTML = ART[answer.id] || "";
    els.charArt.classList.remove("pop");
    void els.charArt.offsetWidth;
    els.charArt.classList.add("pop");
    applyDifficultyVisuals();
  }

  function handleAnswer(btn, chosenId) {
    if (answering) return;
    answering = true;

    const isCorrect = chosenId === current.id;
    const buttons = els.choices.querySelectorAll(".choice-btn");
    buttons.forEach((b) => (b.disabled = true));

    // 정답 공개: 실루엣 해제
    els.charArt.classList.remove("silhouette");

    if (isCorrect) {
      btn.classList.add("correct");
      streak++;
      if (streak > maxStreak) maxStreak = streak;
      const points = calcPoints(streak);
      score += points;
      correctCount++;
      levelCorrect++;

      els.score.textContent = score;
      els.streak.textContent = streak;
      updateLevelProgress();

      const cfg = getLevelConfig(level);
      const bonus =
        streak > 1
          ? ` (${streak}연속 · Lv.${level} ×${cfg.levelMultiplier.toFixed(1)})`
          : ` (Lv.${level})`;
      showFeedback("correct-fb", `정답! +${points}점${bonus}`);

      const leveledUp = levelCorrect >= cfg.questionsRequired;
      setTimeout(() => {
        if (leveledUp) levelUp();
        else startRound();
      }, ANSWER_DELAY);
    } else {
      btn.classList.add("wrong");
      buttons.forEach((b) => {
        if (b.dataset.id === current.id) b.classList.add("correct");
      });

      streak = 0;
      lives--;
      els.streak.textContent = streak;
      renderLives();

      showFeedback("wrong-fb", `틀렸어요! 정답은 ${current.name}`);

      setTimeout(() => {
        if (lives <= 0) {
          clearFeedback();
          endGame();
        } else {
          startRound();
        }
      }, ANSWER_DELAY);
    }
  }

  function levelUp() {
    clearFeedback();
    level++;
    if (level > maxLevel) maxLevel = level;
    levelCorrect = 0;
    applyLevelConfig();

    els.levelupNum.textContent = `Level ${level}`;
    els.levelupDesc.textContent = DIFF_DESC[difficulty];
    els.levelupOverlay.classList.remove("hidden");

    setTimeout(() => {
      els.levelupOverlay.classList.add("hidden");
      startRound();
    }, LEVELUP_DELAY);
  }

  function endGame() {
    const isNewRecord = score > getBestScore();
    const isNewLevel = maxLevel > getBestLevel();

    if (isNewRecord) safeSet(STORAGE_KEY_SCORE, score);
    if (isNewLevel) safeSet(STORAGE_KEY_LEVEL, maxLevel);
    if (isNewRecord || isNewLevel) updateBestDisplay();

    lastResult = {
      score,
      correctCount,
      maxStreak,
      maxLevel,
      isNewRecord: isNewRecord || isNewLevel,
    };

    els.finalScore.textContent = score;
    els.finalLevel.textContent = maxLevel;
    els.finalCorrect.textContent = correctCount;
    els.finalStreak.textContent = maxStreak;
    els.newRecord.textContent = isNewRecord
      ? "🏆 최고 점수 갱신!"
      : isNewLevel
        ? "🏆 최고 레벨 갱신!"
        : "";
    els.newRecord.classList.toggle("hidden", !isNewRecord && !isNewLevel);

    showScreen("gameover");
  }

  /* ============ 결과 이미지 공유 ============ */
  function drawStar(ctx, cx, cy, r, color) {
    ctx.save();
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -Math.PI / 2 + (i * Math.PI) / 5;
      const rr = i % 2 === 0 ? r : r * 0.45;
      ctx.lineTo(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr);
    }
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
    ctx.restore();
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  }

  function generateShareImage(result) {
    const W = 600;
    const H = 860;
    const canvas = els.shareCanvas;
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext("2d");
    const font = "'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif";

    const bg = ctx.createLinearGradient(0, 0, W, H);
    bg.addColorStop(0, "#241a4a");
    bg.addColorStop(0.5, "#3a2466");
    bg.addColorStop(1, "#5b2a74");
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    // 반짝이는 별 배경 (고정 패턴)
    for (let i = 0; i < 40; i++) {
      const x = (i * 137) % W;
      const y = (i * 251) % H;
      drawStar(ctx, x, y, 2 + (i % 4), "rgba(255, 233, 150, 0.35)");
    }

    if (kirbyImg && kirbyImg.complete && kirbyImg.naturalWidth) {
      ctx.drawImage(kirbyImg, W / 2 - 70, 30, 140, 140);
    } else {
      drawStar(ctx, W / 2, 100, 60, "#ffd93d");
    }

    ctx.textAlign = "center";
    ctx.fillStyle = "#ffd93d";
    ctx.font = `bold 36px ${font}`;
    ctx.fillText("별의 커비 캐릭터 맞히기", W / 2, 215);

    ctx.fillStyle = "#ff7eb6";
    ctx.font = `bold 28px ${font}`;
    ctx.fillText("게임 종료!", W / 2, 258);

    if (result.isNewRecord) {
      ctx.fillStyle = "#ffd93d";
      ctx.font = `bold 22px ${font}`;
      ctx.fillText("🏆 신기록 달성!", W / 2, 294);
    }

    const stats = [
      { label: "최종 점수", value: String(result.score) },
      { label: "도달 레벨", value: String(result.maxLevel) },
      { label: "맞힌 문제", value: String(result.correctCount) },
      { label: "최대 연속", value: String(result.maxStreak) },
    ];

    const cardX = 60;
    const cardW = W - 120;
    let cardY = result.isNewRecord ? 316 : 290;

    stats.forEach((stat) => {
      roundRect(ctx, cardX, cardY, cardW, 70, 14);
      ctx.fillStyle = "rgba(36, 26, 74, 0.9)";
      ctx.fill();
      ctx.strokeStyle = "rgba(255, 126, 182, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.textAlign = "left";
      ctx.fillStyle = "#c4b8e0";
      ctx.font = `20px ${font}`;
      ctx.fillText(stat.label, cardX + 24, cardY + 44);

      ctx.textAlign = "right";
      ctx.fillStyle = "#ffd93d";
      ctx.font = `bold 32px ${font}`;
      ctx.fillText(stat.value, cardX + cardW - 24, cardY + 46);

      cardY += 86;
    });

    ctx.textAlign = "center";
    ctx.fillStyle = "#c4b8e0";
    ctx.font = `18px ${font}`;
    ctx.fillText(SHARE_URL.replace("https://", ""), W / 2, cardY + 30);

    return canvas;
  }

  function canvasToBlob(canvas) {
    return new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
  }

  function openShareModal() {
    if (!lastResult) return;
    const canvas = generateShareImage(lastResult);
    els.sharePreview.src = canvas.toDataURL("image/png");
    canvasToBlob(canvas).then((blob) => {
      shareBlob = blob;
    });
    els.shareModal.classList.remove("hidden");
  }

  function closeShareModal() {
    els.shareModal.classList.add("hidden");
    shareBlob = null;
  }

  async function shareImage() {
    if (!shareBlob) return;

    const file = new File([shareBlob], "kirby-result.png", { type: "image/png" });
    const shareData = {
      title: "별의 커비 캐릭터 맞히기",
      text: `점수 ${lastResult.score}점! 나도 도전해보세요 👉 ${SHARE_URL}`,
      files: [file],
    };

    if (navigator.share && navigator.canShare?.(shareData)) {
      try {
        await navigator.share(shareData);
        closeShareModal();
        return;
      } catch (err) {
        if (err.name === "AbortError") return;
      }
    }

    downloadImage();
  }

  function downloadImage() {
    if (!shareBlob) return;
    const url = URL.createObjectURL(shareBlob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kirby-result-${lastResult.score}점.png`;
    a.click();
    URL.revokeObjectURL(url);
    closeShareModal();
  }

  function resetGameState() {
    score = 0;
    streak = 0;
    maxStreak = 0;
    correctCount = 0;
    lives = LIVES_MAX;
    level = 1;
    levelCorrect = 0;
    maxLevel = 1;
    lastId = null;
    deck = [];
    answering = false;

    els.score.textContent = "0";
    els.streak.textContent = "0";
    renderLives();
    applyLevelConfig();
  }

  function startGame() {
    resetGameState();
    showScreen("game");
    startRound();
  }

  els.startBtn.addEventListener("click", startGame);
  els.retryBtn.addEventListener("click", startGame);
  els.menuBtn.addEventListener("click", () => showScreen("start"));
  els.shareBtn.addEventListener("click", openShareModal);
  els.shareConfirmBtn.addEventListener("click", shareImage);
  els.shareDownloadBtn.addEventListener("click", downloadImage);
  els.shareCloseBtn.addEventListener("click", closeShareModal);
  els.shareModal.querySelector(".share-modal-backdrop").addEventListener("click", closeShareModal);

  if (ART.kirby) els.logoArt.innerHTML = ART.kirby;
  updateBestDisplay();
})();
