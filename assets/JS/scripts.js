const currentDate = document.querySelector(".current-date"),
daysTag = document.querySelector(".days"),
prevNextBtns = document.querySelectorAll(".icons .header-icon");

// getting current date
let date = new Date(),
currYear = date.getFullYear(),
currMonth = date.getMonth();

const monthsArray = ["January", "February", "March", "April", "May", "June", 
                    "July", "August", "September", "October", "November", "December"];

const renderCurrentDate = () => {
    return currentDate.innerText  = `${monthsArray[currMonth]} ${currYear}`;
}

const renderLastDaysOfLastMonth = () => {
    let firstDayOfCurrentMonth = new Date(currYear, currMonth, 1).getDay(), lastDateOfLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";
    for (let i = firstDayOfCurrentMonth; i > 0; --i) {
        liTag += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
    }
    return liTag;
}

const renderFirstDaysOfNextMonth = (lastDateOfCurrentMonth) => {
    let lastDayOfCurrentMonth = new Date(currYear, currMonth, lastDateOfCurrentMonth).getDay()
    let liTag = "";
    for (let i = lastDayOfCurrentMonth; i < 6; i++) {
        liTag += `<li class="inactive">${i - lastDayOfCurrentMonth + 1}</li>`
    }
    return liTag;
}

const renderDays = () => {
    let lastDateOfCurrentMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let liTag = "";  
    for (let i = 1; i<=lastDateOfCurrentMonth; ++i) {
        let isToday = i === new Date().getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${isToday}">${i}</li>`;
    }
    const lastDaysOfLastMonth = renderLastDaysOfLastMonth();
    const firstDayOfNextMonth = renderFirstDaysOfNextMonth(lastDateOfCurrentMonth);
    daysTag.innerHTML = `${lastDaysOfLastMonth} ${liTag} ${firstDayOfNextMonth}`;
}

const renderCalendar = () => {
    renderCurrentDate();
    renderDays();
}
renderCalendar()

// handle switching between previous and current month event
prevNextBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        currMonth = btn.id === "prev" ? currMonth - 1 : currMonth + 1; 
        
        // handle switching between previous and current year event
        if (currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }

        renderCalendar();
    });
});
