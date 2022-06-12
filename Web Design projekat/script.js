
var firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
var prov1=0;
function gledajzaimena(korisime,korisnik1){
  let korisniciRequest = new XMLHttpRequest();
            korisniciRequest.onreadystatechange = function () {
            if (this.readyState == 4) {
              if (this.status == 200) {
                console.log(this.responseText);
                let korisnici = JSON.parse(this.responseText);
                
                for (let i in korisnici) {
                  let korisnik = korisnici[i];
                  if (korisnik.korisnickoIme==korisime)
                  { 
                    alert("Korisnicko ime vec postoji!");
                    prov1=1;
                    break;                  
                  }
                  else
                  {
                    prov1=0;
                  }
                }
                if(prov1==1)
                {
                }
                else
                {
                    let postfirebase= "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
                                  let postRequest = new XMLHttpRequest();
                                  postRequest.onreadystatechange = function (e) {
                                  if (this.readyState == 4) {
                                  if (this.status == 200) {  
                                    
                                    console.log(korisnik1);
                                    
                                    document.location.reload(true);
                                    

                                  } 
                                  else
                                  {
                                    alert("greska");
                                  }
                                }
                                
                              };
                          postRequest.open("POST", postfirebase +"korisnici.json");
                          postRequest.setRequestHeader('Content-Type', 'application/json');
                          postRequest.send(JSON.stringify(korisnik1));
                }
               
              }
            }
          };
          korisniciRequest.open("GET", firebaseUrl + "korisnici.json");
          korisniciRequest.send();
          
          
}

let loginforma = document.getElementById("loginform"); 
  loginforma.addEventListener("submit", function(e) {
  e.preventDefault();
  let korisnickoIme = document.getElementById("loginime").value.trim(); 
  let lozinka = document.getElementById("loginprezime").value.trim(); 

  if (korisnickoIme == "" || lozinka == "") {
    alert("Polja ne smeju biti prazna");
  } else {
    let korisniciRequest = new XMLHttpRequest();
    korisniciRequest.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          console.log(this.responseText);
          let korisnici = JSON.parse(this.responseText);
          let login = false;
          var prov=0;
          for (let i in korisnici) {
            let korisnik = korisnici[i];
            let korisnickaImena = korisnik.korisnickoIme;
            let lozinke = korisnik.lozinka;
            console.log(korisnickaImena, lozinke);
            console.log(korisnickoIme, lozinka);
            if (korisnickaImena == korisnickoIme && lozinke == lozinka) {
              if(korisnik.aktiviran=='1')
              {
              login = true;
              break;
              }
              else
              {
                alert("Korisnik je deaktiviran!");
                login=false;
                prov=1;
              }
            } else {
              
              login = false;
            }
          }
          if (login == true) {
            alert("Uspesno ste ulogovani");
          } else {
            if(prov==0)
            {
            alert("Pogresan unos podataka");
            }
          }
        }
      }
    };
    korisniciRequest.open("GET", firebaseUrl + "korisnici.json");
    korisniciRequest.send();
  }
});

let reigsterforma = document.getElementById("registerform");
reigsterforma.addEventListener("submit", function(e){
  e.preventDefault();
  var ime = document.getElementById("registerime");
  var prezime = document.getElementById("registerprezime");
  var korisnickoIme = document.getElementById("registerkoris");
  var adresa = document.getElementById("registeradresa");
  var email = document.getElementById("registeremail");
  var templateEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var lozinka = document.getElementById("registerlozinka");
  var templatePsw = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;
  var brojTelefona = document.getElementById("registerbroj");
  var templateBroj = /[0-9]{9}/;
  var datum = document.getElementById("registerdatum");

  if (
    ime.value == "" ||
    prezime.value == "" ||
    korisnickoIme.value == "" ||
    adresa.value == "" ||
    email.value == "" ||
    lozinka.value == "" ||
    brojTelefona.value == "" ||
    datum.value == ""
  ) {
    alert("Morate popuniti polja ");
  } else if (!email.value.match(templateEmail)) {
    alert("Email nije ispravan");
    email.value = "";
  } else if (!lozinka.value.match(templatePsw)) {
    alert("Lozinka mora imati najmanje 8 karaktera i brojeve");
    lozinka.value = "";
  } else if (!brojTelefona.value.match(templateBroj)) {
    alert("Broj mora imati 9 karaktera ");
    brojTelefona.value = "";
  } else {
    var korisnik1={};
    korisnik1.adresa=adresa.value;
    korisnik1.datumRodjenja=datum.value;
    korisnik1.email=email.value;
    korisnik1.ime=ime.value;
    korisnik1.korisnickoIme=korisnickoIme.value;
    korisnik1.lozinka=lozinka.value;
    korisnik1.prezime=prezime.value;
    korisnik1.telefon=brojTelefona.value;
    korisnik1.aktiviran='1';
              gledajzaimena(korisnickoIme.value,korisnik1);
               
                
                

              
          }     
            
  }
  );

function prikazi(a) {
    var x = document.getElementById(a);
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
  function otvoripozoriste(idpoz,nazivpoz){
    location.href="pozoriste.html"; 
    localStorage.setItem('identitetpozorista',idpoz); 
    localStorage.setItem('nazivpozorista',nazivpoz);
  }
  function otvoripredstavu(kodpred,kljucpred){
    location.href="predstava.html";
    localStorage.setItem('identitetpredstave',kodpred);
    localStorage.setItem('kljucpredstave',kljucpred);
  } 
  function otvoriizmene(kodpred){
    location.href="predstavaizmena.html";
    localStorage.setItem('identitetpredstave',kodpred);
  }
  var predstavee;
  var zanrpredstave1;
  function izmenipodatke(){
    
    var j=0;
    var a=localStorage.getItem('identitetpozorista');
    var b=localStorage.getItem('identitetpredstave');
    let firebaseUrl2 = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";    
    let predstaveRequest = new XMLHttpRequest();
    predstaveRequest.onreadystatechange = function () {
      if (this.readyState == 4) { 
        if (this.status == 200) { 
          console.log(this.responseText);
          predstavee = JSON.parse(this.responseText);
          console.log(predstavee);
          for (let i in predstavee) {
            let predstava = predstavee[i];
            
            if(b==predstava.kod)
            {
              ocena=predstava.ocena;
              ocene=predstava.ocene;
              komentari=predstava.komentari;
              slika=predstava.slika;
              document.getElementById('imepred').value=predstava.naziv;
              document.getElementById('kodpreds').value=predstava.kod;
              document.getElementById('kratakopis').innerHTML+=predstava.kratakOpis;
              document.getElementById('trajanje').value=predstava.trajanje;
              document.getElementById('formazanr').innerHTML+=predstava.zanr;
              zanrpredstave1=predstava.zanr;
              
              document.getElementById('detaljanopis').innerHTML+=predstava.opis;
              document.getElementById('cena').value=predstava.cena;
              document.getElementById('maxosoba').value=predstava.maxOsobe;             
              break;            
            }
            j++;
          }
        }  
      }
      
    };
    predstaveRequest.open("GET", firebaseUrl2 + "predstave/"+a+".json");
    predstaveRequest.send();
    let dugmic=document.getElementById('forma');

            dugmic.addEventListener('submit', function(e){
                e.preventDefault();
                let predstave={};
             let f1=   document.getElementById('imepred').value;
             let f2=   document.getElementById('kodpreds').value;
             let f3=   document.getElementById('kratakopis').innerHTML;
             let f4=   document.getElementById('trajanje').value;
             let f5=$( "#formselect option:selected" ).text();
             let forma=document.getElementById('formselect');
             let vrednost=forma.options[forma.selectedIndex].value;
             let f6=   document.getElementById('detaljanopis').innerHTML;
             let f7=   document.getElementById('cena').value;
             let f8=   document.getElementById('maxosoba').value;
       //      let f9=   document.getElementById('formFile').value;
             if(f1=="" ||  f2=="" ||  f3=="" ||  f4=="" ||  f6=="" ||  f7=="" ||  f8=="")
             {
                alert("Niste uneli sve podatke!")
             }
             else
             {
              
             
             predstave.naziv=f1;
             predstave.kod=f2;
             predstave.kratakOpis=f3;
             predstave.trajanje=f4;
             if(vrednost==1)
             {
              predstave.zanr=zanrpredstave1;
             }
             else
             {
             predstave.zanr=f5;
             }
             predstave.opis=f6;
             predstave.cena=f7;
             predstave.maxOsobe=f8;
             predstave.ocena=ocena;
             predstave.ocene=ocene;
             predstave.komentari=komentari;
       //     let f10=f9.split("\\").pop();
       //     predstave.slika=f10;
             predstave.slika=slika;
             let putRequest = new XMLHttpRequest();
             putRequest.onreadystatechange = function () {
               if (this.readyState == 4) {
                 if (this.status == 200) {
                   window.location.href = "predstava.html";
                   console.log(predstave);

                 } 
               }
              
             };
             
        putRequest.open("PUT", firebaseUrl2 + "predstave/"+a+"/"+Object.keys(predstavee)[j]+".json");
        putRequest.send(JSON.stringify(predstave));
                





            }
              });
  }
  function obrisipredstavu(kljuc){
    var a=localStorage.getItem('identitetpozorista');
    let firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
    let deleterequest= new XMLHttpRequest();
    deleterequest.onreadystatechange =function(){
      if (this.readyState == 4) {
        if (this.status == 200) {
        location.href="pozoriste.html";
        }
      }
    }
    deleterequest.open("DELETE", firebaseUrl + "predstave/"+a+"/"+kljuc+".json");
    deleterequest.send();
    
  }
  function postavikomentar(kome){
    let kompletkomentar={};
    var a=localStorage.getItem('identitetpozorista');
    var kod=localStorage.getItem('kljucpredstave');
    let ime=document.getElementById('komentime').value;
    let komentar=document.getElementById('koment').value;
    kompletkomentar.ime=ime;
    kompletkomentar.kome=kome;
    kompletkomentar.komentar=komentar;
    let postfirebase= "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
                let postRequest = new XMLHttpRequest();
                postRequest.onreadystatechange = function (e) {
                if (this.readyState == 4) {
                if (this.status == 200) {  
        
                  alert('uspesno komentovano');
                  document.location.reload(true);
                  

                } 
                else
                {
                  alert("greska");
                }
              }
              
            };
        postRequest.open("POST", postfirebase +"predstave/"+a+"/"+kod+"/komentari.json");
        postRequest.setRequestHeader('Content-Type', 'application/json');
        postRequest.send(JSON.stringify(kompletkomentar));





  }
  function otvorimodalodgovor(kome){
    document.getElementById('modalbutton1').click();
    document.getElementById('komentarisidugme').addEventListener('click',()=>{postavikomentar(kome)});

  }
  function ucitajpodatkepredstava(){
    var k=0;
    var a=localStorage.getItem('identitetpozorista');
    var b=localStorage.getItem('identitetpredstave');
    let firebaseUrl2 = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";    
    let predstaveRequest = new XMLHttpRequest();
    predstaveRequest.onreadystatechange = function () {
      if (this.readyState == 4) { 
        if (this.status == 200) { 
          console.log(this.responseText);
          let predstave = JSON.parse(this.responseText);
          console.log(predstave);
          for (let i in predstave) {
            let predstava = predstave[i];
            if(b==predstava.kod)
            {
              
              document.getElementById('nazivpredstave').innerHTML+=predstava.naziv;
              document.getElementById('deskripcijanaslov').innerHTML+=predstava.naziv;
              document.getElementById('kod').innerHTML+=predstava.kod;
              document.getElementById('zanrpredstave').innerHTML+=predstava.zanr;
              document.getElementById('maxOsobe').innerHTML+=predstava.maxOsobe;
              document.getElementById('deskripcijadela').innerHTML+=predstava.opis;
              document.getElementById('cenapredstave').innerHTML+=predstava.cena;
              document.getElementById('predstavaslika').style.backgroundImage="url("+predstava.slika+")";
              var br=0;
              var br1=0;
              document.getElementById('izmenahref').addEventListener("click",function(){otvoriizmene(predstava.kod);});
              for(var l=0;l<5;l++)
              {
                var x =document.getElementsByClassName('ocene')[l];
                x.setAttribute('aria-valuenow',predstava.ocene[l]*4);
                x.style.width=predstava.ocene[l]*4+"%";
                br+=predstava.ocene[l]*l;
                br1+=predstava.ocene[l];
                document.getElementsByClassName('brojocena')[l].innerHTML+=predstava.ocene[l];
              }
              for(var o in predstava.komentari)
              {
                let komentar=predstava.komentari[o];
                  let imekome=komentar.ime; 
                  let ul=document.createElement('ul');
                  ul.setAttribute('class','nav komentar col-10');
                  let li1=document.createElement('li');
                  li1.setAttribute('class','nav-item imekoment');
                  li1.innerHTML+="Ime: "+komentar.ime;
                  let li2=document.createElement('li');
                  li2.setAttribute('class','nav-item komentkome');
                  li2.innerHTML+="@"+komentar.kome;
                  let li3=document.createElement('li');
                  li3.setAttribute('class','nav-item');
                  li3.innerHTML+="Komentar: "+komentar.komentar;
                  let dugme=document.createElement('button');
                  dugme.setAttribute('type','button');
                  dugme.setAttribute('class','btn btn-secondary odgovori col-2');
                  dugme.innerHTML+="Odgovori";
                  dugme.addEventListener('click',()=>{otvorimodalodgovor(imekome)});
                  document.getElementById('komentrow').appendChild(ul);
                  ul.appendChild(li1);
                  ul.appendChild(li2);
                  ul.appendChild(li3);
                  document.getElementById('komentrow').appendChild(dugme);

                  


              }
              document.getElementById('prosecna').innerHTML+=predstava.ocena;
              var kljucpredstavebrisanje=Object.keys(predstave)[k];
              document.getElementById('obrisipredstavudugme').addEventListener('click',()=>{obrisipredstavu(kljucpredstavebrisanje)});
              
              
            }
            k++;
          }
        }  
      }
      
    };
    predstaveRequest.open("GET", firebaseUrl2 + "predstave/"+a+".json");
    predstaveRequest.send();
  }
  function ucitajpredstave(){
    var j=1;
    var brpr=0;
    document.getElementById('naslovno').innerHTML=localStorage.getItem('nazivpozorista');
    var a=localStorage.getItem('identitetpozorista');
    let firebaseUrl2 = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";    
    let predstaveRequest = new XMLHttpRequest();
    predstaveRequest.onreadystatechange = function () {
      if (this.readyState == 4) { 
        if (this.status == 200) { 
          console.log(this.responseText);
          let predstave = JSON.parse(this.responseText);
          console.log(predstave);
          for (let i in predstave) {
            let predstava = predstave[i];
            let kljucpred=Object.keys(predstave)[brpr];
            let kartica=document.createElement('div');
            kartica.setAttribute('class','card');
            let slika=document.createElement('img');
            slika.setAttribute('src',predstava.slika);
            slika.setAttribute('class','card-img-top');
            let div1=document.createElement('div');
            div1.setAttribute('class','card-body');
            div1.setAttribute('id','cardbody'+j);
            let naslov=document.createElement('h5');
            naslov.setAttribute('class','card-title');
            naslov.innerHTML=predstava.naziv;
            let p1=document.createElement('p');
            p1.innerHTML=predstava.kratakOpis;
            let p2=document.createElement('p');
            p2.innerHTML=predstava.trajanje+" min";
            let linkic=document.createElement('a');
            linkic.setAttribute('class','btn btn-outline-dark');
            linkic.setAttribute('id','predstava'+j);
            linkic.innerHTML='Vise detalja';
            linkic.addEventListener("click",function(){otvoripredstavu(predstava.kod,kljucpred);});
            document.getElementsByClassName('flexcontainer')[0].appendChild(kartica);
            kartica.appendChild(slika);
            kartica.appendChild(div1);
            div1.appendChild(naslov);
            div1.appendChild(p1);
            div1.appendChild(p2);
            document.getElementById('cardbody'+j).appendChild(linkic);

            brpr++;
            j++;
            
          }
        }  
      }
      
    };
    predstaveRequest.open("GET", firebaseUrl2 + "predstave/"+a+".json");
    predstaveRequest.send();




  }
  function ucitajpozorista(){
  var i=1
  let firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
  let pozoristaUrl = firebaseUrl + "pozorista.json";
  let pozoristaRequest = new XMLHttpRequest();
  pozoristaRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) { 
        console.log(this.responseText);
        let pozorista = JSON.parse(this.responseText);
        console.log(pozorista);
        for (let j in pozorista) {
          let pozoriste=pozorista[j];
          console.log(pozoriste)          
          var div1=document.createElement("div");
            div1.setAttribute("class","accordion");
            div1.setAttribute("id","accordion-example");
          var div2=document.createElement("div");
            div2.setAttribute("class","accordion-item");
          var header=document.createElement("h2");
            header.setAttribute("class","accordion-header");
            header.setAttribute("id","heading");
          var dugme=document.createElement("button");
            dugme.setAttribute("class","accordion-button collapsed btn-light");
            dugme.setAttribute("type","button");
            dugme.setAttribute("data-bs-toggle",`collapse`);
            dugme.setAttribute("data-bs-target",`#collapse`+i);
            dugme.setAttribute("aria-expanded","false");
            dugme.setAttribute("aria-controls",`collapse`+i);
          dugme.innerHTML=pozoriste.naziv
          var div3=document.createElement("div");
            div3.setAttribute("id",`collapse`+i);
            div3.setAttribute("class","accordion-collapse collapse");
            div3.setAttribute("aria-labelledby",`heading`+i);
            div3.setAttribute("data-bs-parent","#accordionExample");
          var div4=document.createElement("div");
            div4.setAttribute("class","accordion-body");
          var div5=document.createElement("div");
            div5.setAttribute("class","row justify-content-around");
          var div6=document.createElement("div");
            div6.setAttribute("class","col-10 col-md-6");
          var slika=document.createElement("img");
            slika.setAttribute("src",pozoriste.slika);
            slika.setAttribute("style","width: 100%; height: 100%;");
          var div7=document.createElement("div");
            div7.setAttribute("class","col-10 col-md-6 justify-content-around");
          var div8=document.createElement("div");
            div8.setAttribute("class","col-12");
            div8.innerHTML="Adresa : "+pozoriste.adresa
          var div9=document.createElement("div");
            div9.setAttribute("class","col-12");
            div9.innerHTML="Broj predstava u ponudi: "+pozoriste.brojPredstava
          var div10=document.createElement("div");
            div10.setAttribute("class","col-12");
            div10.setAttribute("id","accordion-container");
          var linkdugme=document.createElement("a");
            linkdugme.setAttribute("class","btn btn-secondary");
            linkdugme.setAttribute("role","button");
            linkdugme.setAttribute("aria-disabled","true");
            linkdugme.setAttribute("id","link-button");
            linkdugme.innerHTML="Pregled predstava";
            linkdugme.addEventListener("click", ()=>{otvoripozoriste(pozoriste.idPredstava,pozoriste.naziv)},false);
          document.body.appendChild(div1);
          div1.appendChild(div2);
          div2.appendChild(header);
          header.appendChild(dugme);
          div2.appendChild(div3);
          div3.appendChild(div4);
          div4.appendChild(div5);
          div5.appendChild(div6);
          div6.appendChild(slika);
          div5.appendChild(div7);
          div7.appendChild(div8);
          div7.appendChild(div9);
          div7.appendChild(div10);
          div10.appendChild(linkdugme);
          i++;
          
        }
      }
    }
  };
  
  pozoristaRequest.open("GET", firebaseUrl + "pozorista.json");
  pozoristaRequest.send();
}
var korisnici;

function promenistatusactive(kljuc){
  
  let firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
  let deleterequest= new XMLHttpRequest();
  deleterequest.onreadystatechange =function(){
    if (this.readyState == 4) {
      if (this.status == 200) {
      location.href="admin.html";
      }
    }
  }
  deleterequest.open("PUT", firebaseUrl + "korisnici/"+kljuc+"/aktiviran.json");
 deleterequest.send(JSON.stringify('0'));
  
}
function promenistatusdeactiv(kljuc){
  
  let firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
  let deleterequest= new XMLHttpRequest();
  deleterequest.onreadystatechange =function(){
    if (this.readyState == 4) {
      if (this.status == 200) {
      location.href="admin.html";
      }
    }
  }
  deleterequest.open("PUT", firebaseUrl + "korisnici/"+kljuc+"/aktiviran.json");
 deleterequest.send(JSON.stringify('1'));
  
}
function izmenikorisnika(korisnik){
  location.href="korisnik.html";
  localStorage.setItem('kljuc',korisnik);
}
function sacuvajpodatke(){
  if(document.getElementById('korisnikime').value=="" ||
              document.getElementById('korisnikprezime').value=="" ||
              document.getElementById('korisnikadresa').value=="" ||
              document.getElementById('korisnikdatum').value=="" ||
              document.getElementById('korisnikuser').value=="" ||
              document.getElementById('korisniklozinka').value=="" ||
              document.getElementById('korisnikbroj').value=="" ||
              document.getElementById('korisnikemail').value=="")
              {
                alert('Niste uneli sva polja!');
              }
  else
  {
      let korisnik={};
      korisnik.ime=document.getElementById('korisnikime').value;
      korisnik.prezime=document.getElementById('korisnikprezime').value;
      korisnik.adresa= document.getElementById('korisnikadresa').value;
      korisnik.datumRodjenja=document.getElementById('korisnikdatum').value;
      korisnik.korisnickoIme=document.getElementById('korisnikuser').value;
      korisnik.lozinka=document.getElementById('korisniklozinka').value;
      korisnik.telefon=document.getElementById('korisnikbroj').value;
      korisnik.email=document.getElementById('korisnikemail').value;
      let a=localStorage.getItem('kljuc');
      let firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
      let korisniciRequest = new XMLHttpRequest();
      korisniciRequest.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            location.href="admin.html";
          }
        }
      };
      
      korisniciRequest.open("PUT", firebaseUrl + "korisnici/"+a+".json");
      korisniciRequest.send(JSON.stringify(korisnik));

  }


}
function ucitajkorisnika(){
  let k=0;
  let a=localStorage.getItem('kljuc');
  let firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
  let korisniciRequest = new XMLHttpRequest();
  korisniciRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.responseText);
        korisnici = JSON.parse(this.responseText);
        console.log(korisnici);
        for (let j in korisnici){
            let korisnik=korisnici[j];
            if(Object.keys(korisnici)[k]==a)
            {
              document.getElementById('korisnikime').value=korisnik.ime;
              document.getElementById('korisnikprezime').value=korisnik.prezime;
              document.getElementById('korisnikadresa').value=korisnik.adresa;
              document.getElementById('korisnikdatum').value=korisnik.datumRodjenja;
              document.getElementById('korisnikuser').value=korisnik.korisnickoIme;
              document.getElementById('korisniklozinka').value=korisnik.lozinka;
              document.getElementById('korisnikbroj').value=korisnik.telefon;
              document.getElementById('korisnikemail').value=korisnik.email;
              document.getElementById('sacuvajpodatke').addEventListener('click',()=>{sacuvajpodatke()});
              document.getElementById('forma').addEventListener('submit',function(e){
                  e.preventDefault();
              })
              

            }
            k++;
          
        }
      }
    }
  };
  
  korisniciRequest.open("GET", firebaseUrl + "korisnici.json");
  korisniciRequest.send();

}

function otvorimodal(kljuc,status){
  if(status=="1")
          {
           document.getElementById('promenistatus').addEventListener('click',()=>{promenistatusactive(kljuc)});
          }
    else
          {
            document.getElementById('promenistatus').addEventListener('click',()=>{promenistatusdeactiv(kljuc)});
          }
  document.getElementById('modalbutton').click();
}
function ucitajkorisnike(){
  var i=1;
  let k=0;
  let firebaseUrl = "https://web-design-projekat-pozorista-default-rtdb.europe-west1.firebasedatabase.app/";
  let korisniciRequest = new XMLHttpRequest();
  korisniciRequest.onreadystatechange = function () {
    if (this.readyState == 4) {
      if (this.status == 200) {
        console.log(this.responseText);
        korisnici = JSON.parse(this.responseText);
        console.log(korisnici);
        for (let j in korisnici) {
          let kljuc;
          let korisnik=korisnici[j];
          let red=document.createElement('tr');
          let redbroj=document.createElement('th');
          redbroj.setAttribute('scope','row');
          redbroj.innerHTML+=i;
          let td1=document.createElement('td');
          td1.innerHTML=korisnik.ime;
          let td2=document.createElement('td');
          td2.innerHTML=korisnik.prezime;
          let td3=document.createElement('td');
          td3.innerHTML=korisnik.korisnickoIme;
          let td4=document.createElement('td');
          td4.innerHTML=korisnik.email;
          let td5=document.createElement('td');
          let a1=document.createElement('a');
          a1.setAttribute('class' ,"btn btn-outline-dark dugmetabela");
          a1.href="#";
          a1.innerHTML+="Vise detalja";
          kljuc=Object.keys(korisnici)[k];
          a1.addEventListener('click',()=>{izmenikorisnika(kljuc)});
          let td6=document.createElement('td');
          let a2=document.createElement('a');
          a2.setAttribute('class' ,"btn btn-outline-dark dugmetabela");
          a2.href="#";
          if(korisnik.aktiviran=="1")
          {
           a2.innerHTML+="Deaktiviraj";
           a2.addEventListener('click',()=>{otvorimodal(kljuc,'1')});
          }
          else
          {
            a2.innerHTML+="Aktiviraj";
            a2.addEventListener('click',()=>{otvorimodal(kljuc,'0')});
          }
          
          
          document.getElementById('telotabele').appendChild(red);
          red.appendChild(redbroj);
          red.appendChild(td1);
          red.appendChild(td2);
          red.appendChild(td3);
          red.appendChild(td4);
          red.appendChild(td5);
          red.appendChild(td6);
          td5.appendChild(a1);
          td6.appendChild(a2);
          k++;
          i++;
          
        }
      }
    }
  };
  
  korisniciRequest.open("GET", firebaseUrl + "korisnici.json");
  korisniciRequest.send();

}




