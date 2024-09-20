let batteryLevel = 100;
const batteryDisplay = document.getElementById('battery-level');
const batteryPercentageDisplay = document.getElementById('battery-percentage');
const clockDisplay = document.getElementById('clock');
const hourInput = document.getElementById('hour');
const minuteInput = document.getElementById('minute');
const addAlarmButton = document.getElementById('add-alarm');
const alarmList = document.getElementById('alarm-list');
const chargeButton = document.getElementById('charge-button');
const alarms = [];

function updateBatteryLevel() {
    if (batteryLevel > 0) {
        batteryLevel--;
        batteryDisplay.style.width = `${batteryLevel}%`;
        batteryPercentageDisplay.textContent = `${batteryLevel}%`;

        if (batteryLevel <= 20) {
            batteryDisplay.style.backgroundColor = 'red';
        }

        const currentTime = new Date().toLocaleTimeString();
        clockDisplay.textContent = currentTime;

        checkAlarms();
    } else {
        clearInterval(batteryInterval);
        batteryDisplay.style.width = `0%`;
        batteryDisplay.style.backgroundColor = 'black';
        batteryPercentageDisplay.textContent = '0%';
        clockDisplay.style.display = 'none';
        document.body.classList.add('dark');
        chargeButton.style.display = 'block';
    }
}

function checkAlarms() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    alarms.forEach((alarm, index) => {
        if (alarm.hour === currentHour && alarm.minute === currentMinute) {
            alert(`알람! ${currentHour}시 ${currentMinute}분`);
            alarms.splice(index, 1);
            updateAlarmList();
        }
    });
}

function addAlarm() {
    const hour = parseInt(hourInput.value);
    const minute = parseInt(minuteInput.value);

    if (alarms.length < 3 && hour >= 0 && hour < 24 && minute >= 0 && minute < 60) {
        alarms.push({ hour, minute });
        hourInput.value = '';
        minuteInput.value = '';
        updateAlarmList();
    } else {
        alert("알람은 최대 3개까지 추가할 수 있습니다.");
    }
}

function updateAlarmList() {
    alarmList.innerHTML = '';
    alarms.forEach(alarm => {
        const alarmItem = document.createElement('div');
        alarmItem.textContent = `${alarm.hour}시 ${alarm.minute}분`;
        alarmList.appendChild(alarmItem);
    });
}

chargeButton.addEventListener('click', () => {
    batteryLevel = 100;
    batteryDisplay.style.width = `${batteryLevel}%`;
    batteryPercentageDisplay.textContent = `${batteryLevel}%`;
    batteryDisplay.style.backgroundColor = 'green';
    clockDisplay.style.display = 'block';
    document.body.classList.remove('dark');
    chargeButton.style.display = 'none';
    batteryInterval = setInterval(updateBatteryLevel, 1000); 
});

addAlarmButton.addEventListener('click', addAlarm);
let batteryInterval = setInterval(updateBatteryLevel, 1000);
