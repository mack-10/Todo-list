import express from "express";

const app = express();

app.set("port", process.env.PORT || 3000);
app.set("view engine", "ejs");

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

app.listen(app.get("port"), () => {
	console.log("Server Up and Running");
});
