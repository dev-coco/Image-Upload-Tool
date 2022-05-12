# Image-Upload-Tool
The image is uploaded to the Google Drive tool. 上传图片到 Google Drive 工具。
# 预览
<img src="preview.jpg">

# 功能
- 上传图片到 Google Drive，支持多图同时上传。
- 填写表单内容，上传图片时自动填表。
- 根据选项一选择的项目，自动更新选项二的项目。

# 设置
code.gs 文件中的 `SpreadsheetApp.openById('SheetID').getSheetByName('SheetName')` SheetID 需要更改为表格的 ID，SheetName 需要更改为分表的名字，这个表格是用来填写表单的项目。

index.html 文件中 `<option value="FolderID">选项</option>` 需要将 value 的值设置成 Google Drive 的文件夹 ID，根据不同的选项，上传到不同的文件夹内。
