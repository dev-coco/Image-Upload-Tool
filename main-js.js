// 上传图片人员
const uploadUserList = {
  小明: '小红,小黄,小绿,小蓝,小黑',
}

// 版权员
const copyrightList = {
  小明: '小军'
}

// 设置上传图片人员选项
function setUploadUser () {
  // 获取选项数据
  const team = document.getElementById('team')
  const index = team.selectedIndex
  const label = team.options[index].text
  // 清空选项
  const uploadUser = document.getElementById('uploadUser')
  uploadUser.innerHTML = ''
  const copyright = document.getElementById('copyright')
  copyright.innerHTML = ''
  // 添加对应名单的选项
  const userArray = uploadUserList[label].split(',')
  const copyrightArray = copyrightList[label].split(',')
  // 为上传图片人员添加选项
  for (const setOption of userArray) {
    const option = new Option(setOption, setOption)
    uploadUser.appendChild(option)
  }
  // 为版权人员添加选项
  for (const setOption of copyrightArray) {
    const option = new Option(setOption, setOption)
    copyright.appendChild(option)
  }
}

const dropFile = document.getElementById('dropFile')

// 已拖入文件
dropFile.ondragenter = function (event) {
  // 阻止浏览器默认事件
  event.preventDefault()
  event.stopPropagation()
}

// 文件在 dropFile 上，但是还未松开鼠标
dropFile.ondragover = function (event) {
  // 阻止浏览器默认事件
  event.preventDefault()
  event.stopPropagation()
}

// 文件进入 dropFile 并且已经松开鼠标
dropFile.ondrop = async function (event) {
  // 阻止浏览器默认事件
  event.preventDefault()
  event.stopPropagation()

  // 把获取的文件传入变量
  const files = this.files || event.dataTransfer.files
  const team = document.getElementById('team')
  const index = team.selectedIndex
  const uploadTeam = team.options[index].text
  const folderID = team.options[index].value
  const uploadUser = document.getElementById('uploadUser').value
  const copyright = document.getElementById('copyright').value
  const fileName = document.getElementById('fileName').value
  const fileType = document.getElementById('fileType').value
  const cnTitle = document.getElementById('cnTitle').value
  const otherTitle = document.getElementById('otherTitle').value
  let num = 0
  if (files.length > 1) {
    for (const file1 of files) {
      num++
      uploadFile(uploadTeam, uploadUser, copyright, fileType, fileName + num, file1, folderID, cnTitle, otherTitle)
      await delay()
    } // End for
  } else {
    uploadFile(uploadTeam, uploadUser, copyright, fileType, fileName + num, files[0], folderID, cnTitle, otherTitle)
  } // End if
}

// 延迟
function delay () {
  return new Promise(resolve => {
    setTimeout(resolve, 1500)
  })
}

// 上传成功的提示框
function onSuccess (numUnread) {
  Toastify({
    text: '上传成功',
    duration: 3000
  }).showToast()
}

// 上传文件
function uploadFile (uploadTeam, uploadUser, copyright, fileType, fileName, files, folderID, cnTitle, otherTitle) {
  const reader = new FileReader()
  reader.onload = function (e) {
    const content = reader.result
    google.script.run.withSuccessHandler(onSuccess).uploadFile(uploadTeam, uploadUser, copyright, fileType, fileName, content, folderID, cnTitle, otherTitle)
  }
  reader.readAsDataURL(files)
}
