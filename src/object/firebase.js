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

// INFO: https://qiita.com/teramotodaiki/items/b3592326579166003102
const firestore = window.firebase.firestore();
firestore.settings({/* your settings... */ timestampsInSnapshots: true});
firestore.getImages = ()=> {
  // Initialize Cloud Firestore through Firebase
  var db = firestore;
  db.collection("images").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const timestamp = doc.get('created_at');
      console.log(timestamp);
      const date = timestamp.toDate();
      console.log(date);

      console.log(doc.data());
      console.log(doc.data().filePath);
    });
  });
  // getDownloadURL = ()=> `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`,
};
