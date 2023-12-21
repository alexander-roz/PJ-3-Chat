// Отправка имени по клику кнопки submit или с помощью enter + проверка на заполненность поля name:
let activeUser;

function submitForm() {
    let name = document.getElementById("name").value;
    sessionStorage.setItem("name", name);
    console.log(name);

    if (name !== '') {
        activeUser = name;
        addUser();
        location.href = "index";

    } else {
        alert("Enter your name!");
    }
}

document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        submitForm();
    }
});


// стираем символы в поле name при нажатии на кнопку "назад" или при обновлении страницы
window.addEventListener('DOMContentLoaded', function () {
    document.getElementById('name').removeAttribute('readonly');// Удаление атрибута readonly (только для чтения) после загрузки страницы
});

function addUser() {
    let user = document.getElementById("name").value;

    fetch("/users/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name: user
        })
    })
        .then(response => response.json())
        .catch(error => console.error(error));
}