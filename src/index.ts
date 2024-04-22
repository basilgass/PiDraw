import {Graph} from "./Graph";
import {NumExp} from "./Calculus";

export const PiDraw = Graph;
export const PiNum = NumExp;

(<any>window).PiDraw = PiDraw;
(<any>window).PiNum = PiNum;
