/* 별의 커비 캐릭터 일러스트 (직접 그린 SVG, viewBox 200x200) */
(() => {
  "use strict";

  const O = "#2e1a33";
  const S = `stroke="${O}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
  const svg = (inner) =>
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${inner}</svg>`;
  const mirror = (s) => `${s}<g transform="translate(200 0) scale(-1 1)">${s}</g>`;

  function eyes(x1 = 88, x2 = 112, y = 96, rx = 6.5, ry = 15) {
    return [x1, x2]
      .map(
        (x) =>
          `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#1b1030"/>` +
          `<ellipse cx="${x}" cy="${y + ry * 0.42}" rx="${rx * 0.68}" ry="${ry * 0.34}" fill="#3d6fe0"/>` +
          `<ellipse cx="${x}" cy="${y - ry * 0.42}" rx="${rx * 0.58}" ry="${ry * 0.36}" fill="#fff"/>`
      )
      .join("");
  }

  function dotEyes(x1, x2, y, rx = 6, ry = 12) {
    return [x1, x2]
      .map(
        (x) =>
          `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="#1b1030"/>` +
          `<ellipse cx="${x}" cy="${y - ry * 0.45}" rx="${rx * 0.5}" ry="${ry * 0.32}" fill="#fff"/>`
      )
      .join("");
  }

  function roundEyes(x1, x2, y, r = 14, pr = 7, dy = 2) {
    return [x1, x2]
      .map(
        (x) =>
          `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" ${S}/>` +
          `<circle cx="${x}" cy="${y + dy}" r="${pr}" fill="#1b1030"/>` +
          `<circle cx="${x - pr * 0.35}" cy="${y + dy - pr * 0.4}" r="${pr * 0.3}" fill="#fff"/>`
      )
      .join("");
  }

  const blush = (x1, x2, y, c = "#ff7fae") =>
    `<ellipse cx="${x1}" cy="${y}" rx="9" ry="5" fill="${c}" opacity="0.85"/>` +
    `<ellipse cx="${x2}" cy="${y}" rx="9" ry="5" fill="${c}" opacity="0.85"/>`;

  const smile = (y = 130) =>
    `<path d="M94 ${y} Q100 ${y + 7} 106 ${y}" fill="none" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`;

  function spikes(n, cx, cy, r1, r2, half, fill, offset = 0) {
    const h = (half * Math.PI) / 180;
    const p = (a, r) => `${(cx + Math.cos(a) * r).toFixed(1)} ${(cy + Math.sin(a) * r).toFixed(1)}`;
    let out = "";
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + offset;
      out += `<path d="M${p(a - h, r1)} L${p(a, r2)} L${p(a + h, r1)}Z" fill="${fill}" ${S}/>`;
    }
    return out;
  }

  // 여러 원을 겹쳐 외곽선이 하나로 이어진 구름/덤불 모양
  function blob(circles, fill) {
    return (
      circles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r + 3}" fill="${O}"/>`).join("") +
      circles.map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}"/>`).join("")
    );
  }

  function bolt(x, y, s = 1, rot = 0) {
    return `<path transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" d="M0 -16 L8 -2 L2 -2 L6 14 L-8 -4 L-2 -4Z" fill="#ffe23d" ${S}/>`;
  }

  /* ============ 커비 기본형 ============ */
  function kirbyParts({ body = "#f8b4cf", feet = "#e0335e", face = null } = {}) {
    return `
      <ellipse cx="68" cy="170" rx="30" ry="15" fill="${feet}" ${S} transform="rotate(-12 68 170)"/>
      <ellipse cx="132" cy="170" rx="30" ry="15" fill="${feet}" ${S} transform="rotate(12 132 170)"/>
      <ellipse cx="42" cy="122" rx="17" ry="13" fill="${body}" ${S} transform="rotate(-30 42 122)"/>
      <ellipse cx="158" cy="122" rx="17" ry="13" fill="${body}" ${S} transform="rotate(30 158 122)"/>
      <circle cx="100" cy="112" r="58" fill="${body}" ${S}/>
      ${face ?? eyes() + blush(70, 130, 122) + smile()}`;
  }

  function kirby({ back = "", hat = "", front = "", ...rest } = {}) {
    return svg(`${back}${kirbyParts(rest)}${hat}${front}`);
  }

  const headband = (color) =>
    `<path d="M46 90 Q100 64 154 90 L152 102 Q100 78 48 102Z" fill="${color}" ${S}/>` +
    `<path d="M150 90 Q176 80 190 64 Q184 86 172 94 Q188 96 194 110 Q172 108 152 100Z" fill="${color}" ${S}/>`;

  /* ============ 카피 능력 ============ */
  const ABILITIES = {
    fire: kirby({
      hat: `
        <path d="M58 80 Q48 52 66 34 Q68 56 80 58 Q76 28 100 10 Q102 40 116 50 Q120 30 136 32 Q152 54 142 80 Q100 64 58 80Z" fill="#ff7a1a" ${S}/>
        <path d="M76 72 Q74 56 84 48 Q88 62 96 62 Q96 42 106 32 Q108 54 120 60 Q126 50 130 52 Q134 64 126 74 Q100 66 76 72Z" fill="#ffd23d"/>
        <path d="M54 86 Q100 64 146 86 L142 96 Q100 76 58 96Z" fill="#ffc933" ${S}/>
        <circle cx="100" cy="76" r="7" fill="#e8283e" ${S}/>`,
    }),
    ice: kirby({
      hat: `
        <path d="M100 18 L114 48 L100 76 L86 48Z" fill="#c8f0ff" ${S}/>
        <path d="M70 44 L80 64 L70 80 L62 64Z" fill="#c8f0ff" ${S}/>
        <path d="M130 44 L138 64 L130 80 L120 64Z" fill="#c8f0ff" ${S}/>
        <path d="M54 88 Q100 64 146 88 L142 98 Q100 78 58 98Z" fill="#6fc6f5" ${S}/>`,
      front: `
        <g stroke="#9fe0ff" stroke-width="3" stroke-linecap="round">
          <path d="M22 40 V60 M12 50 H32 M15 43 L29 57 M29 43 L15 57"/>
          <path d="M178 150 V168 M169 159 H187 M172 153 L184 165 M184 153 L172 165"/>
        </g>`,
    }),
    sword: kirby({
      hat: `<path d="M50 86 Q50 38 100 36 Q142 38 152 68 Q170 92 186 134 Q162 106 146 90 Q100 70 50 86Z" fill="#3fae3f" ${S}/>`,
      front: `
        <g transform="rotate(24 162 122)">
          <rect x="155" y="44" width="14" height="70" rx="3" fill="#e6ecf5" ${S}/>
          <rect x="144" y="112" width="36" height="9" rx="3" fill="#ffcc33" ${S}/>
          <rect x="157" y="121" width="10" height="18" rx="3" fill="#7a4a2a" ${S}/>
        </g>`,
    }),
    fighter: kirby({ hat: headband("#e8283e") }),
    hammer: kirby({
      back: `
        <g transform="rotate(14 164 120)">
          <rect x="159" y="44" width="10" height="84" rx="4" fill="#9b6433" ${S}/>
          <rect x="132" y="14" width="64" height="40" rx="8" fill="#c9884a" ${S}/>
          <path d="M146 14 V54 M182 14 V54" stroke="#8a5a2b" stroke-width="4"/>
        </g>`,
      hat: headband("#f3efe4"),
    }),
    sleep: kirby({
      face: `
        <path d="M80 98 Q88 106 96 98 M104 98 Q112 106 120 98" fill="none" stroke="${O}" stroke-width="3.5" stroke-linecap="round"/>
        ${blush(70, 130, 118)}
        <ellipse cx="100" cy="130" rx="5" ry="4" fill="#6b1030"/>
        <circle cx="122" cy="128" r="11" fill="#cfefff" opacity="0.85" ${S}/>`,
      hat: `
        <path d="M50 88 Q48 40 100 36 Q140 36 160 60 Q176 80 178 108 Q160 80 148 86 Q100 70 50 88Z" fill="#5a7ae6" ${S}/>
        <path d="M50 88 Q100 68 150 88 L148 98 Q100 80 52 98Z" fill="#fff" ${S}/>
        <circle cx="178" cy="112" r="12" fill="#fff" ${S}/>
        <path d="M100 48 l4 8 9 1 -7 6 2 9 -8 -5 -8 5 2 -9 -7 -6 9 -1z" fill="#ffd93d"/>`,
      front: `<text x="146" y="40" font-size="26" font-weight="800" fill="#bfd4ff" font-family="sans-serif">Z</text><text x="168" y="22" font-size="18" font-weight="800" fill="#bfd4ff" font-family="sans-serif">z</text>`,
    }),
    cook: kirby({
      hat: `
        ${blob([[74, 34, 18], [100, 24, 22], [126, 34, 18]], "#fff")}
        <rect x="66" y="34" width="68" height="46" fill="#fff" ${S}/>
        <path d="M60 84 Q100 68 140 84 L138 72 Q100 60 62 72Z" fill="#f0f0f0" ${S}/>`,
      front: `
        <rect x="160" y="120" width="30" height="8" rx="4" fill="#7a4a2a" ${S} transform="rotate(-30 160 124)"/>
        <ellipse cx="150" cy="140" rx="24" ry="12" fill="#4a4a5a" ${S} transform="rotate(-30 150 140)"/>`,
    }),
    whip: kirby({
      hat: `
        <ellipse cx="100" cy="74" rx="68" ry="14" fill="#9b5a2b" ${S}/>
        <path d="M66 74 Q62 28 84 32 Q100 42 116 32 Q138 28 134 74Z" fill="#9b5a2b" ${S}/>
        <path d="M66 62 Q100 70 134 62 L134 72 Q100 80 66 72Z" fill="#5a2f14"/>`,
      front: `<path d="M166 124 Q196 110 186 150 Q176 186 150 176 Q128 168 142 150" fill="none" stroke="#7a4a2a" stroke-width="5" stroke-linecap="round"/>`,
    }),
    ninja: kirby({
      hat: `
        <path d="M42 112 Q40 48 100 48 Q160 48 158 112 Q150 84 100 80 Q50 84 42 112Z" fill="#3a3f66" ${S}/>
        <path d="M48 124 Q100 110 152 124 Q148 164 100 170 Q52 164 48 124Z" fill="#3a3f66" ${S}/>
        <path d="M44 78 Q100 56 156 78 L154 88 Q100 66 46 88Z" fill="#c0c6d8" ${S}/>`,
      front: `<path transform="translate(174 150)" d="M0 -16 L4 -4 L16 0 L4 4 L0 16 L-4 4 L-16 0 L-4 -4Z" fill="#b8bfcc" ${S}/>`,
    }),
    spark: kirby({
      hat: `
        <path d="M50 88 Q100 64 150 88 L148 100 Q100 78 52 100Z" fill="#ffc933" ${S}/>
        <circle cx="100" cy="72" r="11" fill="#44c3ff" ${S}/>`,
      front: bolt(28, 60, 1.3, -20) + bolt(172, 58, 1.3, 20) + bolt(20, 150, 1, -40) + bolt(184, 150, 1, 30) + bolt(100, 26, 1.1, 0),
    }),
    bomb: kirby({
      hat: `
        <path d="M50 88 Q50 42 100 40 Q150 42 150 88 Q100 72 50 88Z" fill="#2a2a3a" ${S}/>
        <path d="M100 40 Q104 26 116 22" fill="none" stroke="#c9a060" stroke-width="4"/>
        <path transform="translate(118 20)" d="M0 -9 L3 -3 L9 0 L3 3 L0 9 L-3 3 L-9 0 L-3 -3Z" fill="#ffb020"/>`,
      front: `
        <circle cx="168" cy="112" r="20" fill="#1f1f2c" ${S}/>
        <circle cx="161" cy="105" r="5" fill="#fff" opacity="0.7"/>
        <path d="M176 94 Q180 84 190 82" fill="none" stroke="#c9a060" stroke-width="4"/>
        <path transform="translate(190 80)" d="M0 -8 L3 -3 L8 0 L3 3 L0 8 L-3 3 L-8 0 L-3 -3Z" fill="#ffb020"/>`,
    }),
    parasol: kirby({
      back: `<line x1="100" y1="16" x2="160" y2="124" stroke="#7a4a2a" stroke-width="5"/>`,
      front: `
        <path d="M24 58 Q28 10 100 6 Q172 10 176 58 Z" fill="#e8283e" ${S}/>
        <path d="M100 6 L62 58 H81Z M100 6 L119 58 H138Z" fill="#fff"/>
        <path d="M24 58 Q42 50 62 58 Q81 50 100 58 Q119 50 138 58 Q157 50 176 58" fill="none" ${S}/>
        <circle cx="100" cy="6" r="4" fill="#ffc933" ${S}/>`,
    }),
    mic: kirby({
      front: `
        <rect x="160" y="96" width="12" height="42" rx="5" fill="#4a4a5a" ${S} transform="rotate(-20 166 120)"/>
        <circle cx="160" cy="92" r="15" fill="#c8ccd6" ${S}/>
        <path d="M151 86 H169 M150 93 H170 M152 100 H168" stroke="#8a8f9c" stroke-width="2"/>
        <text x="16" y="56" font-size="34" fill="#ffd93d" font-family="sans-serif">♪</text>
        <text x="150" y="46" font-size="30" fill="#7fc8ff" font-family="sans-serif">♫</text>`,
    }),
    needle: kirby({
      back: spikes(14, 100, 112, 50, 94, 9, "#ffd23d", 0.2),
    }),
    stone: kirby({
      body: "#9aa0ab",
      feet: "#6b7078",
      face: `
        ${eyes(88, 112, 98, 6, 12)}
        <path d="M76 82 L96 88 M124 82 L104 88" stroke="${O}" stroke-width="4" stroke-linecap="round"/>
        <path d="M94 132 H106" stroke="${O}" stroke-width="3" stroke-linecap="round"/>
        <path d="M58 90 L70 100 L64 112 M140 140 L128 148 L132 160 M112 62 L118 72" fill="none" stroke="#6b7078" stroke-width="3"/>`,
      front: `<path d="M20 180 L30 166 L44 170 L48 184Z M160 186 L166 174 L180 176 L182 188Z" fill="#8a909b" ${S}/>`,
    }),
    yoyo: kirby({
      hat: `
        <path d="M50 86 Q52 44 100 42 Q148 44 150 86 Q100 70 50 86Z" fill="#e8283e" ${S}/>
        <path d="M54 80 Q30 74 18 90 Q40 96 58 90Z" fill="#e8283e" ${S}/>
        <circle cx="100" cy="42" r="5" fill="#fff" ${S}/>`,
      front: `
        <line x1="160" y1="124" x2="176" y2="170" stroke="#fff" stroke-width="2"/>
        <circle cx="176" cy="176" r="14" fill="#3d6fe0" ${S}/>
        <circle cx="176" cy="176" r="5" fill="#fff"/>`,
    }),
    water: kirby({
      hat: `
        <path d="M56 86 Q44 60 58 44 Q66 58 76 60 Q66 34 86 16 Q86 44 100 50 Q104 30 124 20 Q116 46 128 60 Q134 44 150 44 Q158 64 144 86 Q100 68 56 86Z" fill="#4fb8ff" ${S}/>
        <path d="M76 76 Q72 60 82 54 Q88 64 100 62 Q110 48 122 46 Q118 60 128 72 Q100 66 76 76Z" fill="#b8e6ff"/>`,
      front: `
        <path d="M22 72 Q30 58 30 72 A8 8 0 1 1 22 72Z" fill="#4fb8ff" ${S}/>
        <path d="M176 64 Q184 50 184 64 A8 8 0 1 1 176 64Z" fill="#4fb8ff" ${S}/>
        <path d="M6 190 Q30 176 54 190 T100 190 T146 190 T194 190" fill="none" stroke="#4fb8ff" stroke-width="6" stroke-linecap="round"/>`,
    }),
    beam: kirby({
      hat: `
        <path d="M58 90 Q40 44 22 30 Q66 30 100 66Z" fill="#8a3fd0" ${S}/>
        <path d="M142 90 Q160 44 178 30 Q134 30 100 66Z" fill="#ffc933" ${S}/>
        <path d="M52 92 Q100 58 148 92 L146 100 Q100 70 54 100Z" fill="#e8283e" ${S}/>
        <circle cx="22" cy="30" r="9" fill="#ffd93d" ${S}/>
        <circle cx="178" cy="30" r="9" fill="#fff" ${S}/>`,
      front: [[168, 104, 7], [178, 86, 6], [184, 68, 5], [186, 50, 4]]
        .map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#ffe23d" ${S}/>`)
        .join(""),
    }),
  };

  /* ============ 캐릭터 ============ */
  function waddleDee(extra = "", back = "") {
    return svg(`${back}
      <ellipse cx="70" cy="170" rx="28" ry="14" fill="#e8a13a" ${S} transform="rotate(-10 70 170)"/>
      <ellipse cx="130" cy="170" rx="28" ry="14" fill="#e8a13a" ${S} transform="rotate(10 130 170)"/>
      <ellipse cx="44" cy="124" rx="15" ry="12" fill="#f07f3c" ${S}/>
      <ellipse cx="156" cy="124" rx="15" ry="12" fill="#f07f3c" ${S}/>
      <circle cx="100" cy="112" r="58" fill="#f07f3c" ${S}/>
      <ellipse cx="100" cy="114" rx="42" ry="34" fill="#fcd9ab"/>
      ${dotEyes(86, 114, 108)}
      ${blush(72, 128, 128, "#ff9c8a")}
      ${extra}`);
  }

  const CHARACTERS = {
    kirby: kirby(),

    "waddle-dee": waddleDee(),

    "bandana-dee": waddleDee(
      `<path d="M46 92 Q48 52 100 52 Q152 52 154 92 Q100 76 46 92Z" fill="#2f6fd6" ${S}/>
       <circle cx="80" cy="66" r="3" fill="#fff"/><circle cx="104" cy="60" r="3" fill="#fff"/><circle cx="126" cy="68" r="3" fill="#fff"/>
       <path d="M148 80 L178 68 L170 90Z" fill="#2f6fd6" ${S}/>
       <path d="M150 86 L182 98 L162 104Z" fill="#2f6fd6" ${S}/>`,
      `<line x1="182" y1="34" x2="182" y2="192" stroke="#8a5a2b" stroke-width="7" stroke-linecap="round"/>
       <path d="M182 6 L194 36 H170Z" fill="#dfe6f0" ${S}/>`
    ),

    "waddle-doo": svg(`
      <ellipse cx="70" cy="170" rx="28" ry="14" fill="#e8a13a" ${S} transform="rotate(-10 70 170)"/>
      <ellipse cx="130" cy="170" rx="28" ry="14" fill="#e8a13a" ${S} transform="rotate(10 130 170)"/>
      <ellipse cx="44" cy="124" rx="15" ry="12" fill="#f07f3c" ${S}/>
      <ellipse cx="156" cy="124" rx="15" ry="12" fill="#f07f3c" ${S}/>
      <circle cx="100" cy="112" r="58" fill="#f07f3c" ${S}/>
      <circle cx="100" cy="104" r="28" fill="#fff" ${S}/>
      <circle cx="100" cy="107" r="14" fill="#1b1030"/>
      <circle cx="94" cy="100" r="5" fill="#fff"/>`),

    "meta-knight": svg(`
      ${mirror(`<path d="M62 104 Q24 40 4 66 Q20 78 12 98 Q30 98 26 120 Q44 110 60 128Z" fill="#3b2a6e" ${S}/>`)}
      <ellipse cx="72" cy="168" rx="24" ry="13" fill="#7b3fbf" ${S}/>
      <ellipse cx="128" cy="168" rx="24" ry="13" fill="#7b3fbf" ${S}/>
      <circle cx="100" cy="116" r="52" fill="#2e3f9e" ${S}/>
      <circle cx="100" cy="108" r="40" fill="#d0d6e2" ${S}/>
      <path d="M68 96 H132 V112 H110 V136 H90 V112 H68Z" fill="#141428"/>
      <ellipse cx="84" cy="104" rx="7" ry="5" fill="#ffd93d"/>
      <ellipse cx="116" cy="104" rx="7" ry="5" fill="#ffd93d"/>
      <ellipse cx="50" cy="128" rx="18" ry="12" fill="#5b6fd8" ${S}/>
      <ellipse cx="150" cy="128" rx="18" ry="12" fill="#5b6fd8" ${S}/>
      <g transform="rotate(30 160 130)">
        <path d="M154 60 L162 48 L170 60 L168 118 H156Z" fill="#ffd93d" ${S}/>
        <rect x="146" y="116" width="32" height="8" rx="3" fill="#e8283e" ${S}/>
        <rect x="158" y="124" width="8" height="18" rx="3" fill="#5b3a8a" ${S}/>
      </g>`),

    dedede: svg(`
      <line x1="176" y1="190" x2="176" y2="66" stroke="#8a5a2b" stroke-width="9" stroke-linecap="round"/>
      <rect x="140" y="30" width="58" height="40" rx="8" fill="#c9884a" ${S}/>
      <path d="M154 30 V70 M184 30 V70" stroke="#8a5a2b" stroke-width="4"/>
      <path d="M36 150 Q40 120 100 118 Q160 120 164 150 L170 186 H30Z" fill="#d6263e" ${S}/>
      <rect x="26" y="176" width="148" height="16" rx="8" fill="#fff" ${S}/>
      <ellipse cx="100" cy="138" rx="54" ry="13" fill="#fff" ${S}/>
      <circle cx="100" cy="94" r="52" fill="#3f73db" ${S}/>
      <ellipse cx="84" cy="92" rx="9" ry="11" fill="#fff" ${S}/>
      <ellipse cx="116" cy="92" rx="9" ry="11" fill="#fff" ${S}/>
      <ellipse cx="86" cy="94" rx="4" ry="6" fill="#1b1030"/>
      <ellipse cx="114" cy="94" rx="4" ry="6" fill="#1b1030"/>
      <ellipse cx="100" cy="116" rx="28" ry="14" fill="#f7b733" ${S}/>
      <path d="M74 116 Q100 122 126 116" fill="none" ${S}/>
      <path d="M50 78 Q46 26 100 22 Q154 26 150 78Z" fill="#d6263e" ${S}/>
      <rect x="44" y="68" width="112" height="18" rx="9" fill="#fff" ${S}/>
      <circle cx="100" cy="46" r="9" fill="#ffd93d" ${S}/>`),

    gordo: svg(`
      ${spikes(8, 100, 100, 44, 88, 14, "#e6e6f0", Math.PI / 8)}
      <circle cx="100" cy="100" r="50" fill="#34344a" ${S}/>
      <ellipse cx="84" cy="96" rx="10" ry="14" fill="#fff"/>
      <ellipse cx="116" cy="96" rx="10" ry="14" fill="#fff"/>
      <ellipse cx="86" cy="99" rx="4.5" ry="7" fill="#1b1030"/>
      <ellipse cx="114" cy="99" rx="4.5" ry="7" fill="#1b1030"/>`),

    "bronto-burt": svg(`
      ${mirror(`<path d="M68 90 Q34 46 38 22 Q52 38 58 30 Q62 44 70 40 Q72 58 82 68Z" fill="#fff" ${S}/>`)}
      <ellipse cx="80" cy="158" rx="16" ry="9" fill="#f28c28" ${S}/>
      <ellipse cx="120" cy="158" rx="16" ry="9" fill="#f28c28" ${S}/>
      <circle cx="100" cy="112" r="46" fill="#e05a9c" ${S}/>
      ${dotEyes(88, 112, 106, 5.5, 11)}
      ${blush(74, 126, 122, "#ffb3d1")}`),

    scarfy: svg(`
      ${mirror(`<path d="M60 84 L42 30 L92 64Z" fill="#f4a23a" ${S}/><path d="M62 72 L52 44 L80 64Z" fill="#ffc4a8"/>`)}
      <circle cx="100" cy="112" r="52" fill="#f4a23a" ${S}/>
      ${eyes(88, 112, 106, 6, 12)}
      ${blush(70, 130, 126)}
      <path d="M92 130 Q96 136 100 130 Q104 136 108 130" fill="none" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`),

    kracko: svg(`
      ${spikes(12, 100, 100, 54, 92, 8, "#ffd93d")}
      ${blob([[100, 100, 50], [58, 110, 30], [142, 110, 30], [78, 70, 28], [122, 70, 28], [80, 132, 26], [120, 132, 26]], "#eef2fb")}
      <circle cx="100" cy="100" r="26" fill="#fff" ${S}/>
      <circle cx="100" cy="102" r="13" fill="#1b1030"/>
      <circle cx="95" cy="97" r="4" fill="#fff"/>`),

    whispy: svg(`
      <rect x="46" y="60" width="108" height="150" rx="22" fill="#9b6433" ${S}/>
      ${blob([[60, 56, 36], [100, 44, 40], [140, 56, 36], [36, 82, 26], [164, 82, 26]], "#4caf50")}
      <circle cx="70" cy="44" r="9" fill="#e8283e" ${S}/>
      <circle cx="132" cy="36" r="9" fill="#e8283e" ${S}/>
      <circle cx="156" cy="74" r="8" fill="#e8283e" ${S}/>
      <ellipse cx="78" cy="112" rx="9" ry="15" fill="#2e1a10"/>
      <ellipse cx="122" cy="112" rx="9" ry="15" fill="#2e1a10"/>
      <ellipse cx="100" cy="138" rx="9" ry="13" fill="#7a4a22" ${S}/>
      <ellipse cx="100" cy="172" rx="20" ry="11" fill="#2e1a10"/>
      <path d="M58 150 Q62 164 56 180 M142 150 Q138 166 146 182" fill="none" stroke="#7a4a22" stroke-width="3"/>`),

    marx: svg(`
      <circle cx="100" cy="176" r="20" fill="#fff" ${S}/>
      <path d="M82 170 Q100 158 118 170 M84 186 Q100 196 116 186" fill="none" stroke="#e8283e" stroke-width="4"/>
      <ellipse cx="78" cy="158" rx="16" ry="9" fill="#e8283e" ${S}/>
      <ellipse cx="122" cy="158" rx="16" ry="9" fill="#2f5fd6" ${S}/>
      <circle cx="100" cy="116" r="44" fill="#dcc6f2" ${S}/>
      <path d="M100 76 Q64 34 32 56 Q26 64 32 72 Q58 62 70 88Z" fill="#e8283e" ${S}/>
      <path d="M100 76 Q136 34 168 56 Q174 64 168 72 Q142 62 130 88Z" fill="#2f5fd6" ${S}/>
      <path d="M60 94 Q62 72 100 70 V84 Q76 86 60 94Z" fill="#e8283e" ${S}/>
      <path d="M140 94 Q138 72 100 70 V84 Q124 86 140 94Z" fill="#2f5fd6" ${S}/>
      <circle cx="30" cy="68" r="9" fill="#ffd93d" ${S}/>
      <circle cx="170" cy="68" r="9" fill="#ffd93d" ${S}/>
      ${dotEyes(88, 112, 106, 6, 11)}
      <path d="M76 124 Q100 150 124 124Z" fill="#6b1030" ${S}/>
      <path d="M84 126 L88 134 L92 127Z M116 126 L112 134 L108 127Z" fill="#fff"/>`),

    magolor: svg(`
      ${mirror(`<path d="M60 70 Q40 30 60 18 Q72 42 86 50Z" fill="#2f55c4" ${S}/>`)}
      <path d="M100 40 C150 40 162 90 158 120 C154 160 130 178 100 178 C70 178 46 160 42 120 C38 90 50 40 100 40Z" fill="#2f55c4" ${S}/>
      <ellipse cx="100" cy="102" rx="38" ry="30" fill="#16163a" ${S}/>
      <ellipse cx="86" cy="100" rx="7" ry="10" fill="#ffd93d"/>
      <ellipse cx="114" cy="100" rx="7" ry="10" fill="#ffd93d"/>
      <path d="M48 130 Q100 152 152 130 L154 146 Q100 168 46 146Z" fill="#f4f4f4" ${S}/>
      <path d="M50 142 Q100 162 150 142" fill="none" stroke="#ffc933" stroke-width="3"/>
      <circle cx="26" cy="132" r="12" fill="#fff" ${S}/>
      <circle cx="174" cy="132" r="12" fill="#fff" ${S}/>`),

    "dark-matter": svg(`
      <path d="${(() => {
        const pts = [];
        const n = 16;
        for (let i = 0; i < n * 2; i++) {
          const a = (i / (n * 2)) * Math.PI * 2;
          const r = i % 2 === 0 ? 78 + ((i * 7) % 11) : 50;
          pts.push(`${(100 + Math.cos(a) * r).toFixed(1)} ${(100 + Math.sin(a) * r).toFixed(1)}`);
        }
        return "M" + pts.join(" L") + "Z";
      })()}" fill="#1a1026" stroke="#8a4fd8" stroke-width="4" stroke-linejoin="round"/>
      <ellipse cx="100" cy="100" rx="24" ry="26" fill="#fff" ${S}/>
      <circle cx="100" cy="102" r="12" fill="#c0182f"/>
      <circle cx="100" cy="102" r="5" fill="#1b1030"/>`),

    zero: svg(`
      <circle cx="100" cy="100" r="66" fill="#f5f5f5" ${S}/>
      <path d="M40 80 Q56 86 64 98 M44 130 Q58 124 70 116 M160 76 Q146 86 136 96 M156 132 Q142 124 132 114" fill="none" stroke="#e05060" stroke-width="2.5"/>
      <circle cx="100" cy="100" r="32" fill="#d0112b" ${S}/>
      <circle cx="100" cy="100" r="13" fill="#1b1030"/>
      <circle cx="90" cy="88" r="6" fill="#fff" opacity="0.8"/>`),

    "galacta-knight": svg(`
      ${mirror(`<path d="M64 104 Q30 30 2 30 Q14 48 8 60 Q24 62 16 80 Q32 82 26 100 Q42 100 40 116 Q52 110 62 122Z" fill="#fff" ${S}/>`)}
      <line x1="10" y1="190" x2="190" y2="20" stroke="#ffc933" stroke-width="6" stroke-linecap="round"/>
      <path d="M190 20 L166 30 L180 44Z" fill="#f09ac0" ${S}/>
      <ellipse cx="72" cy="168" rx="24" ry="13" fill="#b7408a" ${S}/>
      <ellipse cx="128" cy="168" rx="24" ry="13" fill="#b7408a" ${S}/>
      <circle cx="100" cy="116" r="52" fill="#f09ac0" ${S}/>
      <circle cx="100" cy="108" r="40" fill="#fbfbff" ${S}/>
      <path d="M68 96 H132 V112 H110 V136 H90 V112 H68Z" fill="#c2186b"/>
      <ellipse cx="84" cy="104" rx="7" ry="5" fill="#ffe8f4"/>
      <ellipse cx="116" cy="104" rx="7" ry="5" fill="#ffe8f4"/>
      <path d="M100 50 L108 70 H92Z" fill="#ffc933" ${S}/>`),

    rick: svg(`
      <circle cx="62" cy="58" r="17" fill="#c47f45" ${S}/><circle cx="62" cy="58" r="8" fill="#f4b8a0"/>
      <circle cx="138" cy="58" r="17" fill="#c47f45" ${S}/><circle cx="138" cy="58" r="8" fill="#f4b8a0"/>
      <ellipse cx="74" cy="178" rx="20" ry="10" fill="#fbe7cf" ${S}/>
      <ellipse cx="126" cy="178" rx="20" ry="10" fill="#fbe7cf" ${S}/>
      <ellipse cx="100" cy="120" rx="62" ry="60" fill="#c47f45" ${S}/>
      <ellipse cx="100" cy="132" rx="42" ry="38" fill="#fbe7cf"/>
      ${dotEyes(82, 118, 104, 6, 10)}
      <path d="M95 118 H105 L100 124Z" fill="#e0607e"/>
      ${blush(66, 134, 124)}
      <path d="M100 124 V130 M100 130 Q94 136 90 132 M100 130 Q106 136 110 132" fill="none" stroke="${O}" stroke-width="2.5" stroke-linecap="round"/>`),

    coo: svg(`
      <path d="M58 58 L64 24 L84 50Z M142 58 L136 24 L116 50Z" fill="#5a48a8" ${S}/>
      <ellipse cx="84" cy="182" rx="12" ry="7" fill="#f7a534" ${S}/>
      <ellipse cx="116" cy="182" rx="12" ry="7" fill="#f7a534" ${S}/>
      <path d="M100 40 C150 40 160 90 158 120 C156 160 132 180 100 180 C68 180 44 160 42 120 C40 90 50 40 100 40Z" fill="#6c5ac0" ${S}/>
      <ellipse cx="100" cy="100" rx="46" ry="34" fill="#c8bff0"/>
      ${mirror(`<path d="M44 110 Q24 130 36 160 Q50 140 58 120Z" fill="#5a48a8" ${S}/>`)}
      ${roundEyes(82, 118, 96, 16, 8)}
      <path d="M92 110 H108 L100 124Z" fill="#ffc933" ${S}/>
      <ellipse cx="100" cy="150" rx="26" ry="20" fill="#d8d0f6"/>`),

    gooey: svg(`
      <path d="M36 156 Q30 70 100 58 Q170 70 164 156 Q132 168 100 164 Q68 168 36 156Z" fill="#3b6ee6" ${S}/>
      <ellipse cx="80" cy="100" rx="11" ry="16" fill="#1b1030"/>
      <ellipse cx="120" cy="100" rx="11" ry="16" fill="#1b1030"/>
      <circle cx="77" cy="93" r="4" fill="#fff"/><circle cx="117" cy="93" r="4" fill="#fff"/>
      <ellipse cx="100" cy="126" rx="10" ry="6" fill="#1b1030"/>
      <path d="M94 126 Q96 168 118 184 Q132 178 120 156 Q112 140 106 126Z" fill="#e8283e" ${S}/>`),

    chilly: svg(`
      <ellipse cx="42" cy="124" rx="14" ry="11" fill="#f7fbff" ${S}/>
      <ellipse cx="158" cy="124" rx="14" ry="11" fill="#f7fbff" ${S}/>
      <circle cx="100" cy="118" r="58" fill="#f7fbff" ${S}/>
      <path d="M68 26 H132 L140 70 Q100 62 60 70Z" fill="#e8283e" ${S}/>
      <path d="M66 36 H134" stroke="#b81d30" stroke-width="4"/>
      <circle cx="84" cy="106" r="7" fill="#1b1030"/>
      <circle cx="116" cy="106" r="7" fill="#1b1030"/>
      ${blush(70, 130, 124, "#ffb3c6")}
      <path d="M96 128 L112 132 L96 136Z" fill="#ff8a2a" ${S}/>
      <circle cx="100" cy="152" r="4" fill="#1b1030"/><circle cx="100" cy="166" r="4" fill="#1b1030"/>`),

    "mr-frosty": svg(`
      <ellipse cx="70" cy="172" rx="24" ry="12" fill="#8fa4bf" ${S}/>
      <ellipse cx="130" cy="172" rx="24" ry="12" fill="#8fa4bf" ${S}/>
      <circle cx="100" cy="112" r="58" fill="#dce6f0" ${S}/>
      <path d="M44 126 Q100 138 156 126 Q150 166 100 170 Q50 166 44 126Z" fill="#3a6fd8" ${S}/>
      <path d="M70 128 L80 100 M130 128 L120 100" stroke="#3a6fd8" stroke-width="6"/>
      <circle cx="84" cy="88" r="5" fill="#1b1030"/><circle cx="116" cy="88" r="5" fill="#1b1030"/>
      <ellipse cx="89" cy="108" rx="13" ry="10" fill="#f4f7fb" ${S}/>
      <ellipse cx="111" cy="108" rx="13" ry="10" fill="#f4f7fb" ${S}/>
      <ellipse cx="100" cy="100" rx="6" ry="4" fill="#1b1030"/>
      <path d="M86 116 L90 146 L97 118Z M114 116 L110 146 L103 118Z" fill="#fffbe6" ${S}/>`),

    "hot-head": svg(`
      <path d="M52 110 Q30 70 52 46 Q58 70 72 72 Q64 36 90 8 Q94 44 108 54 Q114 26 136 22 Q130 52 142 70 Q152 58 162 60 Q170 88 148 110Z" fill="#ff7a1a" ${S}/>
      <path d="M72 100 Q64 76 78 64 Q84 80 96 80 Q96 56 108 44 Q110 70 124 76 Q134 70 138 74 Q138 94 128 104Z" fill="#ffd23d"/>
      <ellipse cx="72" cy="172" rx="24" ry="12" fill="#c9401a" ${S}/>
      <ellipse cx="128" cy="172" rx="24" ry="12" fill="#c9401a" ${S}/>
      <circle cx="100" cy="120" r="52" fill="#ff5a2a" ${S}/>
      ${dotEyes(86, 114, 106, 5, 10)}
      <ellipse cx="100" cy="136" rx="20" ry="13" fill="#ffc933" ${S}/>
      <ellipse cx="100" cy="137" rx="9" ry="5" fill="#6b1030"/>`),

    sparky: svg(`
      ${bolt(30, 60, 1.4, -25)}${bolt(170, 58, 1.4, 25)}${bolt(100, 30, 1.2, 0)}${bolt(20, 130, 1, -60)}${bolt(182, 130, 1, 60)}
      <path d="M40 164 Q34 70 100 64 Q166 70 160 164 Q100 178 40 164Z" fill="#7ccf4f" ${S}/>
      <path d="M60 150 Q56 96 92 84" fill="none" stroke="#b4ec8c" stroke-width="6" stroke-linecap="round"/>
      ${roundEyes(84, 116, 112, 12, 6)}`),

    "blade-knight": svg(`
      <ellipse cx="72" cy="170" rx="24" ry="13" fill="#7a4fc0" ${S}/>
      <ellipse cx="128" cy="170" rx="24" ry="13" fill="#7a4fc0" ${S}/>
      <circle cx="100" cy="114" r="54" fill="#c3c9d6" ${S}/>
      <path d="M100 60 V76" stroke="#8a90a0" stroke-width="4"/>
      <rect x="62" y="96" width="76" height="24" rx="12" fill="#141428"/>
      <ellipse cx="86" cy="108" rx="5" ry="7" fill="#ffd93d"/>
      <ellipse cx="114" cy="108" rx="5" ry="7" fill="#ffd93d"/>
      <path d="M70 140 Q100 150 130 140" fill="none" stroke="#8a90a0" stroke-width="4"/>
      <ellipse cx="44" cy="128" rx="14" ry="11" fill="#7a4fc0" ${S}/>
      <g transform="rotate(20 160 128)">
        <rect x="154" y="40" width="12" height="78" rx="3" fill="#e6ecf5" ${S}/>
        <rect x="144" y="116" width="32" height="8" rx="3" fill="#ffcc33" ${S}/>
        <rect x="156" y="124" width="8" height="16" rx="3" fill="#7a4a2a" ${S}/>
      </g>`),

    "knuckle-joe": svg(`
      <ellipse cx="74" cy="182" rx="20" ry="9" fill="#e8283e" ${S}/>
      <ellipse cx="126" cy="182" rx="20" ry="9" fill="#e8283e" ${S}/>
      <path d="M62 132 Q100 122 138 132 L142 178 H58Z" fill="#2f55c4" ${S}/>
      <circle cx="46" cy="144" r="17" fill="#e8283e" ${S}/>
      <circle cx="154" cy="144" r="17" fill="#e8283e" ${S}/>
      <circle cx="100" cy="98" r="44" fill="#ffd9a8" ${S}/>
      <path d="M54 98 Q42 60 64 50 Q60 28 84 36 Q92 14 110 30 Q130 18 136 42 Q160 44 150 70 Q164 88 146 100 Q140 72 100 68 Q60 72 54 98Z" fill="#f47b20" ${S}/>
      <path d="M58 82 Q100 64 142 82 L140 94 Q100 78 60 94Z" fill="#e8283e" ${S}/>
      <path d="M138 84 Q164 78 180 64 Q174 86 150 94Z" fill="#e8283e" ${S}/>
      <path d="M78 96 L94 102 M122 96 L106 102" stroke="${O}" stroke-width="3.5" stroke-linecap="round"/>
      ${dotEyes(88, 112, 110, 4.5, 8)}
      <path d="M92 128 Q100 124 108 128" fill="none" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`),

    cappy: svg(`
      <ellipse cx="80" cy="182" rx="16" ry="8" fill="#e8b67a" ${S}/>
      <ellipse cx="120" cy="182" rx="16" ry="8" fill="#e8b67a" ${S}/>
      <ellipse cx="100" cy="150" rx="42" ry="34" fill="#f7dcb4" ${S}/>
      <path d="M22 122 Q28 34 100 30 Q172 34 178 122 Q100 106 22 122Z" fill="#c26b34" ${S}/>
      <circle cx="70" cy="70" r="12" fill="#f0b27a"/><circle cx="118" cy="54" r="10" fill="#f0b27a"/>
      <circle cx="148" cy="92" r="9" fill="#f0b27a"/><circle cx="46" cy="104" r="7" fill="#f0b27a"/>
      ${dotEyes(86, 114, 142, 5, 9)}
      ${blush(72, 128, 158)}`),

    "broom-hatter": svg(`
      <line x1="20" y1="120" x2="150" y2="186" stroke="#8a5a2b" stroke-width="6" stroke-linecap="round"/>
      <path d="M140 170 L196 176 L186 198 L134 190Z" fill="#e8c35a" ${S}/>
      <ellipse cx="82" cy="182" rx="15" ry="8" fill="#ffc933" ${S}/>
      <ellipse cx="118" cy="182" rx="15" ry="8" fill="#ffc933" ${S}/>
      <ellipse cx="100" cy="160" rx="36" ry="22" fill="#3a2050" ${S}/>
      <ellipse cx="88" cy="160" rx="6" ry="8" fill="#fff"/><ellipse cx="112" cy="160" rx="6" ry="8" fill="#fff"/>
      <path d="M48 140 Q70 92 94 44 Q108 18 146 28 Q118 40 116 62 Q128 104 152 140Z" fill="#9a44c8" ${S}/>
      <ellipse cx="100" cy="140" rx="72" ry="16" fill="#9a44c8" ${S}/>
      <path d="M58 126 Q100 134 142 126" fill="none" stroke="#ffc933" stroke-width="6"/>`),

    rocky: svg(`
      <ellipse cx="74" cy="176" rx="18" ry="9" fill="#6b7078" ${S}/>
      <ellipse cx="126" cy="176" rx="18" ry="9" fill="#6b7078" ${S}/>
      <path d="M36 150 Q26 100 52 68 Q80 42 118 48 Q160 56 166 100 Q174 142 150 162 Q100 180 36 150Z" fill="#9aa0ab" ${S}/>
      <path d="M60 80 L72 92 L66 104 M140 128 L130 140 M112 58 L118 70" fill="none" stroke="#6b7078" stroke-width="3"/>
      <path d="M72 96 L94 104 M128 96 L106 104" stroke="${O}" stroke-width="4" stroke-linecap="round"/>
      ${dotEyes(86, 114, 116, 5.5, 10)}
      <path d="M90 144 Q100 138 110 144" fill="none" stroke="${O}" stroke-width="3" stroke-linecap="round"/>`),

    shotzo: svg(`
      <rect x="80" y="26" width="40" height="92" rx="8" fill="#3b3b50" ${S} transform="rotate(-25 100 116)"/>
      <ellipse cx="80" cy="34" rx="22" ry="9" fill="#1b1b28" ${S} transform="rotate(-25 80 34)"/>
      <path d="M36 184 Q36 108 100 104 Q164 108 164 184Z" fill="#3b3b50" ${S}/>
      <path d="M56 150 Q70 118 100 114" fill="none" stroke="#5a5a74" stroke-width="6" stroke-linecap="round"/>
      ${roundEyes(82, 118, 148, 13, 6, 0)}`),
  };

  window.KIRBY_ART = { ...CHARACTERS, ...Object.fromEntries(Object.entries(ABILITIES).map(([k, v]) => [`ability-${k}`, v])) };
})();
