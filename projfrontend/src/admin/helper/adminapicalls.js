import { API } from "../../Backend";




export const createCategory = (userId, token , category) => {
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(category)
    }).then(response => {
        return response.json()
    }).catch(err=> console.log(err))
}


export const getAllCategories = () => {
    return fetch(`${API}/categories`,{
        method: "GET"
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}

export const deleteCategory = (userId,token, categoryId,name) => {
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "DELETE",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/josn",
            Authorization: `Bearer ${token}`},
        body:{
            name:`${name}`
        }    
    }).then(response=>{
        return response.json()
    }).catch(err=>console.log(err))
}

export const updateCategory = (token,categoryId,userId,content) => {
    
   
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method: "PUT",
        headers:{
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        },
        // here body accepts only string so we have to convert the content object to string by JSON.stringify
        body:JSON.stringify(content) 
    }).then(response => {return response.json()}).catch(err => console.log(err))

}
export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/update/${productId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            "Content-Type":"application.json",
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(product)
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`,{
        method: "GET",
        headers: {
            Accept : "application/json",
            "Content-Type": "application/json"
        }
    }).then(res => res.json()).catch(err => console.log(err))
}

// PRODUCT CALLS

 
export const createProduct = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        // product name is passes as string only
        body: product
    }).then(response => (
        response.json() )).catch(err => console.log(err))
}


export const getAllProducts = () => {
    return fetch(`${API}/products`,{
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const deleteProduct = (productId,userId,token) => {
  
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"DELETE",
        headers: {
            Accept: "application/json",
            "Content-Type":"application/json",
            Authorization: `Bearer ${token}`
        }
    }).then(response => (
        response.json()
    )).catch(err => console.log(err))
}

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}




export const getPhoto = (productId) => {
    return fetch(`${API}/product/photo/${productId}`,{
        method: "GET"
    }).then(res=>(res)).catch(err=>console.log(err))
}