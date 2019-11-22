import { Planet } from "./planet";
import { Vector } from "./vector";
import { Object } from "./object";
import { StarType } from "./startype";

export class Star implements Object
{
    public planets: Planet[];
    public radius: number;
    public pos: Vector;
    public type: StarType;
    public name: string

    //Radii in AU
    constructor(radius: number, height: number, width: number, type: string, name: string)
    {  
        this.radius = radius;
        this.pos = new Vector(width/2, height/2);
        this.type = new StarType(type);
        this.name = name;
    }

    public draw(ctx: CanvasRenderingContext2D, alpha: number) 
    {        
        ctx.beginPath();
        ctx.ellipse(this.pos.x, this.pos.y, this.radius * alpha, this.radius * alpha, 0, 0, 2 * Math.PI)
        ctx.fillStyle = 'white';
        ctx.fill();

        let image = <HTMLImageElement> document.getElementById(this.type.image);
        ctx.drawImage(image, this.pos.x-this.radius*alpha, this.pos.y-this.radius*alpha, 2*this.radius * alpha, 2*this.radius * alpha)
    }

    public update(time: number): void
    {

    }
}