exports.showAddUserForm = (req, res) => {
    res.render('addUser');
};
const ExcelJS = require('exceljs');

exports.exportToExcel = async (req, res) => {
    const users = await User.query().withGraphFetched('tasks');

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Users & Tasks');

    worksheet.columns = [
        { header: 'ID', key: 'id' },
        { header: 'Name', key: 'name' },
        { header: 'Email', key: 'email' },
        { header: 'Mobile', key: 'mobile' },
        { header: 'Tasks', key: 'tasks' }
    ];

    users.forEach(user => {
        worksheet.addRow({
            id: user.id,
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            tasks: user.tasks.map(t => t.title).join(', ')
        });
    });

    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', 'attachment; filename="users.xlsx"');

    await workbook.xlsx.write(res);
    res.end();
};


exports.createUser = (req, res) => {
    const { name, email, mobile } = req.body;
    console.log("User Created:", { name, email, mobile });
    res.redirect('/');
};
const User = require('../models/User');

exports.showAddUserForm = async (req, res) => {
    res.render('addUser');
};

exports.createUser = async (req, res) => {
    const { name, email, mobile } = req.body;

    try {
        await User.query().insert({ name, email, mobile });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.send("Database error");
    }
};
