// 2018/12/28: 

const a = 
// [
// "https://firebasestorage.googleapis.com/v0/b/mindful-acre-142405.appspot.com/o/uploadedByUser%2Fphoto.jpg?alt=media&token=86612473-002c-4abe-87ff-40479f2c4d95",
// "https://firebasestorage.googleapis.com/v0/b/mindful-acre-142405.appspot.com/o/uploadedByUser%2Fphoto.jpg?alt=media&token=86612473-002c-4abe-87ff-40479f2c4d95"
// ];

let i = 0;

upload();

function upload() {
  console.log(i);

  $('#rightTopId .text_upload').click();

  $('#dragUploadArea .addURL').click();

  // INFO: 直下のinputに自動的にファイル名をいれるためにkeyupする
  $('input#offlineURL[type="text"]').val(a[i]).keyup();

  setTimeout("$('#addOfflineTaskBut').click()", 500);

  var t = setInterval(()=> {
    if (get$Modal().length === 0) {
      clearInterval(t);
      i++;
      if (i < a.length)
        upload();
    }
  }, 100);

  setTimeout(()=> {
    clearInterval(t);
  }, 1000 * 20);
}

function get$Modal() {
  return $('#jwWicket');
}
