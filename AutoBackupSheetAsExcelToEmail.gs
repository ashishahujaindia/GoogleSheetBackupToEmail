// mainEntryFunction
function onOpen() {  
  SpreadsheetApp.getActiveSpreadsheet().addMenu('Send sheet', [
    {name: 'As email', functionName: 'send'}
  ]);  
}

// fetching active file
var file = SpreadsheetApp.getActive();

// defining export action for the file to be exported in XLSX format
var url = "https://docs.google.com/feeds/download/spreadsheets/Export?key=" + file.getId() + "&exportFormat=xlsx";

// getting authorization to get the current google sheet as Excel
var params = {
  method:"get",
  headers:{"Authorization": "Bearer " + ScriptApp.getOAuthToken()},
  muteHttpExceptions:true
};

//preparing blob object of the File Exported as Excel
var blob = UrlFetchApp.fetch(url, params).getBlob();
  
// preparing & printing name for the attachment-file in logs
var filename = "FILE NAME INITITAL"
console.log (filename)

// setting suitable name to the Blob Object to be sent as attachment
blob.setName(filename + ".xlsx")

// function to send email with proper sender id, to, subject, contents and attachments (blob)
MailApp.sendEmail('youremailid@domain.com', 'CustomSubject', 'Hi, Please find the attachment.', {
  attachments: [blob]
})
