var sql = require('mssql/msnodesqlv8');
const express = require('express');
const { emit } = require('nodemon');
var config = {
    connectionString: 'Driver=SQL Server;Server=PROCHESSOR\\SQLEXPRESS;Database=Evaluation;Trusted_Connection=true;'
};
const app = express();
const port = 8383;
let currentUser;


let accountInformation = [0, 0];

app.use(express.static('public'));
app.listen(port, () => console.log(`The server has started on port:${port}`));

app.get('/profile', (req, res) => {
    // Send the value of the global variable as the response
    sql.connect(config, err => {
        new sql.Request().query(`Select username, email, type, fName, lName, phone, country, url, experience, descriptionText, categoryName from Users join setup on Users.id=setup.fid where id=${currentUser.id};`, (err, result) => {
            if (result) {
                const data = result.recordset;
                res.status(200).json({ profile: data })
            }
            else {
                res.status(200).json({ profile: "Something went wrong" });
            }
        });
    });
});



app.get('/payment/', (req, res) => {
    console.log(accountInformation);
    // Send the value of the global variable as the response
    sql.connect(config, err => {
        new sql.Request().query(` Insert into project_details values(${accountInformation[0]}, ${accountInformation[1]})`, (err, result) => {
            console.log(err, result);
            if (result) {
                sql.connect(config, err => {
                    new sql.Request().query(` Update project set fid = ${accountInformation[1]} where pid = ${accountInformation[0]}`, (err, result) => {
                        console.log(err, result);

                        if (result) {
                            sql.connect(config, err => {
                                new sql.Request().query(` Update project set status = ${1} where pid = ${accountInformation[0]}`, (err, result) => {
                                    console.log(err, result);

                                    if (result) {
                                        sql.connect(config, err => {
                                            new sql.Request().query(` delete from notifications where pid = ${accountInformation[0]}`, (err, result) => {
                                                console.log(err, result);

                                                if (result) {
                                                    res.status(200).json({ status: "yes" });
                                                }
                                                else {
                                                    res.status(200).json({ status: "no" });
                                                }
                                            });
                                        })
                                    }
                                    else {
                                        res.status(200).json({ status: "no" });
                                    }
                                });
                            })
                        }
                        else {
                            res.status(200).json({ status: "no" });
                        }
                    });
                })
            }
            else {
                res.status(200).json({ status: "no" });
            }
        });
    })
});


app.get('/postInfoAcc/:dynamic', (req, res) => {
    // Send the value of the global variable as the response
    let { dynamic } = req.params;
    let data = dynamic.split(" ");
    accountInformation[0] = data[0]
    accountInformation[1] = data[1]
    res.status(200).json("Done!");
});
app.get('/setup', (req, res) => {
    // Send the value of the global variable as the response
    sql.connect(config, err => {
        new sql.Request().query(`Select * from setup where fid = ${currentUser.id}`, (err, result) => {
            if (result.recordset.length != 0) {

                const data = result.recordset;
                console.log(data);
                res.status(200).json({ setUpStatus: data })
            }
            else {
                res.status(200).json({ setUpStatus: "no" });
            }
        });
    });
});

app.get('/updateSetup/:dynamic', (req, res) => {
    // Send the value of the global variable as the response
    let { dynamic } = req.params;
    let data = dynamic.split("^");
    console.log(data);
    let fid = currentUser.id;
    let fname = data[0];
    let lname = data[1];
    let phone = data[2];
    let country = data[3];
    let url = data[4];
    let experience = data[5];
    let descriptionText = data[6];
    let categoryName = data[7];

    sql.connect(config, err => {
        new sql.Request().query(` Insert into setup values( ${fid}, '${fname}', '${lname}', '${phone}', '${country}', '${url}', ${experience}, '${descriptionText}', '${categoryName}');`, (err, result) => {
            if (result?.recordset?.length == 0) {
                const data = result.recordset;
                res.status(200).json({ setUpStatus: "yes" })
            }
            else {
                console.log(currentUser);

                console.log(err);
                res.status(200).json({ setUpStatus: "no" });
            }
        });
    });
});


app.get('/postproject/:dynamic', (req, res) => {
    // Send the value of the global variable as the response
    let { dynamic } = req.params;
    let data = dynamic.split("^");
    console.log(data);
    let i = 0;
    let projectId = data[i];
    let nameInput = data[i + 1];
    let amountInput = data[i + 2];
    let experienceSelect = data[i + 3];
    let selectedCategory = data[i + 4];
    let dueDateInput = data[i + 5];
    let commentsTextarea = data[i + 6];
    let descriptionTextarea = data[i + 7];
    let detailsTextarea = data[i + 8];
    sql.connect(config, err => {
        new sql.Request().query(`insert into project values(${projectId},'${nameInput}',${amountInput},'${experienceSelect}','${descriptionTextarea}','${commentsTextarea}','${detailsTextarea}','${dueDateInput}','${selectedCategory}',${currentUser.id},NULL,0);`, (err, result) => {
            console.log("res: ", result);
            if (result == undefined) {
                res.status(200).json({ projectStatus: "no" });
            }
            else {
                const data = result.recordset;
                console.log(data);
                res.status(200).json({ projectStatus: "yes" })
            }
        });
    });
});
app.get('/project', (req, res) => {
    sql.connect(config, err => {
        new sql.Request().query(`Select * from Project `, (err, result) => {
            if (result.recordset.length != 0) {
                console.log(result.recordset);
                res.status(200).json({ Projects: result.recordset });

            }
            else {
                res.status(200).json({ Projects: "No projects in the Marketplace" });
            }
        });
    });
});
app.get('/getUserId', (req, res) => {
    // Send the value of the global variable as the response
    console.log(currentUser);
    res.send(currentUser);
});

app.get("/User/:dynamic", (req, res) => {
    let { dynamic } = req.params;
    let data = dynamic.split(" ");
    let userEmail = data[0];
    let userPassword = data[1];
    sql.connect(config, err => {
        new sql.Request().query(`Select * from Users where email = '${userEmail}' and pass = '${userPassword}'`, (err, result) => {
            if (result) {
                const data = result.recordset;
                if (data.length == 0) {
                    res.status(200).json({ User: "Not Found" });
                }
                else {
                    currentUser = data[0];
                    console.log(currentUser);
                    res.status(200).json({ User: data })

                }
            }
            else {
                res.status(200).json({ User: "Not Found" });
            }
        });
    });
})


app.get("/freelancer", (req, res) => {
    sql.connect(config, err => {
        new sql.Request().query(`Select * from Users join setup on Users.id = setup.fid where type = 1`, (err, result) => {
            if (result.recordset.length != 0) {
                const data = result.recordset;
                res.status(200).json({ User: data })
            }
            else {
                res.status(200).json({ User: "Not Found" });
            }
        });
    });
})

app.get("/getnoti", (req, res) => {
    sql.connect(config, err => {
        new sql.Request().query(`Select * from Notification where reciever = ${currentUser.id}`, (err, result) => {
            if (result.recordset.length != 0) {
                const data = result.recordset;
                res.status(200).json({ Data: data })
            }
            else {
                res.status(200).json({ User: "No Notifications" });
            }
        });
    });
})



app.get("/Register/:dynamic", (req, res) => {
    let { dynamic } = req.params;
    let data = dynamic.split(" ");

    let id = data[0];
    let username = data[1];
    let userEmail = data[2];
    let userPassword = data[3];
    let userType = data[4];
    console.log(data);
    sql.connect(config, err => {

        new sql.Request().query(`insert into Users values (${id}, '${username}', '${userEmail}', '${userPassword}', ${userType})`, (err, result) => {
            console.log("Erro", err, "resu", result);
            if (!result) {
                res.status(200).json({ Register: "Please re enter the credentials" })
            }
            else {
                new sql.Request().query(`select* from Users where id=${id}`, (err, result) => {
                    let data = result.recordset;
                    currentUser = data[0];
                    res.status(200).json({ Register: data })

                });
            }

        });


    });
})

app.get("/addNot/:dynamic", (req, res) => {
    let { dynamic } = req.params;
    let data = dynamic.split(" ");

    let nid = data[0];
    let sender = data[1];
    let reciever = data[2];
    let pid = data[3]

    console.log(data);
    sql.connect(config, err => {
        new sql.Request().query(`insert into notification values (${nid},${sender},${reciever},${pid} )`, (err, result) => {
            console.log(result, err);
            if (!result) {
                res.status(200).json({ status: "Something went wrong" })
            }
            else {
                res.status(200).json({ status: "Success!" })

            }

        });


    });
})


app.get("/getFreelancer/:dynamic", (req, res) => {
    let { dynamic } = req.params;
    let data = dynamic.split(" ");

    sql.connect(config, err => {
        new sql.Request().query(`Select * from Users join setup on Users.id = setup.fid where id = ${data[0]}`, (err, result) => {
            if (result.recordset.length != 0) {
                const data = result.recordset;
                res.status(200).json({ User: data })
            }
            else {
                res.status(200).json({ User: "Not Found" });
            }
        });
    });
})



app.get("/getproject/:dynamic", (req, res) => {
    let { dynamic } = req.params;
    let data = dynamic.split(" ");
    sql.connect(config, err => {

        new sql.Request().query(`Select * from project  where pid = ${data[0]} `, (err, result) => {
            if (result.recordset.length != 0) {
                const data = result.recordset;
                res.status(200).json({ User: data })
            }
            else {
                res.status(200).json({ User: "Not Found" });
            }
        });
    });
})


// sql.on('error', err => { // Connection borked.
//     console.log(".:The Bad Place:.");
//     console.log("  Fork: " + err);
// });

// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
