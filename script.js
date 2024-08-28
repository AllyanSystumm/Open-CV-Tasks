document.addEventListener('DOMContentLoaded', function() {
    const timeDisplay = document.getElementById('time');
    const setAlarmBtn = document.getElementById('setAlarmBtn');
    const stopAlarmBtn = document.getElementById('stopAlarmBtn');
    const alarmTimeInput = document.getElementById('alarmTime');
    const saveAlarmBtn = document.getElementById('saveAlarmBtn');
    const alarmSound = document.getElementById('alarmSound');
    
    let alarmTime = null;
    let alarmInterval = null;

    function updateTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        timeDisplay.textContent = `${hours}:${minutes}:${seconds}`;
        
        if (alarmTime &&
            now.getHours() === alarmTime.getHours() &&
            now.getMinutes() === alarmTime.getMinutes() &&
            now.getSeconds() === 0) {
            playAlarm();
        }
    }

    function playAlarm() {
        stopAlarmBtn.disabled = false;
        setAlarmBtn.disabled = true;
        alarmSound.play();
    }

    function stopAlarm() {
        stopAlarmBtn.disabled = true;
        setAlarmBtn.disabled = false;
        alarmSound.pause();
        alarmSound.currentTime = 0;
        
        if (alarmInterval) {
            clearInterval(alarmInterval);
            alarmInterval = null;
        }
    }

    setAlarmBtn.addEventListener('click', function() {
        alarmTimeInput.focus();
    });

    saveAlarmBtn.addEventListener('click', function() {
        const [hours, minutes] = alarmTimeInput.value.split(':');
        alarmTime = new Date();
        alarmTime.setHours(parseInt(hours, 10));
        alarmTime.setMinutes(parseInt(minutes, 10));
        alarmTime.setSeconds(0);
        alarmTime.setMilliseconds(0);

        // Restart the alarm interval
        if (alarmInterval) {
            clearInterval(alarmInterval);
        }
        alarmInterval = setInterval(updateTime, 1000);

        // Optional: Close the alarm input if it's part of a form
        alarmTimeInput.value = null;
        alarmTimeInput.focus();
    });

    stopAlarmBtn.addEventListener('click', stopAlarm);

    // Initial call to updateTime to display the current time immediately
    updateTime();

    // Start the interval to update the time every second
    setInterval(updateTime, 1000);
});
