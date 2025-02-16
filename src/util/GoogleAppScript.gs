// Function to search a specific column and return corresponding value from another column
function searchColumn(searchValue, searchColumn, returnColumn) {
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = spreadsheet.getActiveSheet();  // Hardcoded sheet name
    
    if (sheet === null) {
      return 'Sheet not found';
    }
    var column = sheet.getDataRange().getValues();
  
    // Loop through the rows and find the search value
    for (var i = 0; i < column.length; i++) {
      if (column[i][searchColumn-1] === searchValue) {
        Logger.log(column[i][searchColumn-1])
        return column[i][returnColumn-1];
      }
    }
    
    return 'Value not found';
  }
  
  // Method to get Aircraft (search in column A, return value from column B)
  function getAircraft(searchValue) {
    return searchColumn(searchValue, 1, 2); // Column A = 1, Column B = 2
  }
  
  // Method to get Category (search in column D, return value from column E)
  function getCategory(searchValue) {
    return searchColumn(searchValue, 4, 5); // Column D = 4, Column E = 5
  }
  
  // Method to get Carbon (search in column G, return value from column H)
  function getCarbon(searchValue) {
    return searchColumn(searchValue, 7, 8); // Column G = 7, Column H = 8
  }
  
  // Main function to handle GET requests
  function doGet(e) {
    try {
      // Log the incoming parameters for debugging
      Logger.log(e.parameter);  // Log all parameters to check what was passed
  
      const action = e.parameter.action;    // Action (e.g., getAircraft, getCategory, getCarbon)
      const searchValue = e.parameter.value; // The value you're searching for
      let debugInfo = `doGet called. Action: ${action}, Search Value: ${searchValue}`;
  
      // If no value is provided, return an error
      if (!searchValue) {
        return ContentService
              .createTextOutput(`Error: Missing search value. Debug: ${debugInfo}`)
              .setMimeType(ContentService.MimeType.TEXT);
      }
  
      let result;
      if (action === 'getAircraft') {
        result = getAircraft(searchValue);
      } else if (action === 'getCategory') {
        result = getCategory(searchValue);
      } else if (action === 'getCarbon') {
        result = getCarbon(searchValue);
      } else {
        return ContentService
              .createTextOutput(`Invalid action. Debug: ${debugInfo}`)
              .setMimeType(ContentService.MimeType.TEXT);
      }
  
      // Return the result as JSON
      return ContentService
            .createTextOutput(JSON.stringify({debugInfo, result: result}))
            .setMimeType(ContentService.MimeType.JSON);
  
    } catch (error) {
      return ContentService
            .createTextOutput(`An error occurred: ${error.toString()}`)
            .setMimeType(ContentService.MimeType.TEXT);
    }
  }
  