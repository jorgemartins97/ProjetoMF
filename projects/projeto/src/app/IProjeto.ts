export class Projeto {
    id: number;
    name: string;
    startDate: Date | null;
    endDate: Date |null;

    constructor(id: number, name: string, startDate: Date, endDate: Date) {
        this.id = id;
        this.name = name;
        this.startDate = startDate;
        this.endDate = endDate;
      }
}