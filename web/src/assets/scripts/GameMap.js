import { AcGameObject } from "./AcGameObject";
import { Wall } from "./Wall";
import { Snake } from "./Snake";


export class GameMap extends AcGameObject {
    constructor(ctx, parent) {
        super();
 
        this.ctx = ctx;
        this.parent = parent;
        this.L = 0;
 
        this.rows = 13;
        this.cols = 14;
 
        this.inner_walls_count = 50;
        this.walls = [];

        this.snakes = [
            new Snake({id: 0, color: "#4876ec", r: this.rows - 2, c: 1}, this),
            new Snake({id: 1, color: "#f94848", r: 1, c: this.cols - 2}, this),
        ];
    }
 
    // flood fill算法
    // 参数 ，图 ，起点的x,y 重点的x, y
    check_connectivity(g, sx, sy, tx, ty) {
        if (sx == tx && sy == ty) return true;
        g[sx][sy] = true;
 
        let dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1];
        for (let i = 0; i < 4; i ++ ) {
            let x = sx + dx[i], y = sy + dy[i];
            if (!g[x][y] && this.check_connectivity(g, x, y, tx, ty)) 
                return true;
        }
 
        return false;
     }
 
    creat_walls() {
        // 墙 true 无 false
        const g = [];
        for (let r = 0; r < this.cols; r ++ ) {
            g[r] = [];
            for (let c = 0; c < this.cols; c ++ ) {
                g[r][c] = false;
            }
        }
 
        //给四周加上墙
        for (let r = 0; r < this.rows; r ++ ) {
            g[r][0] = g[r][this.cols - 1] = true;
        }
 
        for (let c = 0; c < this.cols; c ++ ) {
            g[0][c] = g[this.rows - 1][c] = true;
        }
 
        // 创建随机障碍物
        for (let i = 0; i < this.inner_walls_count / 2; i ++ ) {
            for (let j = 0; j < 1000; j ++ ) {
                // 随机一个数
                let r = parseInt(Math.random() * this.rows);
                let c = parseInt(Math.random() * this.cols);
                if (g[r][c] || g[this.rows - 1 - r][this.cols - 1 -c]) continue;
 
                // 排除左下角和右上角
                if (r == this.rows - 2  && c == 1|| r == 1 && c == this.cols - 2)
                    continue;
                // 对称
                g[r][c] = g[this.rows - 1 - r][this.cols - 1 - c] = true;
                break;
            }
        }
 
        
        // 你得到了一个和 g 内容完全一样、但内存地址完全独立的深拷贝副本 —— copy_g，防止原地图被 check_connectivity() 递归修改破坏。
        // 把二维数组 g 转成 JSON 字符串。再把字符串解析回一个 全新的对象（数组）。
        const copy_g = JSON.parse(JSON.stringify(g)); 
        // 判断是否连通
        if (!this.check_connectivity(copy_g, this.rows - 2, 1, 1, this.cols - 2)) return false;
 
        for (let r = 0; r < this.rows; r ++ ) {
            for (let c = 0; c < this.cols; c ++ ) {
                if (g[r][c]) {
                    this.walls.push(new Wall(r, c, this));
                }
            }
        }
 
        return true;
    }

    add_listening_events() {
        this.ctx.canvas.focus();
 
        const [snake0, snake1] = this.snakes;
        this.ctx.canvas.addEventListener("keydown", e => {
            if (e.key === 'w') snake0.set_direction(0);
            else if (e.key === 'd') snake0.set_direction(1);
            else if (e.key === 's') snake0.set_direction(2);
            else if (e.key === 'a') snake0.set_direction(3);
            else if (e.key === 'ArrowUp') snake1.set_direction(0);
            else if (e.key === 'ArrowRight') snake1.set_direction(1);
            else if (e.key === 'ArrowDown') snake1.set_direction(2);
            else if (e.key === 'ArrowLeft') snake1.set_direction(3);
        });
    }
 
    start() {
        /*
        解释一下，为什么this.creat_walls()放到start中，不放到updata中。
        this.create_walls()放在update()里和Wall.update()每帧绘制墙面，乍一看好像都是“每帧重新画”，但本质上完全不一样，区别很大。

        1. Wall.update() 是“绘制墙”
            每帧调用 Wall.update() 里的 render()，只是让已经存在的墙对象重新在画布上画一次。
            这些墙对象已经创建好了，内存和对象实例都固定。
            相当于在给画布“涂颜色”，刷新显示。
        2. this.create_walls() 是“生成新墙对象”+“加入游戏”

            create_walls() 里做了两件事：
            1> 生成新的墙数据（随机坐标、对称性等）。
            2> 用 new Wall(...) 创建大量新的墙对象，这些对象会被加入全局游戏更新列表。

            如果每帧都调用 create_walls()，就意味着：
            1> 每帧都创建一大批新的墙对象，对象数量不断增加。
            2> 旧的墙对象没销毁，导致内存泄漏。
            3> 游戏更新列表里的对象越来越多，性能大幅下降。
            4> 画面上的墙会越来越多，甚至画面混乱。
        
        */
        for (let i = 0; i < 1000; i ++ )
            if (this.creat_walls())
                break;
        
        this.add_listening_events();
    }
 
    update_size() {
        // 计算小正方形的边长
        this.L = parseInt(Math.min(this.parent.clientWidth / this.cols, this.parent.clientHeight / this.rows));
        this.ctx.canvas.width = this.L * this.cols;
        this.ctx.canvas.height = this.L * this.rows;
    }

    check_ready() { 
        // 判断两条蛇是否准备下一回合了
        for (const snake of this.snakes) {
            if (snake.status !== "idle") return false;
            if (snake.direction === -1) return false;
        }
        return true;  
    }

    next_step() {
        for (const snake of this.snakes) {
            snake.next_step();
        }
    }

    check_valid(cell) {  // 检测目标位置是否合法：没有撞到两条蛇的身体和障碍物
        for (const wall of this.walls) {
            if (wall.r === cell.r && wall.c === cell.c)
                return false;
        }
 
        for (const snake of this.snakes) {
            let k = snake.cells.length;
            if (!snake.check_tail_increasing()) {  // 当蛇尾会前进的时候，蛇尾不要判断
                k -- ;
            }
            for (let i = 0; i < k; i ++ ) {
                if (snake.cells[i].r === cell.r && snake.cells[i].c === cell.c)
                    return false;
            }
        }
 
        return true;
    }
 
    update() {
        this.update_size();
        if (this.check_ready()) {
            this.next_step();
        }
        this.render();
    }
    
 
    render() {
        // 取颜色
        const color_eve = "#AAD751", color_odd = "#A2D149";
        // 染色
        for (let r = 0; r < this.rows; r ++ ){
            for (let c = 0; c < this.cols; c ++ ) {
                if ((r + c) % 2 == 0) {
                    this.ctx.fillStyle = color_eve;
                } else {
                    this.ctx.fillStyle = color_odd;
                }
                //左上角左边，明确canvas坐标系
                this.ctx.fillRect(c * this.L, r * this.L, this.L, this.L);
            }
        }
    }
}