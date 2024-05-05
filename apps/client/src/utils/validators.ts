export class InputValidator {
    static validateNumericString(value: string): boolean {
        if (value == '') {
            return true;
        }
        const pattern = /^[0-9,.]+$/;
        return pattern.test(value);
    }
}
