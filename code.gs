function doGet () {
  return HtmlService.createTemplateFromFile('index').evaluate().setTitle('Website Title')
}

function include (filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

// 需要设置表格的 ID 和分表的名字
const sheet = SpreadsheetApp.openById('SheetID').getSheetByName('SheetName')
function uploadFile (uploadTeam, uploadUser, copyright, fileType, fileName, base64Data, folderId, cnTitle, otherTitle) {
  const splitBase = base64Data.split(',')
  const type = splitBase[0].split(';')[0].replace('data:', '')
  const byteCharacters = Utilities.base64Decode(splitBase[1])
  const blob = Utilities.newBlob(byteCharacters, type)
  blob.setName(fileName)
  const folder = DriveApp.getFolderById(folderId)
  const file = folder.createFile(blob)
  sheet.appendRow([uploadTeam, uploadUser, copyright, fileType, fileName, file.getUrl(), new Date().toLocaleDateString(), cnTitle, otherTitle])
}
