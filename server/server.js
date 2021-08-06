const express = require("express")
const cors = require('cors')
const bcrypt = require('bcrypt')
const bodyParser = require("body-parser");
const mysql = require("mysql");
const jwt = require("jsonwebtoken")
const app = express()
const saltRounds = 10


 
app.use(cors({credentials: true, origin: 'https://flamboyant-engelbart-9a0051.netlify.app', optionsSuccessStatus: 200, methods: ["GET", "POST", "DELETE"]}))
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.json())

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

app.post("/register", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;

    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) {
            console.log(err)
        }
        db.query("INSERT INTO users (username, email, password) VALUES (?,?,?)",
        [username, email, hash],
        (err, result) => {
            if (err) {
                console.log(err)
            }else {
                console.log(result)
            }
        } 
        )
    })
})

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    db.query("SELECT * FROM users WHERE email = ?",
    [email],
    (err, result) => {
        if (err) {
            res.send({ err: err})}
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password, (error, response) => {
                if (response) {
                    const id = result[0].userID
                    const token = jwt.sign({id}, "jwtSecret", {expiresIn: 1})
                    res.json({auth: true, token: token, result: result, userId: id});
                }else {
                    res.json({ auth: false, message: "Wrong username/password" })
                }})
        }else {
            res.json({ auth: false, message: "User does not exist" })
        }}
    )
})


app.post("/message", (req, res) => {
    const message = req.body.message
    const userID = req.body.userID
    const contactID = req.body.contactID
    db.query("INSERT INTO messages (message, time_sent, userID, contactID) values (?, NOW(), ?, ?)",
    [message, userID, contactID],
    (err, result) => {
        err ? console.log(err) : res.json(result)
    }
)})

app.post("/get_messages", (req, res) => {
    const currentUser = req.body.currentUser
    const contactID = req.body.contactID
    db.query("SELECT * FROM messages LEFT JOIN users ON users.userID = ? WHERE (messages.userID = ? AND messages.contactID = ? OR messages.userID = ? and messages.contactID = ?) ORDER BY (time_sent) DESC LIMIT 1",
    [contactID, currentUser, contactID, contactID, currentUser],
    (err, result) => {
        if (err) {
            res.json({err: err})
            console.log(err)
        }else {
            res.json({result: result})
        }
    })
})

app.post("/get_contactIDs", (req, res) => {
    const {currentUser} = req.body
    db.query("SELECT DISTINCT * FROM (SELECT DISTINCT userID FROM messages WHERE contactID = ? UNION SELECT distinct contactID FROM messages WHERE userID = ?) t",
    [currentUser, currentUser],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.json(result)
        }
    })
})

app.post("/getconvomessages", (req, res) => {
    const activeUser = req.body.activeUser
    const userID = req.body.userID
    db.query("SELECT * FROM messages LEFT JOIN users ON users.userID = ? WHERE (messages.contactID = ? AND messages.userID = ? OR messages.contactID = ? AND messages.userID = ?) ORDER BY (time_sent) ASC", 
    [activeUser, activeUser, userID, userID, activeUser],
    (err, result) => {
        if (err) {
            console.log(err)
        }else {
            res.json(result)
        }
    })
})

app.post("/getAllUsersContacts", (req, res) => {
    const currentUser = req.body.currentUser
    db.query("SELECT username, userID FROM users WHERE (userID != ?)",
    [currentUser],
    (err, result) => {
        err ? console.log(err) : res.json(result)
    })
})

app.get("/", (req, res) => res.send("Hello World"))

app.listen(process.env.PORT || 3002, () => {
    console.log("running " )
})
