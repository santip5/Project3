class TableTemplate {
	static fillIn(tableId, data, columnName) {
		/**
		 * @type {HTMLTableElement}
		 */
		const table = document.getElementById(tableId);

		/**
		 * This method invokes the TemplateProcessor, created from Project 2.0
		 * As per project instructions
		 * @param {string} text
		 * @returns
		 */
		function templateInterpolation(text) {
			const templateProcessor = new TemplateProcessor(text);
			return templateProcessor.fillIn(data);
		}

		if (!table) {
			//checks for table mismatch instance
			console.error(`Table not found.`);
			return;
		}

		const headerRow = table.rows[0]; // Retrieves column names from header row
		let providedIndex = -1; // Stores the 'index' when a columnName is provided
		// This ensures only the correct rows in the correct column get changed

		// Changes column name with columnName
		for (let i = 0; i < headerRow.cells.length; i++) {
			const columnHeader = headerRow.cells[i].textContent; //accesses original columns

			// First check if this column even uses the template interpolation syntax: "{{___}}"
			if (columnHeader.includes("{{")) {
				// Next, we must remove the surrounding braces: {{ }}
				// This is because in the passed in 'data' variable this is omitted
				const template = columnHeader.replace(/\{\{|\}\}/g, "").trim();

				// Did we find in the 'data' object?
				if (data[template] !== undefined) {
					// Did we the specific column we were looking for?
					if (columnName && data[template] === columnName) {
						// Additional error checking
						if (providedIndex !== -1) {
							console.error("Multiple columns found");
						}
						// We found the passed in 'columnName' header!
						// Save this index to be sure to only change table data in this column
						providedIndex = i;
					}

					// Use TemplateProcessor to replace text
					headerRow.cells[i].textContent = templateInterpolation(
						headerRow.cells[i].textContent
					);
				}
			}
		}

		if (columnName) {
			// We a columnName is provided, only change data under it

			// The providedIndex must be found for this to work
			if (providedIndex === -1) {
				console.warn(
					"The index for which column to change was not computed properly. This means the passed in 'columnName' was not found in the header of the table."
				);

				// According the project instructions, when the column specified is not found (providedIndex === -1)
				// Then return without changing the table at all except for the headers
				return;
			}

			for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
				const row = table.rows[rowIndex];

				for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
					// This If-statement is crucial to ensure only the correct column gets changed
					if (cellIndex === providedIndex) {
						const cell = row.cells[cellIndex];

						// Use TemplateProcessor to replace text
						cell.textContent = templateInterpolation(cell.textContent);
					}
				}
			}
		} else {
			// Under this circumstance, all data in the table is changed

			// Processes table and enters dictionary contents into table columns without column name
			for (let rowIndex = 1; rowIndex < table.rows.length; rowIndex++) {
				const row = table.rows[rowIndex];
				for (let cellIndex = 0; cellIndex < row.cells.length; cellIndex++) {
					const cell = row.cells[cellIndex];
					cell.textContent = templateInterpolation(cell.textContent);
				}
			}
		}

		// Make sure the table is visible
		if (table.style.visibility === "hidden") {
			table.style.visibility = "visible";
		}
	}
}
