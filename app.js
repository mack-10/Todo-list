import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import TodoTask from "./models/TodoTask.js";

const app = express();
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

//MONGOOSE
// mongoose.set("useFindAndModify", false);
mongoose
	.connect(process.env.DB_CONNECT)
	.then(() => {
		console.log("Connected to db!");
		app.listen(app.get("port"), () => {
			console.log("Server Up and Running");
		});
	});



// VIEW ENGINE CONFIGURATION
// 경로는 절대경로로 해주는게 좋다.
// app.use("/static", express.static(__dirname + "/public"));
app.use("/static", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));


// POST METHOD: 서버에 자원을 새로 등록하고자 할 때 사용.
// CREATE
app.post("/", (req, res) => {
	const todoTask = new TodoTask ({
		content: req.body.content
	});

	todoTask.save()
		.then (() => {
			res.redirect("/");
		})
		.catch ((err) => {
			res.redirect("/");
		});
});


// GET METHOD: 서버 자원을 가져오고자 할 때 사용.
// READ
app.get("/", (req, res) => {
	TodoTask.find({}) // find all documents
		.then((tasks) => {
			res.render("todo.ejs", { todoTasks: tasks });
		})
		.catch ((err) => {
			console.log(err);
		});
});



// UPDATE
app
	.route("/edit/:id")
	.get((req, res) => {
		const id = req.params.id;

		TodoTask.find({})
			.then((tasks) => {
				res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
			})
			.catch ((err) => {
				console.log(err);
			});
	})
	.post ((req, res) => {
		const id = req.params.id;

		TodoTask.findByIdAndUpdate(id, { content: req.body.content })
			.catch ((err) => {
				if (err)
					return res.send(500, err);
				res.redirect("/");
			});
	});


// DELETE
app
	.route("/remove/:id")
	.get ((req, res) => {
		const id = req.params.id;

		TodoTask.findByIdAndDelete(id)
			.then (() => {
				res.redirect("/");
			})
			.catch ((err) => {
				if (err)
					return res.send(500, err);
				res.redirect("/");
			});
	});
