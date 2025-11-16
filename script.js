// 對照表 (貓咪年齡-年 → 等同人類年齡-年)
const catToHumanMap = {
    0: 0,
    1: 15,
    2: 21,
    3: 28,
    4: 32,
    5: 36,
    6: 40,
    7: 44,
    8: 48,
    9: 52,
    10: 56,
    11: 60,
    12: 64,
    13: 68,
    14: 72,
    15: 76,
    16: 80,
    17: 84,
    18: 88,
    19: 92,
    20: 96,
    21: 100,
    22: 104,
    23: 108,
    24: 112,
    25: 116
};

// 計算「等同人類年齡」的線性插值函數
function calculateHumanAge(year, month) {
    if (year >= 25) return catToHumanMap[25]; // 已達表格最高值

    const base = catToHumanMap[year];
    // 如果是 24 歲，則取 25 歲的值來計算插值，避免 `year + 1` 超出範圍
    const next = catToHumanMap[year + 1] || catToHumanMap[25]; 

    const ratio = month / 12; // 月份佔一年的比例

    return Math.round(base + (next - base) * ratio);
}

document.getElementById("birthday").addEventListener("change", function () {
    const birthdayInput = this.value;
    const birthday = new Date(birthdayInput);
    const now = new Date();
    const resultElement = document.getElementById("result");

    // 檢查是否有輸入日期或日期是否在未來
    if (!birthdayInput || birthday > now) {
        resultElement.style.display = "none";
        return;
    }

    // 計算貓咪年齡（以月為單位）
    let diffMonths =
        (now.getFullYear() - birthday.getFullYear()) * 12 +
        (now.getMonth() - birthday.getMonth());

    // 如果當前日期小於生日日期，則月份-1 (尚未滿月)
    if (now.getDate() < birthday.getDate()) {
        diffMonths -= 1;
    }
    
    // 確保不會出現負數月齡（雖然前面 `birthday > now` 已經處理了）
    if (diffMonths < 0) diffMonths = 0;


    const catYears = Math.floor(diffMonths / 12);
    const catMonths = diffMonths % 12;

    // 計算等同人類年齡
    const humanEquivalent = calculateHumanAge(catYears, catMonths);

    // 顯示結果
    resultElement.style.display = "block";
    resultElement.innerHTML = `
        <strong>📅 貓咪生日：</strong> ${birthdayInput}<br>
        <strong>🐱 貓咪實際年齡：</strong> ${catYears} 歲 ${catMonths} 個月<br>
        <strong>🧍 等同人類年齡：</strong> 約 <span style="font-size:22px;font-weight:700;">${humanEquivalent} 歲</span>
    `;
});