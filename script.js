// 貓齡 → 人類 對照表
const catToHumanMap = {
    0: 0, 1: 15, 2: 21, 3: 28, 4: 32,
    5: 36, 6: 40, 7: 44, 8: 48, 9: 52,
    10: 56, 11: 60, 12: 64, 13: 68, 14: 72,
    15: 76, 16: 80, 17: 84, 18: 88, 19: 92,
    20: 96, 21: 100, 22: 104, 23: 108,
    24: 112, 25: 116
};

// DOM ready：帶出 localStorage 的生日
document.addEventListener("DOMContentLoaded", function () {
    const birthdayInput = document.getElementById("birthday");
    const saved = localStorage.getItem("catBirthDate");

    if (saved && birthdayInput) {
        const d = new Date(saved);
        if (!isNaN(d.getTime())) {
            birthdayInput.value = saved;
        } else {
            localStorage.removeItem("catBirthDate");
        }
    }
});

/* ----------------- 開始計算 ----------------- */
const calcBtn = document.getElementById("calcBtn");
calcBtn.addEventListener("click", function () {
    const inputField = document.getElementById("birthday");
    const result = document.getElementById("result");

    if (!inputField.value || isNaN(new Date(inputField.value).getTime())) {
        alert("請選擇正確的貓咪生日（使用日期選擇器）！");
        return;
    }

    const birthday = new Date(inputField.value);
    const now = new Date();
    if (birthday > now) {
        alert("生日不能大於今天！");
        return;
    }

    // 儲存最後生日
    localStorage.setItem("catBirthDate", inputField.value);

    // 計算月齡
    let diffMonths =
        (now.getFullYear() - birthday.getFullYear()) * 12 +
        (now.getMonth() - birthday.getMonth());
    if (now.getDate() < birthday.getDate()) diffMonths--;

    const catYears = Math.floor(diffMonths / 12);
    const catMonths = diffMonths % 12;

    function getHumanAge(year, month) {
        if (year >= 25) return catToHumanMap[25];
        const base = catToHumanMap[year];
        const next = catToHumanMap[year + 1];
        return Math.round(base + (next - base) * (month / 12));
    }

    const humanEquivalent = getHumanAge(catYears, catMonths);

    // 顯示結果
    result.style.display = "block";
    result.innerHTML = `
        <strong>📅 貓咪生日：</strong> ${inputField.value}<br>
        <strong>🐱 貓咪實際年齡：</strong> ${catYears} 歲 ${catMonths} 個月<br>
        <strong>🧍 等同人類年齡：</strong>
        <span style="font-size:22px;font-weight:700;">約 ${humanEquivalent} 歲</span>
    `;
});

/* ----------------- 清除資料功能 ----------------- */
document.getElementById("clearBtn").addEventListener("click", function () {
    const inputField = document.getElementById("birthday");
    const result = document.getElementById("result");

    // 清空欄位
    inputField.value = "";

    // 隱藏結果
    result.style.display = "none";
    result.innerHTML = "";

    // 清掉 localStorage
    localStorage.removeItem("catBirthDate");
});
