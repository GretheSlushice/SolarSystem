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

    public objects: Planet[] = new Array<Planet>();
    public star: Star;
    private alpha: number;

    constructor() 
    {
        this.canvas = <HTMLCanvasElement> document.getElementById("content");
        this.ctx = this.canvas.getContext("2d");

        this.canvas.height = window.innerHeight - 20;
        this.canvas.width = window.innerWidth - 20;

        this.height = this.canvas.height;
        this.width = this.canvas.width;

        
        this.star = new Star(0.650467262205, this.height, this.width, "Sun", "Sol");
        //earth
        //this.objects.push(new Planet(0.00004263496513594, this.star.pos, 0.983269343013, 1.016725701569, 0));
        
        //fictive
        //this.objects.push(new Planet(0.982, this.star.pos, 6, 7, 0, "gas", "Jupiter"));
        this.objects.push(new Planet(0.182, this.star.pos, 3, 3.1, 180, "earth", "Earth-2"));
        // this.objects.push(new Planet(0.706, this.star.pos, 2, 20, 270, "ice", "Neptune"));
        // this.objects.push(new Planet(0.506, this.star.pos, 13, 14, 50, "rock", "Venus"));
        
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

        this.calcAlpha();
        this.objects.forEach(element => {
            element.drawOrbit(this.ctx, this.alpha, this.star.pos);
        });

        this.star.draw(this.ctx, this.alpha)
        this.objects.forEach(element => {
            element.draw(this.ctx, this.alpha, this.star.pos);

            element.update(time, this.star.pos, 1);
        });

        window.requestAnimationFrame(this.loop.bind(this));
    }

    private calcAlpha(): void
    {
        let totalHeight = 0;
        this.objects.forEach(element => {
            let i = element.getOrbit().aphelion;
            i += element.radius
            if (i > totalHeight) totalHeight = i;       
        });
        //totalHeight += 1;
        this.alpha = this.height / (2 * totalHeight);
    }

    public AddNew(): void
    {
        this.objects.push(new Planet(0.182, this.star.pos, 3, 3.1, 0, "earth", "New Planet"));
    }
}