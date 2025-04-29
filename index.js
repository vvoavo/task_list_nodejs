//Підключаємо залежність express
var express = require("express");
//Підключаємо залежність body-parser
var bodyParser = require("body-parser");
//Викликаємо express
var app = express();
//Вмикаємо body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//Налаштовуємо обробник шаблонів
app.set("view engine", "ejs");
//Визначаємо початковий масив доданих завдань
var task = ["Опанувати JavaScript", "Опанувати Node.js"];
//Визначаємо маршрут публікації для додавання нового завдання
//в масив доданих завдань
app.post("/addnewtask", function (req, res) {
    var newTask = req.body.newtask;
    //Додаємо нове завдання з маршруту публікації в масив доданих завдань
    task.push(newTask);
    //Повертаємося до маршруту root(/)
    res.redirect("/");
});
//Відображаємо index.ejs і додані завдання
app.get("/", function (req, res) {
    res.render("index", { task: task });
});
//Налаштовуємо сервер для прослуховування порту 3000
app.listen(3000, function () {
    console.log("Сервер працює на порту 3000!");
});
