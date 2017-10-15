import * as crypto from "crypto";
import * as moment from "moment-timezone";

export default class Utils{

    public static genRandomID() {
        return crypto.createHash('md5').update(crypto.randomBytes(16)).digest('hex');
    }


    /**
     * Merge object `b` with object `a`.
     *
     * @param a
     * @param  b
     * @return a
     */

    public static merge(a, b){
        let keys = Object.keys(b);
        for (let i = 0, len = keys.length; i < len; ++i) {
            let key = keys[i];
            a[key] = b[key]
        }
        return a;
    };

    public static unixDateTime(date: Date){
        return moment.utc(date).valueOf();
    }

}