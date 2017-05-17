var express = require('express');
var router = express.Router();

var Excel = require('exceljs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('magdp', {});
});

router.post('/search', function (req, res, next) {
    var oggetto = req.body.oggetto;
    var descr = req.body.descr;
    if (descr == "" && oggetto != "") {
        var lower = oggetto.toLowerCase();
        var workbook = new Excel.Workbook();
        var result = [];
        workbook.xlsx.readFile('./public/excel/MagazzinoSicurezza.xlsx')
            .then(function () {
                var worksheet = workbook.getWorksheet(1);
                var totrow = worksheet.rowCount;
                worksheet.eachRow(function (row, rowNumber) {
                    if (row.getCell(1).value.toLowerCase().includes(lower)) {
                        var qty = row.getCell(3).value;
                        if (qty == null) qty = 0;
                        var jsonres = {
                            id: rowNumber,
                            oggetto: row.getCell(1).value,
                            descrizione: row.getCell(2).value,
                            qta: qty,
                            prezzo: row.getCell(4).value
                        };
                        result.push(jsonres);
                    }
                    if (rowNumber == totrow) {
                        res.status(200).send(result);
                    }
                });
            });
    }
    if (oggetto == "" && descr != "") {
        var lower = descr.toLowerCase();
        var workbook = new Excel.Workbook();
        var result = [];
        workbook.xlsx.readFile('./public/excel/MagazzinoSicurezza.xlsx')
            .then(function () {
                var worksheet = workbook.getWorksheet(1);
                var totrow = worksheet.rowCount;
                worksheet.eachRow(function (row, rowNumber) {
                    if (row.getCell(2).value.toLowerCase().includes(lower)) {
                        var qty = row.getCell(3).value;
                        if (qty == null) qty = 0;
                        var jsonres = {
                            id: rowNumber,
                            oggetto: row.getCell(1).value,
                            descrizione: row.getCell(2).value,
                            qta: qty,
                            prezzo: row.getCell(4).value
                        };
                        result.push(jsonres);
                    }
                    if (rowNumber == totrow) {
                        res.status(200).send(result);
                    }
                });
            });
    }
    if (oggetto != "" && descr != "") {
        var lowerogg = oggetto.toLowerCase();
        var lowerdescr = descr.toLowerCase();
        var workbook = new Excel.Workbook();
        var result = [];
        workbook.xlsx.readFile('./public/excel/MagazzinoSicurezza.xlsx')
            .then(function () {
                var worksheet = workbook.getWorksheet(1);
                var totrow = worksheet.rowCount;
                worksheet.eachRow(function (row, rowNumber) {
                    if (row.getCell(2).value.toLowerCase().includes(lowerdescr) && row.getCell(1).value.toLowerCase().includes(lowerogg)) {
                        var qty = row.getCell(3).value;
                        if (qty == null) qty = 0;
                        var jsonres = {
                            id: rowNumber,
                            oggetto: row.getCell(1).value,
                            descrizione: row.getCell(2).value,
                            qta: qty,
                            prezzo: row.getCell(4).value
                        };
                        result.push(jsonres);
                    }
                    if (rowNumber == totrow) {
                        res.status(200).send(result);
                    }
                });
            });
    }
});

module.exports = router;
