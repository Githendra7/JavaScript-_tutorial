const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10}$/;
const pincodePattern = /^\d{6}$/;
const aadharPattern = /^\d{12}$/;

function validateForm(event) {
    const f = document.registrationForm;
    let errors = [];

    const check = (value, message, fieldName) => {
        if (!value || value.trim() === "") {
            errors.push({ msg: message, field: fieldName });
            return false;
        }
        return true;
    };

    check(f.firstName.value, "First Name is required", "firstName");
    check(f.lastName.value, "Last Name is required", "lastName");
    check(f.dob.value, "Date of Birth is required", "dob");

    if (!f.gender.value) {
        errors.push({ msg: "Please select your Gender", field: "gender" });
    }

    check(f.bloodGroup.value, "Blood Group is required", "bloodGroup");
    check(f.nationality.value, "Nationality is required", "nationality");
    check(f.category.value, "Category is required", "category");

    if (!aadharPattern.test(f.aadhar.value)) {
        errors.push({ msg: "Enter a valid 12-digit Aadhar Number", field: "aadhar" });
    }

    if (!emailPattern.test(f.email.value)) {
        errors.push({ msg: "Enter a valid Email Address", field: "email" });
    }

    if (!phonePattern.test(f.phone.value)) {
        errors.push({ msg: "Enter a valid 10-digit Phone Number", field: "phone" });
    }

    check(f.emergencyName.value, "Emergency Contact Name is required", "emergencyName");

    if (!phonePattern.test(f.emergencyPhone.value)) {
        errors.push({ msg: "Enter a valid 10-digit Emergency Phone Number", field: "emergencyPhone" });
    }

    check(f.address1.value, "Address is required", "address1");
    check(f.city.value, "City is required", "city");
    check(f.state.value, "State is required", "state");

    if (!pincodePattern.test(f.pincode.value)) {
        errors.push({ msg: "Enter a valid 6-digit Pincode", field: "pincode" });
    }


    check(f.course.value, "Course is required", "course");
    check(f.department.value, "Department is required", "department");
    check(f.year.value, "Year of Study is required", "year");
    check(f.roll.value, "Roll Number is required", "roll");
    check(f.school.value, "Previous School/College is required", "school");

    check(f.fatherName.value, "Father's Name is required", "fatherName");
    check(f.motherName.value, "Mother's Name is required", "motherName");
    check(f.income.value, "Annual Income is required", "income");


    if (!f.hostel.value) errors.push({ msg: "Select Hostel Requirement", field: "hostel" });
    if (!f.transport.value) errors.push({ msg: "Select Transport Requirement", field: "transport" });
    if (!f.scholarship.value) errors.push({ msg: "Select Scholarship Preference", field: "scholarship" });


    if (!f.declaration.checked) {
        errors.push({ msg: "You must accept the declaration to proceed", field: "declaration" });
    }

    if (errors.length > 0) {

        alert(errors[0].msg);


        const firstErrorField = f[errors[0].field];
        if (firstErrorField && typeof firstErrorField.focus === "function") {
            firstErrorField.focus();
        } else if (Array.isArray(firstErrorField)) {

            firstErrorField[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        event.preventDefault();
        return false;
    }

    alert("Registration Form Submitted Successfully!");
    return true;
}