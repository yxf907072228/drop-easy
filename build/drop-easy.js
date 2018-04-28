var dropEasy = (function () {
'use strict';

function readEntitys(entitys) {
    return Promise.all(entitys.map((entity) => {
        return new Promise((resolve, reject) => {
            if (entity.isDirectory) {
                let dirReader = entity.createReader();
                dirReader.readEntries((results) => {
                    readEntitys(results).then((list) => {
                        resolve({ name: entity.name, childs: list });
                    });
                });
            }
            else {
                entity.file((file) => {
                    resolve(file);
                });
            }
        });
    }));
}
function index (options) {
    let { el, onDrop } = options;
    document.addEventListener("dragleave", function (e) {
        e.preventDefault();
    });
    document.addEventListener("drop", function (e) {
        e.preventDefault();
    });
    document.addEventListener("dragenter", function (e) {
        e.preventDefault();
    });
    document.addEventListener("dragover", function (e) {
        e.preventDefault();
    });
    el.addEventListener('drop', (e) => {
        let fileList = e.dataTransfer.items;
        readEntitys(Array.from(fileList).map((item) => {
            let file = item.webkitGetAsEntry();
            return file;
        })).then((results) => {
            options.onDrop && options.onDrop(results);
        });
        e.preventDefault();
    });
}

return index;

}());
//# sourceMappingURL=drop-easy.js.map
