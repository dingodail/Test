var express = require('express');
var router = express.Router();

var Excel = require('exceljs');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.render('cespiti', {});
});

router.post('/search', function (req, res, next) {
    var oggetto = req.body.oggetto;
    var lower = oggetto.toLowerCase();
    var workbook = new Excel.Workbook();
    var result = [];
    workbook.xlsx.readFile('./public/excel/Cespiti.xlsx')
        .then(function () {
            var worksheet = workbook.getWorksheet(1);
            var totrow = worksheet.rowCount;
            worksheet.eachRow(function (row, rowNumber) {
                if (row.getCell(3).value.toLowerCase().includes(lower)) {
                    var qty = row.getCell(5).value;
                    if (qty == 1) {
                        var totcell = row.cellCount;
                        row.getCell(totcell + 1).fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor:{argb:'FF929DD5'},
                            bgColor:{argb:'FF929DD5'}
                        };
                        workbook.xlsx.writeFile('./public/excel/Cespiti.xlsx')
                            .then(function () {
                            });
                        var jsonres = {
                            id: rowNumber,
                            oggetto: row.getCell(3).value,
                            descrizione: row.getCell(4).value,
                            commessa: row.getCell(1).value,
                            descomm: row.getCell(2).value,
                        };
                        result.push(jsonres);
                    }
                }
                if (rowNumber == totrow) {
                    res.status(200).send(result);
                }
            });
        });
});

module.exports = router;
