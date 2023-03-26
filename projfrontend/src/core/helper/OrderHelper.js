import {API} from "../../Backend"
//creating a function createorder with parametre userid, token,orderdetails 
export const createOrder=(userId,token,orderInfo) =>{
    return fetch(`${API}/order/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: JSON.stringify({order:orderInfo})
    }).then(response=>response.json())
    .catch(err=>console.log(err));
}