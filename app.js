const express = require('express')
const app = express();

const env = require('dotenv').config();

const connectDb = require('./config/db');
connectDb();

const Employee = require('./models/employee');

const asyncHandler = require('express-async-handler');

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded());

const PORT = process.env.PORT || 8080;

app.get('/', (req, res) => {
    res.redirect('/employees');
});

//getting all employees
app.get('/employees', asyncHandler(async (req, res) => {
    const employees = await Employee.find({});
    res.render('home', { employees: employees, employee: '' });
}));

//creating and updating employee
app.post('/employee', asyncHandler(async (req, res) => {
    if (req.body.hidden_id) {
        await Employee.findByIdAndUpdate({ _id: req.body.hidden_id }, req.body, { new: true });
        res.redirect('/employees')
    }
    else {
        const { firstName, lastName, email, contact } = req.body; //object destructing
        const employee = new Employee({
            firstName,
            lastName,
            email,
            contact
        })
        await employee.save();
        res.redirect('/employees')

    }
}));

//getting an employe by id

app.get('/employee/:id', asyncHandler(async (req, res) => {
    const employee = await Employee.findById({ _id: req.params.id });
    const employees = await Employee.find({});
    res.render('home', { employees: employees, employee: employee });

}));

//removing an employee
app.get('/remove/:id', asyncHandler(async (req, res) => {
    await Employee.findByIdAndDelete({ _id: req.params.id });
    res.redirect('/employees');


}));


app.listen(PORT, (req, res) => {
    console.log(`The server is running on port ${PORT}`);
});