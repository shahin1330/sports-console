/**
 * ভিডিও সরাসরি নির্দিষ্ট Google Drive ফোল্ডারে সেভ করার কোড
 */
function doPost(e) {
  try {
    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);
    
    var base64Data = data.videoData.split(',')[1];
    var decoded = Utilities.base64Decode(base64Data);
    
    var fileName = data.fileName || "VAR_Recording_" + Utilities.formatDate(new Date(), "GMT+6", "yyyy-MM-dd_HH-mm-ss") + ".webm";
    var blob = Utilities.newBlob(decoded, "video/webm", fileName);
    
    // আপনার গুগল ড্রাইভ ফোল্ডার আইডি
    var TARGET_FOLDER_ID = "1TaGhrv9EogjOHkxFijiunvj4MT-COBuD";
    var folder = DriveApp.getFolderById(TARGET_FOLDER_ID);
    
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    return ContentService.createTextOutput(JSON.stringify({
      status: "success",
      fileUrl: file.getUrl(),
      fileName: fileName
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: "error",
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
