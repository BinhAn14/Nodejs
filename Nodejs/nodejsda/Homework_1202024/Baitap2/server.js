const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');
const cors = require('cors');


app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());


app.get('/api/provinces', (req, res) => {
    fs.readFile('vehicle_plates.json', 'utf8', (err, data) => {
        if (err) throw err;
        const plates = JSON.parse(data);

        const provinces = plates.map(item => item.city);
        res.json(provinces);
    });
});

// Endpoint để lấy biển số xe theo tỉnh thành
app.get('/api/plate', (req, res) => {
    const province = req.query.province;
    fs.readFile('vehicle_plates.json', 'utf8', (err, data) => {
        if (err) throw err;
        const plates = JSON.parse(data);

        const result = plates.find(item => item.city === province);
        if (result) {
            res.json({ plateNumber: result.plate_no });
        } else {
            res.status(404).json({ error: 'Province not found' });
        }
    });
});


app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});