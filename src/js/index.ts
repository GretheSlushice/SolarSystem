import { Star } from "./star";
import { Object } from "./object";
import { Planet } from "./planet";

export class Engine 
{   
    public height: number;
    public width: number;

    private canvas: HTMLCanvasElement;
    public ctx: CanvasRenderingContext2D;

    private date: Date = new Date();
    private timeZero: number = this.date.getTime();
    private timeNow: number;

    private objects: Planet[] = new Array<Planet>();
    private star: Star;
    private alpha: number;

    constructor() 
    {
        this.canvas = <HTMLCanvasElement> document.getElementById("content");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.height = window.innerHeight - 20;
        this.canvas.width = window.innerWidth - 20;

        this.height = this.canvas.height;
        this.width = this.canvas.width;

        
        this.star = new Star(0.6650467262205, this.height, this.width);
        this.objects.push(new Planet(0.4263496513594, this.star.pos, 3, 5.01, 90));
        this.objects.push(new Planet(0.18263496513594, this.star.pos, 5, 7, 50));
        this.objects.push(new Planet(0.08263496513594, this.star.pos, 3, 10, 180));
        this.calcAlpha();

        this.loop();
    }

    private loop()
    {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
        
        this.date = new Date();
        this.timeNow = this.date.getTime()
        var time = this.timeNow - this.timeZero;
        this.timeZero = this.timeNow;

        this.star.draw(this.ctx, this.alpha)
        this.objects.forEach(element => {
            element.draw(this.ctx, this.alpha, this.star.pos);

            element.update(time, this.star.pos, this.alpha);
        });

        window.requestAnimationFrame(this.loop.bind(this));
    }

    private calcAlpha(): void
    {
        let totalHeight = 0;
        this.objects.forEach(element => {
            let i = element.getOrbit().calcMajor();
            if (i > totalHeight) totalHeight = i;       
        });
        //totalHeight += 0.5;
        this.alpha = this.height / (3 * totalHeight);
    } 
}

new Engine();