import { Orbit } from "./orbit";
import { Satelite } from "./satellite";
import { Object} from "./object";
import { Vector } from "./vector";

export class Planet implements Object {

    public radius: number;
    public pos: Vector;
    private satellites: Satelite[];
    private orbit: Orbit;
    public rotation: number;
    private dist: number;
    private velocity: Vector;
    private direction: Vector;
    private angle: number;
    public type: string;
    public name: string;

    constructor(radius: number, starPos: Vector, per: number, aph: number, rotation: number, type: string, name: string) 
    {
        this.type = type;
        this.name = name;
        this.velocity = new Vector(0,0);
        
        this.orbit = new Orbit(per, aph, starPos);
        this.pos = new Vector(this.orbit.fociConstant,this.orbit.minor);
        this.radius = radius;
        this.rotation = rotation;
        this.orbit.calcSemiLatus(new Vector(starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        this.dist = this.orbit.calcDist(new Vector(starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        this.angle = this.orbit.calcHeliocentricAngle(new Vector(starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        this.direction = this.calcDirection(starPos);
    }

    public draw(ctx: CanvasRenderingContext2D, alpha: number, starPos: Vector): void
    {
        
        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(this.rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);

        // ctx.beginPath();            
        // ctx.ellipse(starPos.x + this.pos.x * alpha, starPos.y + this.pos.y * alpha, this.radius * alpha, this.radius * alpha, 0, 0, Math.PI * 2);
        // ctx.fillStyle = 'black';
        // ctx.fill();  
        
        let image = <HTMLImageElement> document.getElementById(this.type);
        ctx.drawImage(image, starPos.x + (this.pos.x - this.radius) * alpha, starPos.y + (this.pos.y - this.radius) * alpha, 2*this.radius * alpha, 2* this.radius * alpha);

        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(-this.rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);                  
    }

    public drawOrbit(ctx: CanvasRenderingContext2D, alpha: number, starPos: Vector): void
    {
        this.orbit.draw(ctx, alpha, starPos, this.pos, this.rotation);
    }

    public update(time: number, starPos: Vector, alpha: number): void
    {
        let speed = 5;
        this.dist = this.orbit.calcDist(new Vector(starPos.x + this.pos.x, starPos.y - this.pos.y), starPos);
        let angleOffset = (speed/(Math.pow(this.dist,2)) * time/1000);


        this.angle += angleOffset;
        this.pos.x = (this.orbit.major * Math.cos(this.angle) + this.orbit.major * this.orbit.eccentricity);
        this.pos.y = (this.orbit.minor * Math.sin(this.angle));

    }

    public getOrbit(): Orbit
    {
        return this.orbit;
    }

    public calcVelocity(starPos: Vector): Vector
    {
        let vel = new Vector(0,0);
        let angle = this.orbit.calcHeliocentricAngle(new Vector(starPos.x - this.pos.x, starPos.y - this.pos.y), starPos);
        
        this.dist = this.orbit.calcDist(new Vector(starPos.x - this.pos.x, starPos.y - this.pos.y), starPos);

        vel.x = (Math.sqrt(0.001*this.orbit.major)/this.dist) * (Math.sin(angle));
        vel.y = (Math.sqrt(0.001*this.orbit.major)/this.dist) * (Math.sqrt(1 - Math.pow(this.orbit.eccentricity,2)) * Math.cos(angle));
        
        return vel;
    }

    public calcDirection(starPos: Vector): Vector
    {
        let dir = new Vector(this.pos.x - starPos.x, this.pos.y - starPos.y);
        return new Vector(dir.x / dir.magnitude(), dir.y / dir.magnitude());
    }
}