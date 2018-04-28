
interface DropFunc {
    (e:any):void
}

interface DropOption {
    el: Element,
    onDrop?: DropFunc
}


function readEntitys(entitys:Array<any>){
    return Promise.all(entitys.map((entity)=>{
        return new Promise((resolve, reject)=>{
            if(entity.isDirectory){
                //
                
                let dirReader = entity.createReader();
                dirReader.readEntries((results:Array<any>)=>{
                    readEntitys(results).then((list)=>{
                        resolve({name:entity.name,childs:list})
                    })
                })

            }else{
                entity.file((file:File)=>{
                    resolve(file);
                })
            }
        })
    }))
}

export default function (options: DropOption) {
    let { el, onDrop } = options
    
    document.addEventListener("dragleave",function(e){
            e.preventDefault();
    })

    document.addEventListener("drop",function(e){
            e.preventDefault();
    })

    document.addEventListener("dragenter",function(e){
            e.preventDefault();
    })

    document.addEventListener("dragover",function(e){
            e.preventDefault();
    })

    el.addEventListener('drop',(e:any)=>{
        
        let fileList = e.dataTransfer.items
        readEntitys(Array.from(fileList).map((item:any)=>{
            let file = item.webkitGetAsEntry()
            return file
        })).then((results)=>{
            options.onDrop&&options.onDrop(results)
        })

        e.preventDefault()
    })
}

 