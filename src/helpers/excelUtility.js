import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

const fileType =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
const fileExtension = ".xlsx";

export const exportToCSV = (fileName, items, columns = null) => {
  if (columns)
    items = items.map((item) => {
      return columns.reduce((prev, current) => {
        if (item[current.code])
          return { ...prev, [current.code]: item[current.code] };
        return { ...prev };
      }, {});
    });
  const ws = XLSX.utils.json_to_sheet(items);
  const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
  const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
};
