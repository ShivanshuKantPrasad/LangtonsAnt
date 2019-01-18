class Grid {

    constructor(settings){

        this.settings = settings;
        this.finished = false;
        this.antpos = {
            x: Math.ceil(settings.rows / 2),
            y: Math.ceil(settings.cols / 2)
        };
        this.antHead = {
            x: 0,
            y: 1
        };
        this.cells = Array(settings.rows);
        for (let i = 0; i < settings.rows; i++) {
            this.cells[i] = Array(settings.cols).fill(0);
        }

    }

    step(){

        if(this.finished) return;

        let rotation = this.settings.rules[this.cells[this.antpos.x][this.antpos.y]].rotation;
        let newHead = {
            x: rotation * this.antHead.y,
            y: this.antHead.x
        };

        this.antHead = newHead;
        this.antpos.x += this.antHead.x;
        this.antpos.y += this.antHead.y;

        this.finished = this.antpos.x >= this.settings.rows || this.antpos.y >= this.settings.cols;


        this.cells[this.antpos.x][this.antpos.y] = (this.cells[this.antpos.x][this.antpos.y] + 1) % this.settings.rules.length;
        console.log(rotation, this.antpos, this.antHead);

    }

    draw(ctx){
        let width = this.settings.width;
        let height = this.settings.height;

        let cols = this.settings.cols;
        let rows = this.settings.rows;

        let cellWidth = width / rows;
        let cellHeight = height / cols;

        ctx.fillRect(0, 0, width, height);

        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                let x1 = i * cellWidth;
                let y1 = j * cellHeight;

                ctx.fillStyle = this.settings.rules[this.cells[i][j]].color;
                ctx.fillRect(x1, y1, cellWidth, cellHeight)

            }
        }

        ctx.strokeStyle = '#ffffff';
        for (let i = 0; i <= rows; i++) {
            let x = i*cellWidth;
            this.line(ctx, x, 0, x, height);
        }

        for (let i = 0; i <= cols; i++) {
            let y = i*cellHeight;
            this.line(ctx, 0, y, width, y);
        }

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
        ctx.stroke();
    }


}