import { merge } from './merge';

describe('merge()', () => {
  // ─── Basic correctness ────────────────────────────────────────────────────

  test('merges three non-overlapping arrays', () => {
    const c1 = [1, 4, 7];        // ascending
    const c2 = [9, 6, 3];        // descending
    const c3 = [2, 5, 8];        // ascending
    expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9]);
  });

  test('merges three overlapping arrays', () => {
    const c1 = [1, 3, 5];
    const c2 = [6, 4, 2];
    const c3 = [1, 4, 7];
    expect(merge(c1, c2, c3)).toEqual([1, 1, 2, 3, 4, 4, 5, 6, 7]);
  });

  test('handles duplicate values across all three arrays', () => {
    const c1 = [2, 2, 2];
    const c2 = [2, 2, 2];
    const c3 = [2, 2, 2];
    expect(merge(c1, c2, c3)).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2]);
  });

  // ─── Edge cases ──────────────────────────────────────────────────────────

  test('all arrays empty returns empty array', () => {
    expect(merge([], [], [])).toEqual([]);
  });

  test('only collection_1 has elements', () => {
    expect(merge([1, 3, 5], [], [])).toEqual([1, 3, 5]);
  });

  test('only collection_2 has elements (descending)', () => {
    expect(merge([], [5, 3, 1], [])).toEqual([1, 3, 5]);
  });

  test('only collection_3 has elements', () => {
    expect(merge([], [], [2, 4, 6])).toEqual([2, 4, 6]);
  });

  test('two empty arrays, one with single element', () => {
    expect(merge([42], [], [])).toEqual([42]);
    expect(merge([], [42], [])).toEqual([42]);
    expect(merge([], [], [42])).toEqual([42]);
  });

  test('arrays of different lengths', () => {
    const c1 = [1, 10];
    const c2 = [8, 6, 4, 2];
    const c3 = [3, 5, 7, 9, 11];
    expect(merge(c1, c2, c3)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  });

  // ─── Negative numbers ────────────────────────────────────────────────────

  test('handles negative numbers', () => {
    const c1 = [-5, -3, 0];
    const c2 = [4, 2, -1];
    const c3 = [-4, -2, 1];
    expect(merge(c1, c2, c3)).toEqual([-5, -4, -3, -2, -1, 0, 1, 2, 4]);
  });

  test('all negative values', () => {
    const c1 = [-9, -6, -3];
    const c2 = [-1, -4, -7];
    const c3 = [-8, -5, -2];
    expect(merge(c1, c2, c3)).toEqual([-9, -8, -7, -6, -5, -4, -3, -2, -1]);
  });

  // ─── Immutability ────────────────────────────────────────────────────────

  test('does not mutate the original collection_2', () => {
    const c2 = [5, 3, 1];
    const original = [...c2];
    merge([], c2, []);
    expect(c2).toEqual(original); // must be unchanged
  });

  // ─── Result is truly ascending ────────────────────────────────────────────

  test('result is sorted in ascending order for large random-like input', () => {
    const c1 = [0, 5, 10, 15, 20];
    const c2 = [18, 13, 8, 3];
    const c3 = [1, 6, 11, 16, 21];
    const result = merge(c1, c2, c3);
    for (let i = 0; i < result.length - 1; i++) {
      expect(result[i]).toBeLessThanOrEqual(result[i + 1]);
    }
  });
});
