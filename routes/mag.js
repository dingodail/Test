var express = require('express');
var router = express.Router();
var dateFormat = require('dateformat');

var Excel = require('exceljs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('magcom', {});
});

router.post('/search', function (req, res, next) {
    var oggetto = req.body.oggetto;
    var descr = req.body.descr;
    if (descr == "" && oggetto != "") {
        var lower = oggetto.toLowerCase();
        var workbook = new Excel.Workbook();
        var result = [];
        workbook.xlsx.readFile('./public/excel/GiacenzaMagazzino.xlsx')
            .then(function() {
                var worksheet = workbook.getWorksheet(1);
                var totrow = worksheet.rowCount;
                worksheet.eachRow(function (row, rowNumber) {
                    if (row.getCell(2).value.toLowerCase().includes(lower)) {
                        var qty = row.getCell(5).value;
                        if (qty == null) qty = 0;
                        var jsonres = {
                            id: rowNumber,
                            oggetto: row.getCell(2).value,
                            descrizione: row.getCell(3).value,
                            qta: qty,
                            costo: parseFloat(row.getCell(6).value).toFixed( 2 ),
                            importo: parseFloat((row.getCell(6).value * qty)).toFixed( 2 )
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
        workbook.xlsx.readFile('./public/excel/GiacenzaMagazzino.xlsx')
            .then(function() {
                var worksheet = workbook.getWorksheet(1);
                var totrow = worksheet.rowCount;
                if(lower == 'tutto'){
                    worksheet.eachRow(function (row, rowNumber) {
                            var qty = row.getCell(6).value;
                            if (qty == null) qty = 0;
                            var jsonres = {
                                id: rowNumber,
                                oggetto: row.getCell(2).value,
                                descrizione: row.getCell(3).value,
                                qta: qty,
                                costo: parseFloat(row.getCell(6).value).toFixed( 2 ),
                                importo: parseFloat((row.getCell(6).value * qty)).toFixed( 2 )
                            };
                            if(rowNumber != 1) {
                               result.push(jsonres);
                            }
                        if (rowNumber == totrow) {
                            res.status(200).send(result);
                        }
                    });
                } else {
                worksheet.eachRow(function (row, rowNumber) {
                    if (row.getCell(3).value.toLowerCase().includes(lower)) {
                        var qty = row.getCell(6).value;
                        if (qty == null) qty = 0;
                        var jsonres = {
                            id: rowNumber,
                            oggetto: row.getCell(2).value,
                            descrizione: row.getCell(3).value,
                            qta: qty,
                            costo: parseFloat(row.getCell(6).value).toFixed( 2 ),
                            importo: parseFloat((row.getCell(6).value * qty)).toFixed( 2 )
                        };
                        result.push(jsonres);
                    }

                    if (rowNumber == totrow) {
                        res.status(200).send(result);
                    }
                });
                }
            });
    }
    if (oggetto != "" && descr != "") {
        var lowerogg = oggetto.toLowerCase();
        var lowerdescr = descr.toLowerCase();
        var workbook = new Excel.Workbook();
        var result = [];
        workbook.xlsx.readFile('./public/excel/GiacenzaMagazzino.xlsx')
            .then(function() {
                var worksheet = workbook.getWorksheet(1);
                var totrow = worksheet.rowCount;
                worksheet.eachRow(function (row, rowNumber) {
                    if (row.getCell(3).value.toLowerCase().includes(lowerdescr) && row.getCell(2).value.toLowerCase().includes(lowerogg)) {
                        var qty = row.getCell(6).value;
                        if (qty == null) qty = 0;
                        var jsonres = {
                            id: rowNumber,
                            oggetto: row.getCell(2).value,
                            descrizione: row.getCell(3).value,
                            qta: qty,
                            costo: parseFloat(row.getCell(6).value).toFixed( 2 ),
                            importo: parseFloat((row.getCell(6).value * qty)).toFixed( 2 )
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

router.post('/insnewqty', function (req, res, next) {
    var code = req.body.oggetto;
    var qty = req.body.newqty;
    var workbook = new Excel.Workbook();
    var filename = './public/excel/GiacenzaMagazzino.xlsx';
    workbook.xlsx.readFile(filename)
        .then(function () {
            var worksheet = workbook.getWorksheet(1);
            var totrow = worksheet.rowCount;
            for (var i = 1; i < totrow + 1; i++) {
                var row = worksheet.getRow(i);
                var oggetto = row.getCell(2).value;
                if (oggetto == code) {
                    i = totrow + 1;
                    var totcell = row.cellCount;
                    row.getCell(totcell + 1).value = qty;
                    row.getCell(totcell + 1).fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'FF929DD5'},
                        bgColor:{argb:'FF929DD5'}
                    };
                    workbook.xlsx.writeFile(filename)
                        .then(function () {
                            res.status(200).send("Quantità inserita");
                        });
                }
            }
        });


});

router.post('/test', function (req, res, next) {
    console.log("Ok");
});

module.exports = router;
