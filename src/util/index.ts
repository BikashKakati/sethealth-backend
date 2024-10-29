import { ZodIssue } from "zod";

interface FormattedListType {
    errorField:string|number,
    errorMessage:string,
}

export const getFormattedValidationErrorList = (dataList:ZodIssue[]):FormattedListType[]=> {
    return dataList.map((item)=> {
        return {
            errorField:item.path[0],
            errorMessage:item.message
        }
    })
}


