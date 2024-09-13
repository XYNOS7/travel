// Initialize global variables
var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();
var clickedDays = 0;
var bookingSteps = 0;
var lastClickedDay;
var startDate = "";
var endDate = "";
var monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
var monthShortNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
var bookedDates = [];
var selectedDates = [];

// Extend Date object to add days
Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
};

// Format dates into a readable string format
function formatDates(dates) {
    if (dates != null) {
        var newDateArray = [];
        for (var i = 0; i < dates.length; i++) {
            var date = "";
            date += dayNames[dates[i].getDay()] + "-";
            date += dates[i].getDate() + "-";
            date += monthNames[dates[i].getMonth()] + "-";
            date += dates[i].getFullYear();
            newDateArray.push(date);
        }
        return newDateArray;
    }
    return null;
}

// Get all dates between startDate and endDate
function getDates(startDate, stopDate) {
    if (startDate != "" && endDate != "") {
        var dateArray = [];
        var currentDate = startDate;
        while (currentDate <= stopDate) {
            dateArray.push(new Date(currentDate));
            currentDate = currentDate.addDays(1);
        }
        return dateArray;
    }
    return null;
}

// Validate form inputs
function validateForm() {
    var formValidated = true;

    ["#form-name", "#form-number", "#form-email", "#form-guests"].forEach(function(id) {
        if ($(id).val() === "" || $(id).val() == null) {
            $(id).addClass("formError");
            formValidated = false;
        } else {
            $(id).removeClass("formError");
        }
    });

    return formValidated;
}

// Clear calendar selections
function clearCalender() {
    clickedDays = 0;
    $(".month div").removeClass("clicked");
    $("#startdate").html("");
    $("#enddate").html("");

    startDate = "";
    endDate = "";
    selectedDates = [];
    bookingSteps = 0;
}

// Clear booking form
function clearBooking() {
    $("#booking-form input").val("");
    $("#booking-form textarea").val("");

    $("#booking-wrapper").removeClass("opened");
    $("#make-booking").html("MAKE BOOKING ENQUIRY");
}

// Calculate number of days in a month
function daysInMonth(month) {
    return new Date(currentYear, month, 0).getDate();
}

// Display the calendar
function displayCalender() {
    var days = daysInMonth(currentMonth + 1);
    var today = new Date();
    today.setHours(0, 0, 0, 0); // Set time to the start of the day to avoid comparison issues

    $("#calender-title p").html(monthNames[currentMonth].toUpperCase());
    $("#year-selector").val(currentYear); // Set the year selector to the current year
    $("#calender-content").html("");

    for (var i = 1; i < firstDayOffset(); i++) {
        $("#calender-content").append("<div class='month flex center-vh'></div>");
    }
    for (var i = 1; i <= days; i++) {
        var date = new Date(currentYear, currentMonth, i);
        var day = date.getDay();
        var isPastDate = date < today; // Check if the date is in the past
        var cssClass = isPastDate ? 'month-selector past-date' : 'month-selector flex center-vh clickable';
        var onClick = isPastDate ? '' : "onclick='monthClick(this)'"; // Disable clicking for past dates

        var string = "<div class='month'><div id='" + dayNames[day] + "-" + i + "-" + monthNames[currentMonth] + "-" + currentYear + "' class='" + cssClass + "' " + onClick + "><p>" + i + "</p></div></div>";
        $("#calender-content").append(string);
    }

    checkSelected();
    checkBookings();
}

// Handle clicking on a date
function monthClick(e) {
    if ($(e).hasClass("clickable")) {
        clickedDays += 1;

        if (clickedDays == 1) {
            $(e).toggleClass("clicked");
            startDateIndex = parseInt($(e).attr('id').split('-')[1]);
            startDate = new Date(currentYear, currentMonth, startDateIndex);
        }
        if (clickedDays > 1) {
            endDateIndex = parseInt($(e).attr('id').split('-')[1]);
            endDate = new Date(currentYear, currentMonth, endDateIndex);
        }
        if (endDate > startDate) {
            var clicked = $(".clicked");
            $(clicked).not(clicked[0]).removeClass("clicked");
            $(e).toggleClass("clicked");

            dateArray = getDates(startDate, endDate);
            dateArray = formatDates(dateArray);
            selectedDates = dateArray;

            for (var i = 0; i < dateArray.length; i++) {
                $("#" + dateArray[i]).addClass("clicked");
            }
        }
        $("#startdate").html(startDate.toString().split(' ').slice(0, 4).join(' '));
        $("#enddate").html(endDate.toString().split(' ').slice(0, 4).join(' '));
    }
}

// Get the day offset of the first day of the month
function firstDayOffset() {
    return new Date(currentYear, currentMonth, 1).getDay();
}

// Mark booked dates on the calendar
function checkBookings() {
    if (bookedDates != null) {
        for (var i = 0; i < bookedDates.length; i++) {
            var inner = bookedDates[i];
            for (var j = 0; j < inner.length; j++) {
                $("#" + inner[j]).removeClass("clickable").delay(400).addClass("booked");
            }
        }
    }
}

// Highlight selected dates
function checkSelected() {
    selectedDates = getDates(startDate, endDate);
    selectedDates = formatDates(selectedDates);

    if (selectedDates != null) {
        for (var i = 0; i < selectedDates.length; i++) {
            $("#" + selectedDates[i]).addClass("clicked");
        }
    }
}

// Add booking and refresh calendar
function addBooking() {
    bookedDates.push(dateArray);
    clearCalender();
    displayCalender();
}

// Populate the year selector
function populateYearSelector() {
    var yearSelector = document.getElementById("year-selector");
    yearSelector.innerHTML = ''; // Clear the dropdown

    for (var year = 1900; year <= 2100; year++) {
        var option = document.createElement("option");
        option.value = year;
        option.text = year;
        yearSelector.appendChild(option);
    }

    // Set the current year as selected
    yearSelector.value = currentYear;
}

// Initialize the calendar on page load
$(function() {
    populateYearSelector();
    displayCalender();

    $("#date").append(new Date);
});

// Event listener for changing the year
$("#year-selector").on("change", function() {
    currentYear = parseInt(this.value);
    displayCalender();
});

// Event listener for changing the month (left arrow)
$("#left").on("click", function() {
    if (currentMonth > 0) {
        currentMonth -= 1;
    } else {
        currentMonth = 11;
        currentYear -= 1;
        $("#year-selector").val(currentYear); // Update the year selector
    }
    displayCalender();
});

// Event listener for changing the month (right arrow)
$("#right").on("click", function() {
    if (currentMonth < 11) {
        currentMonth += 1;
    } else {
        currentMonth = 0;
        currentYear += 1;
        $("#year-selector").val(currentYear); // Update the year selector
    }
    displayCalender();
});

// Event listener for clearing selections
$("#clear").on("click", function() {
    clearCalender();
    clearBooking();
});

// Event listener for making a booking
$("#make-booking").on("click", function() {
    if (selectedDates != null && selectedDates.length > 0) {
        bookingSteps += 1;

        if (bookingSteps == 1) {
            $("#booking-wrapper").addClass("opened");
            $("#make-booking").html("SUBMIT ENQUIRY");
        }
        if (bookingSteps == 2) {
            if (validateForm()) {
                clearBooking();
                addBooking();
            } else {
                bookingSteps = 1;
            }
        }
    }
});

