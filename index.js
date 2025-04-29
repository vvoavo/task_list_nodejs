//Підключаємо залежність express
var express = require("express");
//Підключаємо залежність body-parser
var bodyParser = require("body-parser");
//Викликаємо express
var app = express();
//Надаємо доступ до папки public
app.use(express.static("public"));
//Вмикаємо body-parser
app.use(bodyParser.urlencoded({ extended: true }));
//Налаштовуємо обробник шаблонів
app.set("view engine", "ejs");
//Визначаємо початковий масив доданих завдань
var task = ["Опанувати JavaScript", "Опанувати Node.js"];
//Визначаємо початковий масив виконаних завдань
var complete = ["Опанувати HTML та CSS", "Опанувати Git та GitHub"];
//Визначаємо маршрут публікації для додавання нового завдання
//в масив доданих завдань
app.post("/addnewtask", function (req, res) {
    var newTask = req.body.newtask;
    //Додаємо нове завдання з маршруту публікації в масив доданих завдань
    task.push(newTask);
    //Повертаємося до маршруту root(/)
    res.redirect("/");
});
//Визначаємо маршрут публікації для переміщення нового відміченого як виконане
//завдання у масив виконаних завдань
app.post("/movetocompletetask", function (req, res) {
    var completeTask = req.body.check;
    //Перевіряємо наявність нового відміченого як виконане завдання і
    //додаємо його до масиву виконаних завдань
    if (typeof completeTask === "string") {
        complete.push(completeTask);
        //Перевіряємо, чи нове відмічене як виконане завдання вже виходить у
        //масив виконаних завдань і вилучаємо його з масиву доданих завдань
        task.splice(task.indexOf(completeTask), 1);
    } else if (typeof completeTask === "object") {
        for (var i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    //Повертаємося до маршруту root(/)
    res.redirect("/");
});
//Відображаємо index.ejs, додані і виконані завдання
app.get("/", function (req, res) {
    res.render("index", { task: task, complete: complete });
});
//Налаштовуємо сервер для прослуховування порту 3000
app.listen(3000, function () {
    console.log("Сервер працює на порту 3000!");
});
