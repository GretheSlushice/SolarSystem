import { Vector } from "./vector";

export class Orbit
{
    public perihelion: number;
    public aphelion: number;
    public major: number;
    public minor: number;
    public fociConstant: number;
    public semiLatusRectum: number;
    public eccentricity: number;
    private orbitOrigo: Vector

    constructor(per: number, aph: number, starPos: Vector)
    {
        this.perihelion = per;
        this.aphelion = aph;
        this.eccentricity = this.calcEccentricity();
        this.minor = this.calcMinor();
        this.major = this.calcMajor();
        this.fociConstant = this.calcFociConstant();
        this.orbitOrigo = new Vector(starPos.x + this.fociConstant, starPos.y)
    }

    public draw(ctx: CanvasRenderingContext2D, alpha: number, starPos: Vector, planetPos: Vector, rotation: number): void
    {        
        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);

        ctx.beginPath();
        this.orbitOrigo = new Vector(starPos.x + this.fociConstant * alpha, starPos.y)
        ctx.ellipse(starPos.x + this.fociConstant * alpha, starPos.y, this.major * alpha, this.minor * alpha, 0, 0, Math.PI * 2);
        ctx.strokeStyle = "black";
        ctx.stroke();

        ctx.translate(starPos.x, starPos.y);
        ctx.rotate(-rotation * Math.PI / 180);
        ctx.translate(-starPos.x, -starPos.y);
    }

    public calcMinor(): number 
    {
        let minor = Math.sqrt(this.aphelion * this.perihelion)
        return minor;
    }

    public calcMajor(): number 
    {
        let major = (this.aphelion + this.perihelion) / 2
        return major;
    }

    public calcFociConstant(): number
    {
        let constant = Math.sqrt(Math.pow(this.major, 2) - Math.pow(this.minor, 2));
        return constant;
    }

    public calcSemiLatus(planetPos: Vector, starPos: Vector): void
    {
        let origoToStar = new Vector(starPos.x - this.orbitOrigo.x, starPos.y - this.orbitOrigo.y);
        let starToPlanet = new Vector(planetPos.x - starPos.x, planetPos.y - starPos.y);
        let angle = origoToStar.angle(starToPlanet);
        
        this.semiLatusRectum = starToPlanet.magnitude() * (1 + Math.cos(angle));
        //console.log(this.semiLatusRectum);
    }

    public calcEccentricity(): number
    {
        let eccentricity = (this.aphelion - this.perihelion) / (this.aphelion + this.perihelion);
        return eccentricity;
    }

    public calcHeliocentricAngle(planetPos: Vector, starPos: Vector): number
    {
        let origoToStar = new Vector(starPos.x - this.orbitOrigo.x, starPos.y - this.orbitOrigo.y);
        let starToPlanet = new Vector(planetPos.x - starPos.x, planetPos.y - starPos.y);
        let angle = origoToStar.angle(starToPlanet);
        return angle;
    }

    public calcDist(planetPos: Vector, starPos: Vector): number
    {
        let angle = this.calcHeliocentricAngle(planetPos, starPos);
        let dist = this.semiLatusRectum / (1 + this.eccentricity * Math.cos(angle));

        return dist;
    }
}