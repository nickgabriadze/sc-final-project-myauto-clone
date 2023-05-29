import { Category } from "../components/search/searchInterfaces";

function sortByCatTypes(data: Category[]){
    const result:{
        [key:string]: Category[]
    } = {
        "cars": [],
        "tractors": [],
        "motorcycles": []
    };

    for(const eachCat of data){
        if(eachCat.category_type === 0){
            result["cars"].push(eachCat)
        }

        if(eachCat.category_type === 1){
            result["tractors"].push(eachCat)
        }

        if(eachCat.category_type === 2){
            result["motorcycles"].push(eachCat)
        }
    }

    return result;
}

export default sortByCatTypes;