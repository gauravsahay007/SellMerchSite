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


// PRODUCT CALLS
 
export const createProduct = (userId,token,product) => {
    return fetch(`${API}/product/create/${userId}`,{
        method: "POST",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        // product name is passes as string only
        body: JSON.stringify(product)
    }).then(response => response.json()).catch(err => console.log(err))
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
            Authorization: `Bearer ${token}`
        }
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}

export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`,{
        method: "GET"
    }).then(response => {
        return response.json()
    }).catch(err => console.log(err))
}


export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`,{
        method: "PUT",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        },
        body: product
    }).then(response =>{
        return response.json()
    }).catch(err => console.log(err))
}