const button = document.getElementById("checkout");
button.addEventListener("click", ()=>{
    fetch('http://localhost:3001/create-checkout-session',{
        method:"POST",
        headers:{
            'Content-Type': "application/json"
        },
        body: JSON.stringify({
            items:[
                {
                    id:1, 
                    quantity:2
                },
                {
                    id:1,
                    quantity:2
                }
            ]
        })
    }).then(res=>{
        if(res.ok) return res.json()
        return res.json().then(json=>Promise.reject(json));
    }).then(({url})=>{
        window.location = url;
    }).catch(err=>{
        console.error(err)
    })
    console.log("Checkout");
})