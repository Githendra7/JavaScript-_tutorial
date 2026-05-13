const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\d{10}$/;
const pincodePattern = /^\d{6}$/;

function validateForm() {
    const f = document.registrationForm;

    // Required fields check
    const requiredFields = [
        { name: 'firstName', label: 'First Name' },
        { name: 'lastName', label: 'Last Name' },
        { name: 'dob', label: 'Date of Birth' },
        { name: 'gender', label: 'Gender' },
        { name: 'bloodGroup', label: 'Blood Group' },
        { name: 'nationality', label: 'Nationality' },
        { name: 'category', label: 'Category' },
        { name: 'aadhar', label: 'Aadhar Number' },
        { name: 'email', label: 'Email' },
        { name: 'phone', label: 'Phone Number' },
        { name: 'emergencyName', label: 'Emergency Contact Name' },
        { name: 'emergencyPhone', label: 'Emergency Contact Phone' },
        { name: 'address1', label: 'Address Line 1' },
        { name: 'city', label: 'City' },
        { name: 'state', label: 'State' },
        { name: 'pincode', label: 'Pincode' },
        { name: 'course', label: 'Course' },
        { name: 'department', label: 'Department' },
        { name: 'year', label: 'Year of Study' },
        { name: 'semester', label: 'Semester' },
        { name: 'roll', label: 'Roll Number' },
        { name: 'regNo', label: 'Registration Number' },
        { name: 'school', label: 'Previous School' },
        { name: 'board', label: 'Previous Board' },
        { name: 'percentage', label: 'Percentage' },
        { name: 'fatherName', label: 'Father Name' },
        { name: 'fatherOccupation', label: 'Father Occupation' },
        { name: 'fatherPhone', label: 'Father Phone' },
        { name: 'motherName', label: 'Mother Name' },
        { name: 'income', label: 'Annual Income' },
        { name: 'hostel', label: 'Hostel Requirement' },
        { name: 'transport', label: 'Transport Requirement' },
        { name: 'scholarship', label: 'Scholarship' },
        { name: 'laptop', label: 'Laptop Availability' },
        { name: 'internet', label: 'Internet Access' }
    ];

    for (let field of requiredFields) {
        if (!f[field.name].value || f[field.name].value.trim() === "") {
            alert("Please enter " + field.label);
            f[field.name].focus();
            return false;
        }
    }

    // Pattern validations
    if(!emailPattern.test(f.email.value)) {
        alert("Enter Valid Email Address");
        f.email.focus();
        return false;
    }

    if(!phonePattern.test(f.phone.value)) {
        alert("Enter Valid 10-digit Phone Number");
        f.phone.focus();
        return false;
    }

    if(!phonePattern.test(f.emergencyPhone.value)) {
        alert("Enter Valid 10-digit Emergency Phone Number");
        f.emergencyPhone.focus();
        return false;
    }

    if(!phonePattern.test(f.fatherPhone.value)) {
        alert("Enter Valid 10-digit Father Phone Number");
        f.fatherPhone.focus();
        return false;
    }

    if(!pincodePattern.test(f.pincode.value)) {
        alert("Enter Valid 6-digit Pincode");
        f.pincode.focus();
        return false;
    }

    if(!f.declaration.checked) {
        alert("Please accept the declaration to proceed.");
        return false;
    }

    alert("Registration Form Submitted Successfully!");
    return true;
}