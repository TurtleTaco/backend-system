
function sql_backend() {
  return (
    <h1 id="header">
  Hello!!!!!
</h1>

<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/7.2.3/firebase-firestore.js"></script>

<script>


firebase.initializeApp({
  apiKey: "AIzaSyB4WmRNMzNmBI5iERYj_Q-Bw-UpRSbBzz0",
  authDomain: "fir-7b423.firebaseapp.com",
  projectId: "fir-7b423"
});

var db = firebase.firestore();

db.collection("users").add({
    Name: "Test2",
    Number: "234"
})

</script>
  );
}

export default sql_backend;