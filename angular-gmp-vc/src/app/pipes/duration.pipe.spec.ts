import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
    const pipe = new DurationPipe();

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should transform duration from mins to `H h MMm` value (with hours)', () => {
        const minutes = 100;
        expect(pipe.transform(minutes)).toContain('h');
    });

    it('should transform duration from mins to `MMm` value (without hours)', () => {
        const minutes = 50;
        expect(pipe.transform(minutes)).not.toContain('h');
    });
});
