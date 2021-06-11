export class ObjectUtils {

    public static append(...items) {

        if (items == null || items == undefined) {
            return {}
        }

        try {

            items.forEach(item => {
                Object.assign(items[0], item);
                item = undefined;
            });
            return items[0];
        } catch (error) {
            return {}
        }
    }

    public static isEmptyObject(obj) {
        return !Object.keys(obj).length;
      }

      public static clone(obj) {
        let obj2 = Object.assign({}, obj);
        return obj2;
        // return JSON.parse(JSON.stringify(obj));
    }
}