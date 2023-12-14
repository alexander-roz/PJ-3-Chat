// Отправка имени по клику кнопки submit или с помощью enter + проверка на заполненность поля name:
function submitForm() {
    let name = document.getElementById("name").value;
    sessionStorage.setItem("name", name);
    console.log(name);

    if (name != '') {
        location.href = "index.html";
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
    document.getElementById('name').removeAttribute('readonly');  // Удаление атрибута readonly (только для чтения) после загрузки страницы
});