export class TestUtil {
    static randomString = (length = 10) => {
        let str = '';
        for (let i = 0; i < length; i++) {
            const newletter = 'abcdefghijklmnopqrstuvwxyz'[Math.round(Math.random() * 25)];
            str += newletter;
        }
        return str;
    }
}