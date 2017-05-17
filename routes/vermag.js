var express = require('express');
var router = express.Router();

var Excel = require('exceljs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('vermag', {});
});

router.post('/verifica', function (req, res, next) {
    var oggetto = req.body.oggetto;
    var qty = req.body.qty;
    var lower = oggetto.toLowerCase();
    var workbook = new Excel.Workbook();
    workbook.xlsx.readFile('./public/excel/GiacenzaMagazzino.xlsx').then(function() {
        var worksheet = workbook.getWorksheet(1);
        var totrow = worksheet.rowCount;
        var nosearch = true;
        for (var i = 0; i < totrow; i++) {
            var row = worksheet.getRow(i);
            var code = row.getCell(2).value;
            if(String(code).toLowerCase() == lower){
                i = totrow;
                nosearch = false;
                console.log(worksheet.getRow(i).getCell(5).value);
            }
        }
        if(nosearch){
            console.log("Oggetto non trovato");
        }
    });
});


module.exports = router;