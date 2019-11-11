import { Vector } from "./vector";

export interface Object
{
    pos: Vector;
    radius: number;

    draw(ctx: CanvasRenderingContext2D, alpha: number, starPos: Vector): void
    update(time: number, starPos: Vector, alpha: number): void
}