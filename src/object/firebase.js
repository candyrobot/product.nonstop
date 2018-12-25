window.firebase.storage().upload = (f)=> {
  let promise = function() {};
  const uploadRef = window.firebase.storage().ref().child('uploadedByUser/' + f.name);
  uploadRef.put(f).then(function(snapshot) {
    console.log('Uploaded a blob or file!');

    //アップロードしたファイルを表示してみる
    uploadRef.getDownloadURL().then(function(url){
      promise({ url }, snapshot);
      console.log("imgSample "+url);
      // document.getElementById("imgSample").style.backgroundImage = "url("+url+")";
    }).catch(function(error) {
      // Handle any errors
      console.log(error);
    });
  });
  return {
    done: (callback)=> { promise = callback }
  }
};
