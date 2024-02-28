'use strict';

const HOST = "http://127.0.0.1:8000"


// Elements
let addEmpButton = document.getElementById('addEmp');
const form = document.querySelector(".form");
const cancelButton = document.querySelector(".cancel");
const empBox = document.getElementById("empBox");

// Get all Employees
async function getEmployees() {
    const response = await fetch(`${HOST}/getall/`);
    const employees = await response.json();
    return employees;
}


// Update Employee
async function updateEmployee(employee) {
    const response = await fetch(`${HOST}/update/${employee.id}/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(employee)
    });
    const data = await response.json();
    return data;
}

// Delete Employee
async function deleteEmployee(id) {
    const response = await fetch(`${HOST}/delete/${id}/`, {
        method: 'DELETE'
    });
    const data = await response.json();
    return data;
}

// Create Employee
async function createEmployee(employee) {
    const response = await fetch(`${HOST}/add?name=${employee.name}&emp_id=${employee.empId}&salary=${employee.sal}&address=${employee.add}&mobile_number=${employee.mob}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
    });
    const data = await response.json();
    return data;
}




// Load Employee Card when browser refreshed
async function loadCards() {
    // Clear Previous Cards
    empBox.innerHTML = '<img id="addEmp" src="assets/add.svg" alt="Add Employee" class="addEmp">';
    addEmpButton = document.getElementById('addEmp');

    return await getEmployees().then(employees => {
        employees = employees.employees;
        employees.forEach(employee => {
            let card = getCard(
                employee[0],
                employee[1],
                employee[2],
                employee[3],
                employee[4],
                employee[5]
            )

            addEmpButton.insertAdjacentHTML('beforebegin', card);
        });
    })
}

function getCard(id, name, empId, sal, add, mob) {
    return `
    <div class="empCard" id="${id}">
                <img src="assets/editSvg.svg" alt="edit icon" class="editIcon">
                <div class="empUp">
                    <img src="assets/avatar.svg" alt="" class="avatar">
                    <p class="name">${name}</p>
                    <p class="userId">${empId}</p>
                </div>
                <div class="empInfo">
                    <p class="sal">salary</p>
                    <p class="salVal">${sal}</p>
                    <p class="add">Address</p>
                    <p class="addVal">${add}</p>
                    <p class="Mob">Mobile</p>
                    <p class="mobVal">${mob}</p>
                </div>
    </div>
    `
}

loadCards();

// Create and Update Employee
const createEmpBtn = document.getElementById('updateBtn');

createEmpBtn.addEventListener('click', () => {
    const empName = document.querySelector('.form .newName').value;
    const empId = document.querySelector('.form .newId').value;
    const empSal = document.querySelector('.form .newSal').value;
    const empAdd = document.querySelector('.form .newAdd').value;
    const empMob = document.querySelector('.form .newMob').value;

    const employee = {
        name: empName,
        emp_id: empId,
        salary: empSal,
        address: empAdd,
        mobile_number: empMob
    }

    cancelButton.click();

    createEmployee(employee).then(() => {
        loadCards();
    });
});


// // Delete Employee
// const deleteEmpBtn = document.getElementById('deleteEmpBtn');

// deleteEmpBtn.addEventListener('click', () => {
//     const empId = document.getElementById('empId').value;
//     deleteEmployee(empId).then(() => {
//         loadCards();
//     });
// });


// Add Employee
addEmpButton.addEventListener("click", () => {
    form.classList.remove("hidden");
})

cancelButton.addEventListener("click", () => {
    form.classList.add("hidden");
})
