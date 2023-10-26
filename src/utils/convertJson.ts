export class JsonUtils {
    static convertToArrayOfObject(obj: object): object[] {
        const items: unknown[] = [];

        items.push(obj)

        for (const parentKey of Object.keys(obj)) {
            const auxRootObj: any = { [parentKey]: {} };

            for (const [key, value] of Object.entries(
                obj[parentKey as keyof typeof obj]
            )) {
                if (typeof value === "string" || typeof value === "number") {
                    auxRootObj[parentKey][key] = value;
                } else {
                    items.push({ [key]: value });
                }
            }
        }

        return items as object[];
    }
}