export class Vector 
{
    public x: number;
    public y: number;

    constructor(x: number, y: number) 
    {
        this.x = x;
        this.y = y;
    }

    public magnitude(): number
    {
        let mag = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2));
        //console.log(mag);
        return mag
    }

    public dot(otherVector: Vector): number
    {
        let dot = this.x * otherVector.x + this.y * otherVector.y;
        //console.log(dot)
        return dot;
    }

    public angle(otherVector: Vector): number
    {
        let dot = this.dot(otherVector);
        return Math.acos(dot / (this.magnitude() * otherVector.magnitude()));
    }
}