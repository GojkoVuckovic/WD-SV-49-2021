function prikazi() {
    var x = document.getElementById("lozinka");
    if (x.type === "password") {
      x.type = "text";
    } else {
      x.type = "password";
    }
  }
function login(){
    var x=document.getElementById('exampleModalLabel');
    var a=document.getElementById('modaldivlogin');
    var b=document.getElementById('modaldivregister');
    var c=document.getElementById('loginquestion');
    var d=document.getElementById('registerquestion');
    a.style.display="none";
    b.style.display="block";
    c.style.display="none";
    d.style.display="block";
    x.innerHTML="Register";

      
  }
  function register(){
    var x=document.getElementById('exampleModalLabel');
    var a=document.getElementById('modaldivlogin');
    var b=document.getElementById('modaldivregister');
    var c=document.getElementById('loginquestion');
    var d=document.getElementById('registerquestion');
    b.style.display="none";
    a.style.display="block";
    d.style.display="none";
    c.style.display="block";
    x.innerHTML="Login";      
  }