const faker = require('faker');
const express = require("express");
const con = require("./connection ");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());

app.post("/", (req, res) => {
    const allUser = [];
    for (let i = 0; i < 500000; i++) {
        const firstname = faker.name.firstName();
        const lastname = faker.name.lastName();
        const number = faker.phone.phoneNumber();

        const data = {
            firstname: firstname,
            lastname: lastname,
            number: number,
        };
        allUser.push(data);
    }
    console.log(allUser);

    allUser.map(async (item) => {
        await con.query(`insert into fake set ?`, item, (err, result) => {
            // conn.release();
            if (err) {
                console.log(err);
            } else {
                res.writeContinue(result);
            }
        });
    });
});
app.get('/', (req, res) => {
    con.query("select * from fake", (err, result) => {
        if (err) {
            console.warn("some error")
        }
        else {
            console.warn(result)
            res.send(result)
        }
    })
})

// console.log(data)
// res.writeHead(200, { 'Content-Type': 'application/json' });
// res.write(JSON.stringify(data));
// res.end();


app.listen(4300, () => {
    console.log(`Server is up and running on 4300 ...`);
});







// Number: faker.phone.phoneNumber()