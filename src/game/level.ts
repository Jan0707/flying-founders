class Level {
    name: string;
    targets: any[];
    objectsMovable: any[];
    objectsStatic: any[];
    slingPosition: {x: number, y: number};

    getAllBodies(): [any] {
        return this.targets
            .concat(this.objectsMovable)
            .concat(this.objectsStatic);
    }
}

export { Level };
