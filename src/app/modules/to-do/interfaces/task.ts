export class Task{
    item: string;
    done: boolean;
    id?: string

    constructor(item: string, done: boolean, id?: string){
        this.done = done,
        this.item = item,
        this.id = id
    }

    isValid(validId?: boolean): boolean{
        if(validId){
            return this.item?.trim() !== '' && this?.id?.trim() !== '' && this?.id !== undefined
        }
        return this.item?.trim() !== ''
    }
}