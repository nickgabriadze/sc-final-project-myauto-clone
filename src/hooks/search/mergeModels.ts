import { Model, SortedManModel } from "../../components/search/searchInterfaces"

const mergeModels = (modelsObject: SortedManModel[]) => {
    return modelsObject.map(each => {return {

        man_id: each.man_id,
        man_name: each.man_name,
        models_group: 
        each.models_group.map(each => {
            const everyModelArr:Model[][] = []
             Object.entries(each).forEach(([_,a]) => everyModelArr.push(a))
            

           return everyModelArr.flat()
    
        }).flat()
    }})
}

export default mergeModels;