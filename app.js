const express = require("express");
const app = express();

const db = require("./config/db");

app.get("/", (req, res) => res.send("respon nodejs berhasil untuk test Online Orenda"));

app.use(express.urlencoded({
  extended: true
}));

//   jika lancar tekonek ke database
db.authenticate().then(() =>
  console.log("berhasil terkoneksi dengan database")
);

const User = require("./models/User");

app.post("/register", async (req, res) => {
  try {
    //   destructuring object
    const {
      username,
      email,
      task
    } = req.body;

    // initialize models database
    const newUser = new User({
      username,
      email,
      task
    });

    // await = menjalankan kode models user
    await newUser.save();

    // menampilkan newuser ketika di save postman
    res.json(newUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});


// menampilkan semua data yang ada di tabel user
app.get("/user", async (req, res) => {
  try {
    const getAllUser = await User.findAll({});

    res.json(getAllUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// menampilkan data yang ada di tabel user sesuai dengan id
app.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const getUser = await User.findOne({
      where: {
        id: id
      }
    });

    res.json(getUser);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// menghapus data yang ada di tabel user sesuai dengan id
app.delete("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleteUser = await User.destroy({
      where: {
        id: id
      }
    });

    await deleteUser;

    res.json("berhasil di hapus");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// edit data yang ada di tabel user sesuai dengan id

app.put("/user/:id", async (req, res) => {
  try {
    const {
      username,
      email,
      task
    } = req.body;
    const id = req.params.id;

    const updateUser = await User.update({
      username,
      email,
      task
    }, {
      where: {
        id: id
      }
    });

    await updateUser;

    res.json("berhasil di update");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

app.listen(8080, () => console.log("port bejalan di 8080"));