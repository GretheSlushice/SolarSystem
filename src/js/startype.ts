export class StarType
{
    public image: string;

    constructor(type: string)
    {
        this.image = this.getImage(type);
    }

    private getImage(type: string): string 
    {
        if (type == "Sun")
        {
            return "sun";
        }        
        else if (type == "white")
        {
            return "white";
        }
        else
        {
            return "";
        }
    }
}