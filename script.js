const timDisplay = document.querySelector(".time-display");
const hourSelect = document.querySelector(".hours");
const minuteSelect = document.querySelector(".minute");
const ampmSelect = document.querySelector(".ampm");
const setAlarmbtn = document.querySelector("button");

let alarmTime = "";
let isAlarmset = false;
const ringtone = new Audio("./rr.mp3");

for (let i = 1; i <= 12; i++) {
  const value = i < 10 ? `0${i}` : i;
  hourSelect.innerHTML += `<option value='${value}'>${value}</option>`;
}

for (let i = 0; i < 60; i++) {
  const value = i < 10 ? `0${i}` : i;
  minuteSelect.innerHTML += `<option value='${value}'>${value}</option>`;
}

setInterval(() => {
  const date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();

  const ampm = h >= 12 ? "PM" : "AM";

  h = h % 12 || 12;
  h = h < 10 ? `0${h}` : h;

  const minutes = m < 10 ? `0${m}` : m;
  const seconds = s < 10 ? `0${s}` : s;

  timDisplay.textContent = `${h}:${minutes}:${seconds} ${ampm}`;

  if (alarmTime === `${h}:${minutes} ${ampm}` && isAlarmset) {
    ringtone.play();
    ringtone.loop = true;
  }
}, 1000);

setAlarmbtn.addEventListener("click", function () {
  if (isAlarmset) {
    alarmTime = "";
    ringtone.pause();
    ringtone.currentTime = 0;
    setAlarmbtn.textContent = "Set Alarm";
    [hourSelect, minuteSelect, ampmSelect].forEach(
      (select) => (select.disabled = false)
    );
    isAlarmset = false;
  } else {
    alarmTime = `${hourSelect.value}:${minuteSelect.value} ${ampmSelect.value}`;
    setAlarmbtn.textContent = "Clear Alarm";
    [hourSelect, minuteSelect, ampmSelect].forEach(
      (select) => (select.disabled = true)
    );
    isAlarmset = true;
  }
});
