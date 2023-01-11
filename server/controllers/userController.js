const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "admin",
  database: "infosys"
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM spring ', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from spring table: \n', rows);
  });
}

// View Users
exports.sal = (req, res) => {
    // User the connection
    connection.query('SELECT * FROM spring WHERE salary > 12000', (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        let removedUser = req.query.removed;
        res.render('sal', { rows, removedUser });
      } else {
        console.log(err);
      }
      console.log('The data from spring table: \n', rows);
    });
  }

  
// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  connection.query('SELECT * FROM spring WHERE  dep LIKE ? OR salary LIKE ? ', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('home', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from spring table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('add-user');
}

// Add new user
exports.create = (req, res) => {
  const { name, des,dep,salary,location } = req.body;
  let searchTerm = req.body.search;

  // User the connection
  connection.query('INSERT INTO spring SET name = ?, des = ?, dep = ?, salary = ?, location = ?', [name, des,dep,salary,location], (err, rows) => {
    if (!err) {
      res.render('add-user', { alert: 'User added successfully.' });
    } else {
      console.log(err);
    }
    console.log('The data from spring table: \n', rows);
  });
}


// Edit user
exports.edit = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM spring WHERE empid = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from spring table: \n', rows);
  });
}


// Update User
exports.update = (req, res) => {
  const { name, des,dep,salary,location } = req.body;
  // User the connection
  connection.query('UPDATE spring SET name = ?, des = ?, dep = ?, salary = ?, location = ? WHERE empid = ?', [name, des,dep,salary,location, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM spring WHERE empid = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from spring table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from spring table: \n', rows);
  });
}


// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM spring WHERE empid = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from spring table: \n', rows);
  });

}

// Delete User
exports.delete = (req, res) => {

  // Delete a record
  // User the connection
  connection.query('DELETE FROM spring WHERE empid = ?', [req.params.id], (err, rows) => {

     if(!err) {
      let removedUser = encodeURIComponent('Employee successeflly removed.');
       res.redirect('/');
     } else {
      console.log(err);
     }
     console.log('The data from spring table: \n', rows);

   });

}

