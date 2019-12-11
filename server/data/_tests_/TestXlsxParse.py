import unittest

import xlrd



class TestXlsxParse(unittest.TestCase):
    # loc = "./e_sockets.xlsx" #mac
    loc = "server/data/e_sockets.xlsx"  #pc

    def test_for_correctinfo(self):
        workbook = xlrd.open_workbook(self.loc)
        worksheet = workbook.sheet_by_index(0)

        # Test an empty inlineStr cell.
        cell = worksheet.cell(19, 0)
        self.assertEqual(cell.value, 'Belgium')
        self.assertEqual(cell.ctype, xlrd.book.XL_CELL_TEXT)

        # Test a non-empty inlineStr cell.
        cell = worksheet.cell(1, 2)
        self.assertEqual(cell.value, '50 Hz')
        self.assertEqual(cell.ctype, xlrd.book.XL_CELL_TEXT)

    def test_for_accurate(self):

        workbook = xlrd.open_workbook(self.loc)
        worksheet = workbook.sheet_by_index(0)

        # Test reading sample data from the worksheet.
        cell = worksheet.cell(0, 1)
        self.assertEqual(cell.value, '220 V')
        self.assertEqual(cell.ctype, xlrd.book.XL_CELL_TEXT)

    def test_for_accurateinfo(self):
        workbook = xlrd.open_workbook(self.loc)
        worksheet = workbook.sheet_by_index(0)

        # Test reading sample data from the worksheet.
        cell = worksheet.cell(0, 0)
        self.assertEqual(cell.value, 'Afghanistan')
        self.assertEqual(cell.ctype, xlrd.book.XL_CELL_TEXT)

if __name__ == '__main__':
    unittest.main()