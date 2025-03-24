import axios from "axios";
const getItemByCategory = async (category) =>axios.get("https://dummyjson.com/products/category/"+category);

const getItemByid =async (id) =>axios.get("https://dummyjson.com/products/"+id);

export default{
    
    getItemByCategory,
    getItemByid,
    
}

const itemBaseUrl = 'https://dummyjson.com/products'


