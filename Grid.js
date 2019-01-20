class Grid {

    constructor(settings){

        this.settings = settings;
        this.finished = false;
        this.antpos = {
            x: Math.ceil(settings.cols / 2),
            y: Math.ceil(settings.rows / 2)
        };
        this.antHead = {
            x: 0,
            y: 1
        };
        this.cells = Array(settings.cols);
        for (let i = 0; i < settings.cols; i++) {
            this.cells[i] = Array(settings.rows).fill(-1);
        }

    }

    step(){

        if(this.finished) return;

        this.cells[this.antpos.x][this.antpos.y] = (this.cells[this.antpos.x][this.antpos.y] + 1) % this.settings.rules.length;

        let rotation = this.settings.rules[this.cells[this.antpos.x][this.antpos.y]].rotation;
        let newHead = {
            x: - rotation * this.antHead.y,
            y: rotation * this.antHead.x
        };

        this.antHead = newHead;
        this.antpos.x += this.antHead.x;
        this.antpos.y += this.antHead.y;

        this.finished = this.antpos.x >= this.settings.cols || this.antpos.y >= this.settings.rows;
        if (this.finished) return;
    }

    draw(ctx){
        let width = this.settings.width;
        let height = this.settings.height;

        let cols = this.settings.cols;
        let rows = this.settings.rows;

        let cellWidth = width / cols;
        let cellHeight = height / rows;

        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let x1 = i * cellWidth;
                let y1 = j * cellHeight;

                ctx.fillStyle = this.cells[i][j] === -1 ? '#595959' :this.settings.rules[this.cells[i][j]].color;
                ctx.fillRect(x1, y1, cellWidth, cellHeight)

            }
        }

        ctx.strokeStyle = '#ffffff';
        for (let i = 0; i <= cols; i++) {
            let x = Math.floor(i*cellWidth) + 0.5;
            this.line(ctx, x, 0, x, height);
        }

        for (let i = 0; i <= rows; i++) {
            let y = Math.floor(i*cellHeight) + 0.5;
            this.line(ctx, 0, y, width, y);
        }

        ctx.stroke();

        ctx.fillStyle = '#e00';
        let x = this.antpos.x * cellWidth + 0.5 * cellWidth;
        let y = this.antpos.y * cellHeight + 0.5 * cellHeight;
        let radius = 0.4 * Math.min(cellHeight, cellWidth);
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fill();


    }

    line(ctx, x1, y1, x2, y2, color){
        if(color) ctx.srokeStyle = color;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
    }


}