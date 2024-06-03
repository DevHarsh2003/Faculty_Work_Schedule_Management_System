const express = require('express');
const mysql=require("mysql")
const bodyparser=require('body-parser');
const app = express();
const session=require('express-session');
const weekday=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const d=new Date();
let day=weekday[d.getDay()];
app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');

const con=mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"",
  database:"timetable"
  
});
con.connect(()=>{
  console.log("Connected")
});
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized:true
}));

app.get('/',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  const date=d.toLocaleDateString();
  const time=d.toLocaleTimeString();
  const sql1=`SELECT name,id from users order by id ASC`;
  const sql2=`SELECT * FROM tableview,users where users.name=tableview.faculty and tableview.day=? ORDER by users.id ASC,tableview.period ASC`;
  const values=["monday"];
  con.query(sql1,(err1,data1)=>{
    if(err1){
      console.error(err1);
      return;
    }
    con.query(sql2,values,(err2,data2)=>{
      if(err2){
        console.error(err2);
        return;
      }
      res.render('Todaytimetable',{data1:data1,data2:data2,l1:data1.length,l2:data2.length,date:date,time:time,day:day});
    });
  });
});

// Signup Url
app.get('/signup',function(req,res){
  app.set('views', __dirname + '/views');
  res.setHeader('Content-Type', 'text/html');
  res.render('Signup.ejs');
});

// Posting SignUp Form Data
app.post('/signup',(req,res)=>{
    const formdata=req.body;
    const {id,name,email,password}=formdata;
    const sql = `SELECT * FROM users WHERE id = ${id}`;
     
    con.query(sql, (err, data) => {

        app.set('views', __dirname + '/views');

        if (err) {
            console.error(err);
            return;
        }

        if (data.length > 0) {
            res.send("<script>alert('User Exists');window.location='/signup';</script>");
        } 

        else{
            const insertSql = 'INSERT INTO users (id, name, email, password) VALUES (?, ?, ?, ?)';
            const values = [id, name, email, password];
            con.query(insertSql, values, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            });
            res.send("<script>alert('SignUp Successful');window.location='/login';</script>");
        }   
    });
});

// Login Url
app.get('/login',function(req,res){
  app.set('views',__dirname+'/views');
  res.setHeader('Content-Type','text/html');
  res.render('Login.ejs');
});

// Posting Login Form Data And Verification
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const sql = `SELECT * FROM users WHERE email = '${email}' LIMIT 1`;
    con.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
       
    if(data.length == 0) {
      res.send("<script>alert('User Not found');window.location='/signup';</script>");
    }
  
     else {
        const user = data[0];
        
        if (user.password === password) {
          req.session.username=user.name;
          res.redirect('/home');
        }
        else {
          res.send("<script>alert('Incorrect Password');window.location='/login';</script>");
        }
    }
    });
  });

// User Dashboard
app.get('/home',function(req,res){
    const username=req.session.username;
    if(username){
      res.render('Home',{username:username});
    }
    else{
      res.redirect('/');
    }
});

// Admin Login From Login Page
app.get('/adminlogin',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  res.render('Adminlogin.ejs');
});

// Admin Login Verification Page
app.post('/adminlogin',function(req,res){
  const { email, password } = req.body;
    const sql = `SELECT * FROM admin WHERE email = '${email}' LIMIT 1`;
    con.query(sql, (err, data) => {
      if (err) {
        console.error(err);
        return;
      }
     if(data.length > 0) {
        const user = data[0];
        
        if (user.password === password) {
          req.session.username=user.name;
          res.redirect('/admin');
        }
        else {
          res.send("<script>alert('Incorrect Password');window.location='/adminlogin';</script>");
        }
    }
    });
});

// User Page Day Timetable
app.get('/day',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  const username=req.session.username;
  if(username){
    const sql=`SELECT * from tableview where faculty=? and day=? order by day`;
    const values=[username,day];
    con.query(sql,values,(err,data)=>{
      if(err){
        console.error(err);
        return;
      }
      res.render('Day',{user:data,l:data.length,d:d,day:day,username:username});
    });
    }
    else{
      res.redirect('/');
    }
});

//User Page Week Timetable
app.get('/week',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  const username=req.session.username;
  console.log(username);
  if(username){
    const sql=`SELECT * from tableview where faculty=? order by day`;
    const values=[username];
    con.query(sql,values,(err,data)=>{
    res.render('Week',{table:data,l:data.length});
    console.log(data);
    });
  }
  else{
    res.redirect('/');
  }
});

// User Page Look At Timetable
app.get('/look',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  const username=req.session.username;
  if(username){
    res.render('Look.ejs');
  }
  else{
    res.redirect('/');
  }
});

// Posting Data From Look Page To Get Looktable Page
app.post('/looktable',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  const username=req.session.username;
  if(username){
    const {year,section}= req.body;
    const sql= `SELECT * from tableview where year=? and class=? ORDER by day`;
    const values=[year,section];
    con.query(sql,values,(err,data) =>{
      if(err){
        console.error(err);
        return;
      }
      res.render('Looktable.ejs',{table: data, l: data.length});
    });
  }
  else{
    res.redirect('/');
  }
});

// User Page To Get Apply Leave Page
app.get('/leave',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  res.render('Applyforleave.ejs');
});

// User Page To Apply Page To Apply Leave
app.post('/leave',function(req,res){
  const username=req.session.username;
  const {date} =req.body;
  const dt=new Date(date);
  const mdate=dt.toLocaleDateString();
  let lday=weekday[dt.getDay()];
  const cdate = d.toLocaleDateString();
  const ctime = d.toLocaleTimeString();
  if(username){
    const sql=`INSERT into leaves (faculty,ldate,lday,cdate,ctime) values (?,?,?,?,?)`;
    const values=[username,mdate,lday,cdate,ctime];
    con.query(sql,values,(err)=>{
      if(err){
        console.error(err);
        return;
      }
      res.send("<script>alert('Applied For Leave');window.location='/home';</script>");
    });
  }
  else{
    res.redirect('/');
  }
});

// User Page To My Applied Leaves Page
app.get('/appliedleaves',function(req,res){
  const username=req.session.username;
   if(username){
    const sql=`SELECT * from leaves where faculty=? order by cdate DESC,ctime DESC`;
    const values=[username];
    con.query(sql,values,(err,data)=>{
      if(err){
        console.error(err);
        return;
      }
      res.render('Appliedleaves',{data: data,l:data.length});
    });
   }
});

// Admin Dashboard
app.get('/admin',function(req,res){
  const username=req.session.username;
  if(username){
  res.render('Admin.ejs',{username: username});
  }
  else{
    res.redirect('/adminlogin');
  }
});

// Admin Page Display Timetable
app.get('/display',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  res.render('Display.ejs');
});

//Posting Data From Display Timetable Of Admin Page To Get Displaytable Page
app.post('/displaytable',function(req,res){
  const {year,section}= req.body;
  const sql= `SELECT * from tableview where year=? and class=? ORDER by day`;
  const values=[year,section];
  con.query(sql,values,(err,data) =>{
    if(err){
      console.error(err);
      return;
    }
    res.render('Displaytable.ejs',{table: data, l: data.length});
  });
});

// Admin Page Add Timetable
app.get('/add',function(req,res){
  const sql = `SELECT name from users`;
  con.query(sql,(err,data)=>{
    if(err){
      console.error(err);
      return;
    }
    res.render('Add',{users : data, l : data.length});
  });
});

// Posting Data From Add Page To Database
app.post('/add',function(req,res){
  const {year,section,subject,faculty,day,period} = req.body;
  const sql = `INSERT into tableview (year,day,faculty,subject,class,period) values (?,?,?,?,?,?) `;
  const values=[year,day,faculty,subject,section,period];
  con.query(sql, values, (err) =>{
    if(err){
      console.error(err);
      return;
    }
  });
  res.redirect('/add');
});

// Admin Page Delete Timetable
app.get('/delete',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  res.render('Delete.ejs');
});

// Posting Data From Delete Page To Delete Record From Database
app.post('/delete',function(req,res){
  const {year,section,day,period}= req.body;
  const sql="DELETE from tableview where year=? and class=? and day=? and period=?";
  const values=[year,section,day,period];
  con.query(sql, values,(err) =>{
    if(err){
      console.error(err);
      return;
    }
    res.redirect('/delete');
  })
});

// Admin Page Display Faculty List
app.get('/displayfaculty',function(req,res){
  const sql="SELECT name,id from users order by id";
  con.query(sql,(err,data) =>{
    if(err){
      console.error(err);
      return;
    }
    res.render('Displayfaculty',{user: data,l: data.length});
  });
});

// Admin Page To Proposal Page
app.get('/proposal',function(req,res){
  app.set('views',__dirname + '/views');
  res.setHeader('Content-Type','text/html');
  const sql=`SELECT * from leaves order by cdate DESC,ctime DESC`;
  con.query(sql,(err,data)=>{
    if(err){
      console.error(err);
      return;
    }
    res.render('Proposal',{data :data,l:data.length});
  });
});

// Admin Page To Proposal Page To Grant Leave
app.post('/grant',function(req,res){
  const {faculty,ldate}=req.body;
  const sql=`UPDATE leaves SET gstatus=? where faculty=? and ldate=?`;
  const values=[1,faculty,ldate];
  con.query(sql,values,(err)=>{
    if(err){
      console.error(err);
      return;
    }
    res.redirect('/proposal');
  });
});

// Admin Page To Proposal Page To Deny Leave
app.post('/deny',function(req,res){
  const {faculty,ldate}=req.body;
  const sql=`UPDATE leaves SET gstatus=? where faculty=? and ldate=?`;
  const values=[0,faculty,ldate];
  console.log(values);
  con.query(sql,values,(err)=>{
    if(err){
      console.error(err);
      return;
    }
    res.redirect('/proposal');
  });
});


app.listen(3000,()=>{
    console.log("Server Running")
});