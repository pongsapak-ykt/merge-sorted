/**
 * Merges three integer arrays into a single sorted array (ascending).
 *
 * Preconditions:
 *   - collection_1 is sorted ascending  (min → max)
 *   - collection_2 is sorted descending (max → min)
 *   - collection_3 is sorted ascending  (min → max)
 *
 * No sort functions are used. The algorithm:
 *   1. Reverse collection_2 in-place (two-pointer swap) → ascending
 *   2. Merge all three ascending arrays with a k-way merge (min-heap style
 *      implemented manually, no Array.sort)
 */
export function merge(
  collection_1: number[],
  collection_2: number[],
  collection_3: number[]
): number[] {
  // Step 1: reverse collection_2 to make it ascending (no sort used)
  const asc2 = reverseArray(collection_2);

  // Step 2: k-way merge of three ascending arrays
  return mergeThreeAscending(collection_1, asc2, collection_3);
}

/** Reverses an array using two-pointer swap — O(n), no sort. */
function reverseArray(arr: number[]): number[] {
  const copy = [...arr];
  let left = 0;
  let right = copy.length - 1;
  while (left < right) {
    const tmp = copy[left];
    copy[left] = copy[right];
    copy[right] = tmp;
    left++;
    right--;
  }
  return copy;
}

/**
 * Merges three ascending-sorted arrays into one ascending result.
 * Uses three pointers — O(n1 + n2 + n3), no sort.
 */
function mergeThreeAscending(
  a: number[],
  b: number[],
  c: number[]
): number[] {
  const result: number[] = [];
  let i = 0; // pointer for a
  let j = 0; // pointer for b
  let k = 0; // pointer for c

  while (i < a.length || j < b.length || k < c.length) {
    // Use Infinity for exhausted arrays so they're never picked
    const va = i < a.length ? a[i] : Infinity;
    const vb = j < b.length ? b[j] : Infinity;
    const vc = k < c.length ? c[k] : Infinity;

    // Pick the smallest value among the three current heads
    if (va <= vb && va <= vc) {
      result.push(va);
      i++;
    } else if (vb <= va && vb <= vc) {
      result.push(vb);
      j++;
    } else {
      result.push(vc);
      k++;
    }
  }

  return result;
}
