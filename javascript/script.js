function date_has_error(error_message) {
    document.getElementById("dob-error").innerText = error_message
    document.getElementById("dob-error").style.display = "block"
    document.getElementById("dob").style.border = "1px solid #c00"
}

/**
* Get the day of the week from the given date
* @param {object} date
* 
* @return
*/
function getDayOfTheWeekFromDate(date)
{
	const d = new Date(date +" 00:00:00"); 	//get the right date format + time
	let day = d.getDay(); 					//get the day of the week; 0=Sunday, 
	return	day; 							//return
}

document.getElementById("find-akan-name").addEventListener("submit", function (event) {
    event.preventDefault();

    document.getElementById("answer").style.display = "none"
    document.getElementById("gender-error").innerText = ""
    document.getElementById("gender-error").style.display = "none"
    document.getElementById("gender").style.border = "1px solid #0c0"

    document.getElementById("dob-error").innerText = ""
    document.getElementById("dob-error").style.display = "none"
    document.getElementById("dob").style.border = "1px solid #0c0"

    const dob = document.getElementById("dob").value;
    const gender = document.getElementById("gender").value;
    if (!gender) {
        document.getElementById("gender-error").innerText = "Please select gender"
        document.getElementById("gender-error").style.display = "block"
        document.getElementById("gender").style.border = "1px solid #c00"
    }

    if (!dob) {
        date_has_error("Please enter Date of Birth")
    }
    if (gender && dob) {
        const dates = dob.split("-");
        if (isNaN(dates[0]) || parseInt(dates[0]) < 1 ||  parseInt(dates[0]) > 31) {
            date_has_error("Invalid date! Enter date between 1 to 31");
            return;number
        
        }
        if (isNaN(dates[1]) || parseInt(dates[1]) < 1 || parseInt(dates[1]) > 12) {
            date_has_error("Invalid Month! Enter a month between 1 to 12")
            return;
        }
        if (isNaN(dates[2])) {
            date_has_error("Year should be a valid number")
            return;
        }

                
        /**additional checks for Feb */
        //check if it's Feb, it's a leap year and days are more than 29
        if (parseInt(dates[1]) === 2 && parseInt(dates[2]) % 4 === 0 && parseInt(dates[0]) > 29) {
            date_has_error("Invalid date! February date should not exceed 29 for a leap year!");
            return; 
        }

         //check if it's Feb, it isn't a leap year and days are more than 28
        if (parseInt(dates[1]) === 2 && parseInt(dates[2]) % 4 !== 0 && parseInt(dates[0]) > 28) {
            date_has_error("Invalid date! February date should not exceed 28 for a non-leap year!");
            return; 
        }

        /*

        if (dates[2] > 2022) {
            date_has_error("Year should be less than or equal 2022")
            return;
        }
       */
      
        const DD = parseInt(dates[0]);
        let MM = parseInt(dates[1]);
        let YY = parseInt(dates[2]);



        let CC;
        if (YY <= 100) {
            CC = 1;
        } else if (YY % 100 == 0) {
            CC = Math.floor(YY / 100)
        } else {
            CC = Math.floor(YY / 100 + 1)
        }
        
        const male_names = ["Kwasi", "Kwadwo", "Kwabena", "Kwaku", "Yaw", "Kofi", "Kwame"];
        const female_names = ["Akosua", "Adwoa", "Abenaa", "Akua", "Yaa", "Afua", "Ama"];

       // const day_of_the_week = Math.floor((((CC / 4) - 2 * CC - 1) + ((5 * YY / 4)) + ((26 * (MM + 1) / 10)) + DD) % 7);


        let formattedDate = dates[2]+ "-" + dates[1] + "-" + dates[0];
        const day_of_the_week = parseInt(getDayOfTheWeekFromDate(formattedDate));
      
       
        let name;
        if (gender === "m") {
            name = male_names[day_of_the_week];
        } else {
            name = female_names[day_of_the_week];
        }
        document.getElementById("answer-text").innerText = "Your Akan name is " + name;
        document.getElementById("answer").style.display = "block"

    }
});
