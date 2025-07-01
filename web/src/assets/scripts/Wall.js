import { AcGameObject } from "./AcGameObject";
 
export class Wall extends AcGameObject {
    // Wall 构造函数中的 gamemap 参数，是创建它的那个 GameMap 实例，这样每个 Wall 都能访问到自己的地图上下文、格子大小、画布等信息。
    constructor(r, c, gamemap) {
        super();
 
        this.r = r;
        this.c = c;
        this.gamemap = gamemap;
        this.color = "#B37226";
    }
 
    update() {
        this.render();
    }
 
    render() {
        const L = this.gamemap.L;
        const ctx = this.gamemap.ctx;
 
        ctx.fillStyle = this.color;
        ctx.fillRect(this.c * L, this.r * L, L, L);
    }
}