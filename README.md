# merge-sorted

A TypeScript implementation of a three-array merge function that returns a single ascending-sorted array — **without using any sort function**.

## Interface

```ts
merge(collection_1: number[], collection_2: number[], collection_3: number[]): number[]
```

| Parameter | Pre-condition |
|---|---|
| `collection_1` | Sorted **ascending** (min → max) |
| `collection_2` | Sorted **descending** (max → min) |
| `collection_3` | Sorted **ascending** (min → max) |

Returns a single array sorted **ascending**.

---

## Algorithm (no sort used)

1. **Reverse `collection_2`** using a two-pointer swap → now ascending → O(n)
2. **3-way merge** with three pointers, always picking the smallest head → O(n₁ + n₂ + n₃)

Total complexity: **O(n)** where n = total number of elements.

---

## Project Structure

```
merge-sorted/
├── src/
│   ├── merge.ts          # Implementation
│   └── merge.test.ts     # Unit tests (Jest)
├── jest.config.js
├── tsconfig.json
├── package.json
└── README.md
```

---

## Setup & Run

### Prerequisites
- Node.js ≥ 16
- npm ≥ 7

### 1. Install dependencies

```bash
npm install
```

### 2. Run unit tests

```bash
npm test
```

### 3. Run tests with coverage

```bash
npm run test:coverage
```

### 4. Build (compile TypeScript → JavaScript)

```bash
npm run build
# Output goes to ./dist/
```

---

## Test Cases

| Test | Description |
|---|---|
| Non-overlapping arrays | Basic merge across 3 distinct ranges |
| Overlapping arrays | Values appear in multiple arrays |
| Duplicate values | All three arrays contain the same value |
| All empty | Edge case: `[]`, `[]`, `[]` → `[]` |
| One array only | Each of the three arrays alone |
| Single element | One element in one array |
| Different lengths | Arrays of unequal sizes |
| Negative numbers | Mix of negative and positive |
| All negative | Only negative values |
| Immutability | Original `collection_2` must not be mutated |
| Ascending order | General property test on large input |
