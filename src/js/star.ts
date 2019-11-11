import { Planet } from "./planet";
import { Vector } from "./vector";
import { Object } from "./object";

export class Star implements Object
{
    public planets: Planet[];
    public radius: number;
    public pos: Vector;

    //Radii in AU
    constructor(radius: number, height: number, width: number)
    {  
        this.radius = radius;
        this.pos = new Vector(width/2, height/2);
    }

    public draw(ctx: CanvasRenderingContext2D, alpha: number) 
    {        
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.radius * alpha, this.radius * alpha, 0, 0, 2 * Math.PI)
        ctx.fillStyle = 'yellow';
        ctx.fill();
    }

    public update(time: number): void
    {

    }
}