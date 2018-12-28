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

// INFO:
// rails
// - new Date(created_at).getTime()
// firestore
// - created_at.toDate().getTime()

window.firebase.firestore().getImages = (fn)=> {
  // Initialize Cloud Firestore through Firebase
  var db = window.firebase.firestore();
  db.collection("images").get().then((querySnapshot) => {
    const a = [];
    querySnapshot.forEach((doc) => {
      a.push({
        id: doc.id,
        url: window.firebase.firestore().getDownloadURL(doc.get('filePath')),
        created_at: doc.get('created_at').toDate()
      });
      // const timestamp = doc.get('created_at');
      // console.log(timestamp);
      // const date = timestamp.toDate();
      // console.log(date);

      // console.log(doc.data());
      // console.log(doc.data().filePath);
    });
    fn(a);
  });
  // getDownloadURL = ()=> ,
};

window.firebase.firestore().getDownloadURL = (filePath)=> {
  const bucketName = window.config.projectId + '.appspot.com';
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(filePath)}?alt=media`;
};
