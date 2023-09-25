class TableTemplate {
  static fillIn(tableId, data, columnName) {
    const table = document.getElementById(tableId);

    if (!table) { //checks for table mismatch instance
      console.error(`Table not found.`);
      return;
    }

    const headerRow = table.rows[0]; // Retrieves column names from header row

    // Changes column name with columnName
    for (let i = 0; i < headerRow.cells.length; i++) {
      const columnHeader = headerRow.cells[i].textContent; //accesses original columns
      const template = `{{${columnHeader}}}`;
      if (data[columnHeader] !== undefined) { // replaces column name if one is provided
        headerRow.cells[i].textContent = columnHeader.replace(template, data[columnHeader]);
      }
    }

    if (columnName) { //checks if columnName is provided to fill table values under it

      // Find the index of the given columnName
      const columnIndex = Array.from(headerRow.cells).findIndex(function(cell) {
        return cell.textContent === columnName;
      });

      if (columnIndex === -1) {
        console.warn(`No column match'`);
        return;
      }

      for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
        const row = table.rows[rowIndex];
        
        for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
          const cell = row.cells[cellIndex];
          const template = `{{${columnName}}}`;
          if (data[columnName] !== undefined) {
            cell.textContent = cell.textContent.replace(template, data[columnName]);
          }
        }
      }
    } else {
      // Processes table and enters dictionary contents into table columns without column name
      for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
        const row = table.rows[rowIndex];
        for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
          const cell = row.cells[cellIndex];
          for (const key in data) {
            const template = `{{${key}}}`;
            if (cell.textContent.includes(template)) {
              cell.textContent = cell.textContent.replace(template, data[key]);
            }
          }
        }
      }
    }
  }
}
