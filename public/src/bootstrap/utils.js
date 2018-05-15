Array.prototype.remove = function (item) {
    let index = this.indexOf(item);
    if (index > -1) {
        this.splice(index, 1);
    }
};