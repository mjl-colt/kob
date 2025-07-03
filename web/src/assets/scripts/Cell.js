export class Cell {
    constructor(r, c) {
        this.r = r;
        this.c = c;
        // 转换为 canvas 的坐标,x和y是反着的。
        this.x = c + 0.5;  
        this.y = r + 0.5;
    }
}