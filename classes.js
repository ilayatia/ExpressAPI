import {v4 as uuidv4} from 'uuid'
import _ from 'lodash';
export class InMemorySharedStorage{
    constructor(){
        this.collections = {}
    }
    print(){
        console.log(this.collections)
    }
    
    create(collection_name, item){
        item.uuid = uuidv4()
        if (collection_name in this.collections){
            return "error"
        }
        else{
            this.collections[collection_name] = [item]
            return item
        }
        
    }
    find(collection_name , find_cb){
        let output = []
        for (const i of this.collections[collection_name]){
            if (find_cb(i)){
                output.push(i)
            }
        }
        return output
    }
    add(collection_name,item){
        item.uuid = uuidv4()
        if (collection_name in this.collections){
            this.collections[collection_name].push(item);
            return item
        }
        else{
            this.collections[collection_name] = [item]
            return item
        }
    }
    where(collection_name , where){
        return this.find(collection_name,(obj)=>{return _.isEqual(obj,where)})
    }
    remove(collection_name , remove_cb){
        const to_return = this.find(collection_name,remove_cb)
        for (const i of this.collections[collection_name]){
            if (remove_cb(i)){
                this.collections[collection_name].splice(this.collections[collection_name].indexOf(i),1)
            }
        }
        return to_return
    }
}
export class InMemoryStorage{
    constructor(){
    }    
    print(name){
        console.log(this[name])
    }
    create(collection_name, item){
        item.uuid = uuidv4()
        this[collection_name] = [item]
        return item
    }
    find(collection_name , find_cb){
        let output = []
        for (const i of this[collection_name]){
            if (find_cb(i)){
                output.push(i)
            }
        }
        return output
    }
    where(collection_name , where){
        return this.find(collection_name,(obj)=>{return _.isEqual(obj,where)})
    }
    remove(collection_name , remove_cb){
        const to_return = this.find(collection_name,remove_cb)
        for (const i of this[collection_name]){
            if (remove_cb(i)){
                this[collection_name].splice(this[collection_name].indexOf(i),1)
            }
        }
        return to_return
    }
    add(collection_name,item){
        item.uuid = uuidv4()
        this[collection_name].push(item);
        return item
    }
}