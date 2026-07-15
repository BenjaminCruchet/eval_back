document.addEventListener("DOMContentLoaded",()=>{

const form = document.querySelector("#accountForm");

if(!form) return;

form.addEventListener("submit", async(e)=>{

e.preventDefault();

const data = {nom:form.nom.value, prenom:form.prenom.value, email:form.email.value};

 try {

const response = await fetch("/account",{

method:"PATCH",
headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)
});

const text = await response.text();
const result = JSON.parse(text);

if(!response.ok){

alert(result.message);
return;
}

alert("Informations mises à jour");

location.reload();

} catch(err){

    alert(err.message);

}

});

const passwordForm = document.querySelector("#passwordForm");

if(passwordForm){

passwordForm.addEventListener("submit", async(e)=>{

    e.preventDefault();

    const data = {
        oldPassword: passwordForm.oldPassword.value,
        newPassword: passwordForm.newPassword.value,
        confirmPassword: passwordForm.confirmPassword.value
    };

    try{

        const response = await fetch("/account/password",{

            method:"PATCH",
            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify(data)
        });

        const result = await response.json();

        if(!response.ok){
            throw new Error(result.message);
        }

        alert("Mot de passe modifié");

        passwordForm.reset();

    }catch(err){

        alert(err.message);

    }
});
}
});