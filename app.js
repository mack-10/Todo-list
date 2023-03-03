import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
dotenv.config();

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
app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
	res.render('todo.ejs');
})

// POST METHOD
// When there's post signal, show the request's body
app.post("/", (req, res) => {
	console.log(req.body);
});
