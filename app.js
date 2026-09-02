(() => {
  const state = {
    seconds: 30 * 60,
    paused: false,
    escaped: false,
    hasKey: false,
    solved: new Set(),
    clues: [null, null, null, null],
    current: null,
    hintCount: 3,
    soundOn: true
  };

  const ORDER = ["computer", "locker", "trash", "books", "teacher"];

  const problems = {
    computer: {
      title: "정오각형의 한 변",
      kicker: "🖥️ 컴퓨터 · 문제 1",
      answer: "7",
      reward: "key",
      html: `
        <p class="problem-copy">
          정오각형의 둘레가 <strong>35 cm</strong>일 때,
          정오각형 한 변의 길이는 몇 cm입니까?
        </p>
        <div class="diagram-card">
          <svg viewBox="0 0 420 300" aria-label="정오각형 그림">
            <polygon points="210,35 345,132 295,265 125,265 75,132"
              fill="#dfe7ed" stroke="#283942" stroke-width="5"/>
            <line x1="145" y1="78" x2="160" y2="99" stroke="#283942" stroke-width="4"/>
            <line x1="275" y1="78" x2="260" y2="99" stroke="#283942" stroke-width="4"/>
            <line x1="328" y1="185" x2="305" y2="177" stroke="#283942" stroke-width="4"/>
            <line x1="210" y1="255" x2="210" y2="275" stroke="#283942" stroke-width="4"/>
            <line x1="92" y1="185" x2="115" y2="177" stroke="#283942" stroke-width="4"/>
            <text x="182" y="292" font-size="20" fill="#24323a">(단위: cm)</text>
          </svg>
        </div>`
    },
    locker: {
      title: "평행사변형의 넓이",
      kicker: "🗄️ 사물함 · 문제 2",
      answer: "108",
      rewardIndex: 0,
      reward: "7",
      html: `
        <p class="problem-copy">다음 평행사변형의 넓이는 몇 cm²입니까?</p>
        <div class="diagram-card">
          <svg viewBox="0 0 460 300" aria-label="밑변 12센티미터 높이 9센티미터인 평행사변형">
            <polygon points="145,48 345,48 405,235 205,235"
              fill="#dfe3e4" stroke="#283942" stroke-width="5"/>
            <line x1="145" y1="48" x2="145" y2="235" stroke="#68777d" stroke-width="4" stroke-dasharray="8 7"/>
            <line x1="145" y1="235" x2="205" y2="235" stroke="#68777d" stroke-width="4" stroke-dasharray="8 7"/>
            <path d="M145 213 h22 v22" fill="none" stroke="#283942" stroke-width="4"/>
            <text x="72" y="150" font-size="25" fill="#24323a">9 cm</text>
            <text x="263" y="274" font-size="25" fill="#24323a">12 cm</text>
          </svg>
        </div>`
    },
    trash: {
      title: "삼각형의 넓이",
      kicker: "🗑️ 쓰레기통 · 문제 3",
      answer: "35",
      rewardIndex: 1,
      reward: "2",
      html: `
        <p class="problem-copy">다음 삼각형의 넓이는 몇 cm²입니까?</p>
        <div class="diagram-card">
          <svg viewBox="0 0 460 300" aria-label="밑변 14센티미터 높이 5센티미터인 삼각형">
            <polygon points="55,235 190,45 415,235"
              fill="#dfe3e4" stroke="#283942" stroke-width="5"/>
            <line x1="190" y1="45" x2="190" y2="235" stroke="#68777d" stroke-width="4" stroke-dasharray="8 7"/>
            <path d="M190 213 h22 v22" fill="none" stroke="#283942" stroke-width="4"/>
            <text x="205" y="145" font-size="25" fill="#24323a">5 cm</text>
            <text x="205" y="275" font-size="25" fill="#24323a">14 cm</text>
          </svg>
        </div>`
    },
    books: {
      title: "마름모의 넓이",
      kicker: "📚 책장 · 문제 4",
      answer: "25",
      rewardIndex: 2,
      reward: "9",
      html: `
        <p class="problem-copy">
          두 대각선의 길이가 각각 <strong>5 cm</strong>, <strong>10 cm</strong>인
          마름모의 넓이는 몇 cm²입니까?
        </p>
        <div class="diagram-card">
          <svg viewBox="0 0 460 300" aria-label="대각선 길이 5센티미터와 10센티미터인 마름모">
            <polygon points="230,35 420,150 230,265 40,150"
              fill="#e4e0e5" stroke="#283942" stroke-width="5"/>
            <line x1="230" y1="35" x2="230" y2="265" stroke="#68777d" stroke-width="4" stroke-dasharray="8 7"/>
            <line x1="40" y1="150" x2="420" y2="150" stroke="#68777d" stroke-width="4" stroke-dasharray="8 7"/>
            <path d="M230 150 h23 v23" fill="none" stroke="#283942" stroke-width="4"/>
            <text x="245" y="90" font-size="24" fill="#24323a">5 cm</text>
            <text x="290" y="180" font-size="24" fill="#24323a">10 cm</text>
          </svg>
        </div>`
    },
    teacher: {
      title: "사다리꼴의 넓이",
      kicker: "🧑‍🏫 선생님 책상 · 문제 5",
      answer: "39",
      rewardIndex: 3,
      reward: "4",
      html: `
        <p class="problem-copy">다음 사다리꼴의 넓이는 몇 cm²입니까?</p>
        <div class="diagram-card">
          <svg viewBox="0 0 460 310" aria-label="윗변 5센티미터 아랫변 8센티미터 높이 6센티미터인 사다리꼴">
            <polygon points="150,55 310,55 385,240 75,240"
              fill="#dfe3e4" stroke="#283942" stroke-width="5"/>
            <line x1="150" y1="55" x2="150" y2="240" stroke="#68777d" stroke-width="4" stroke-dasharray="8 7"/>
            <path d="M150 218 h22 v22" fill="none" stroke="#283942" stroke-width="4"/>
            <text x="205" y="40" font-size="25" fill="#24323a">5 cm</text>
            <text x="207" y="280" font-size="25" fill="#24323a">8 cm</text>
            <text x="165" y="155" font-size="25" fill="#24323a">6 cm</text>
          </svg>
        </div>`
    }
  };

  const timer = document.getElementById("timer");
  const modalBackdrop = document.getElementById("modalBackdrop");
  const modalTitle = document.getElementById("modalTitle");
  const modalKicker = document.getElementById("modalKicker");
  const modalBody = document.getElementById("modalBody");
  const answerForm = document.getElementById("answerForm");
  const answerInput = document.getElementById("answerInput");
  const feedback = document.getElementById("feedback");
  const pauseCover = document.getElementById("pauseCover");

  function formatTime(sec) {
    const m = Math.floor(Math.max(0, sec) / 60);
    const s = Math.max(0, sec) % 60;
    return `${String(m).padStart(2,"0")}:${String(s).padStart(2,"0")}`;
  }

  function renderTimer() {
    timer.textContent = formatTime(state.seconds);
  }

  function renderInventory() {
    const slot = document.getElementById("keySlot");
    slot.textContent = state.hasKey ? "🔑" : "🔒";
    slot.classList.toggle("filled", state.hasKey);
  }

  function renderClues() {
    state.clues.forEach((value, i) => {
      document.getElementById(`clue${i+1}`).textContent = value ?? "_";
    });
  }

  function unlockedIndex() {
    for (let i = 0; i < ORDER.length; i++) {
      if (!state.solved.has(ORDER[i])) return i;
    }
    return ORDER.length;
  }

  function isUnlocked(place) {
    const idx = ORDER.indexOf(place);
    if (idx === -1) return false;
    if (idx === 0) return true;
    return state.solved.has(ORDER[idx - 1]);
  }

  function renderLocks() {
    document.querySelectorAll(".hotspot").forEach(btn => {
      const place = btn.dataset.place;

      if (place === "door") {
        const unlocked = state.solved.has("teacher");
        btn.classList.toggle("locked", !unlocked);
        btn.innerHTML = unlocked
          ? `<span>교실 문<br><b>클릭!</b> 🔍</span>`
          : `<span>교실 문<br><b>잠김</b> 🔒</span>`;
        return;
      }

      const locked = !isUnlocked(place);
      btn.classList.toggle("locked", locked);

      const names = {
        computer: "컴퓨터",
        locker: "사물함",
        trash: "쓰레기통",
        books: "책장",
        teacher: "선생님 책상"
      };

      btn.innerHTML = locked
        ? `<span>${names[place]}<br><b>잠김</b> 🔒</span>`
        : `<span>${names[place]}<br><b>클릭!</b> 🔍</span>`;
    });
  }

  function openModal({ kicker, title, html, needsAnswer = true }) {
    modalKicker.textContent = kicker || "";
    modalTitle.textContent = title;
    modalBody.innerHTML = html;
    feedback.textContent = "";
    feedback.className = "feedback";
    answerInput.value = "";
    answerForm.classList.toggle("hidden", !needsAnswer);
    modalBackdrop.classList.remove("hidden");
    if (needsAnswer) setTimeout(() => answerInput.focus(), 50);
  }

  function closeModal() {
    modalBackdrop.classList.add("hidden");
    state.current = null;
  }

  function openPlace(place) {
    if (place === "door") {
      openDoor();
      return;
    }

    const p = problems[place];
    if (!p) return;

    if (!isUnlocked(place)) {
      const idx = ORDER.indexOf(place);
      openModal({
        kicker: "🔒 잠긴 문제",
        title: "아직 열리지 않았어요!",
        html: `<p class="problem-copy">
          이전 문제를 먼저 해결해야 이 문제를 열 수 있습니다.<br>
          <strong>문제 ${idx}</strong>을(를) 먼저 풀어 보세요.
        </p>`,
        needsAnswer: false
      });
      return;
    }

    state.current = place;
    openModal({
      kicker: p.kicker,
      title: p.title,
      html: p.html,
      needsAnswer: true
    });

    if (state.solved.has(place)) {
      feedback.textContent = "이미 해결한 문제입니다.";
      feedback.classList.add("good");
    }
  }

  function openDoor() {
    state.current = "door";

    if (!state.solved.has("teacher")) {
      openModal({
        kicker: "🚪 교실 문",
        title: "문이 잠겨 있어요!",
        html: `<p class="problem-copy">
          🔒 아직 마지막 문제를 해결하지 않았습니다.<br>
          <strong>문제 5</strong>를 먼저 해결하세요.
        </p>`,
        needsAnswer: false
      });
      return;
    }

    openModal({
      kicker: "🚪 교실 문 · 최종 단계",
      title: "전자 도어락",
      html: `
        <p class="problem-copy">단서 수첩에 적힌 숫자를 <strong>첫 번째부터 네 번째까지 순서대로</strong> 입력하세요.</p>
        <div style="display:flex; gap:10px; justify-content:center; margin:20px 0;">
          ${state.clues.map(() => `<div style="width:58px;height:64px;border:2px solid #c6b999;border-radius:10px;display:grid;place-items:center;font-size:30px;font-weight:900;background:#f6f0df;">?</div>`).join("")}
        </div>`,
      needsAnswer: true
    });
    answerInput.placeholder = "네 자리 비밀번호";
  }

  function rewardFor(place) {
    const p = problems[place];

    if (p.reward === "key") {
      state.hasKey = true;
      renderInventory();
      return "정답! 🔑 작은 열쇠를 획득했습니다!<br>문제 2가 열렸어요.";
    }

    state.clues[p.rewardIndex] = p.reward;
    renderClues();

    const idx = ORDER.indexOf(place);
    const nextText = idx < ORDER.length - 1
      ? `<br>문제 ${idx + 2}가 열렸어요.`
      : `<br>모든 문제가 해결되었습니다! 교실 문을 확인하세요.`;

    return `정답! 📜 ${p.rewardIndex + 1}번째 숫자 단서 <strong>${p.reward}</strong>을(를) 획득했습니다!${nextText}`;
  }

  answerForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = answerInput.value.trim();

    if (!value) {
      feedback.textContent = "정답을 입력해 주세요.";
      feedback.className = "feedback bad";
      return;
    }

    if (state.current === "door") {
      if (value === "7294") {
        state.escaped = true;
        closeModal();
        document.getElementById("endingTime").textContent = formatTime(state.seconds);
        document.getElementById("ending").classList.remove("hidden");
      } else {
        feedback.textContent = "삐빅! 비밀번호가 맞지 않습니다.";
        feedback.className = "feedback bad";
      }
      return;
    }

    const p = problems[state.current];
    if (!p) return;

    if (value === p.answer) {
      if (!state.solved.has(state.current)) {
        state.solved.add(state.current);
        feedback.innerHTML = rewardFor(state.current);
        renderLocks();
      } else {
        feedback.textContent = "정답입니다! 이미 이 문제의 보상은 받았어요.";
      }
      feedback.className = "feedback good";
    } else {
      feedback.textContent = "아쉽다! 다시 계산해 보세요.";
      feedback.className = "feedback bad";
    }
  });

  document.querySelectorAll(".hotspot").forEach(btn => {
    btn.addEventListener("click", () => openPlace(btn.dataset.place));
  });

  document.getElementById("modalClose").addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  document.getElementById("closeGuide").addEventListener("click", () => {
    document.getElementById("guideCard").classList.add("hidden");
  });

  function showHint() {
    if (state.hintCount <= 0) {
      openModal({
        kicker: "💡 힌트",
        title: "힌트를 모두 사용했어요!",
        html: `<p class="problem-copy">남은 문제를 천천히 살펴보세요. 넓이 공식을 떠올리면 해결할 수 있습니다.</p>`,
        needsAnswer: false
      });
      return;
    }

    state.hintCount--;
    document.getElementById("hintCount").textContent = state.hintCount;

    const idx = unlockedIndex();
    let text = "컴퓨터를 클릭해 문제 1부터 시작하세요.";

    if (idx < ORDER.length) {
      const labels = ["컴퓨터", "사물함", "쓰레기통", "책장", "선생님 책상"];
      text = `현재 풀 수 있는 문제는 <strong>문제 ${idx + 1}</strong>입니다. <strong>${labels[idx]}</strong>을(를) 확인해 보세요.`;
    } else {
      text = "모든 문제를 풀었어요. 교실 문을 클릭하고 단서 숫자를 순서대로 입력하세요.";
    }

    openModal({
      kicker: "💡 힌트",
      title: "도움말",
      html: `<p class="problem-copy">${text}</p>`,
      needsAnswer: false
    });
  }

  document.getElementById("hintBtn").addEventListener("click", showHint);
  document.getElementById("sideHint").addEventListener("click", showHint);

  document.getElementById("callBtn").addEventListener("click", () => {
    openModal({
      kicker: "☎ 직원 호출",
      title: "선생님 도움",
      html: `<p class="problem-copy">문제가 너무 어렵다면 선생님께 직접 질문하세요.<br><strong>단, 정답 대신 공식이나 풀이 방향만 도움받기!</strong></p>`,
      needsAnswer: false
    });
  });

  function togglePause() {
    state.paused = !state.paused;
    pauseCover.classList.toggle("hidden", !state.paused);
  }

  document.getElementById("pauseBtn").addEventListener("click", togglePause);
  document.getElementById("resumeBtn").addEventListener("click", togglePause);

  document.getElementById("soundBtn").addEventListener("click", (e) => {
    state.soundOn = !state.soundOn;
    e.currentTarget.innerHTML = `${state.soundOn ? "🔊" : "🔇"} <span>BGM</span>`;
  });

  document.getElementById("homeBtn").addEventListener("click", () => {
    document.getElementById("guideCard").classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  document.getElementById("restartBtn").addEventListener("click", () => location.reload());

  setInterval(() => {
    if (state.paused || state.escaped) return;
    if (state.seconds > 0) {
      state.seconds--;
      renderTimer();
      if (state.seconds === 0) {
        openModal({
          kicker: "⏰ 시간 종료",
          title: "점심시간이 끝나기 전에 탈출하지 못했어요!",
          html: `<p class="problem-copy">다시 도전해서 더 빠르게 탈출해 보세요!</p>`,
          needsAnswer: false
        });
      }
    }
  }, 1000);

  renderTimer();
  renderInventory();
  renderClues();
  renderLocks();
})();
