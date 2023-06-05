const numbers: number[] = [];

for (let i = 0; i <= 9; i++) {
  numbers.push(i);
}

export { numbers };

export const Calculator = () => (
  <div>
    <h1>Calculator</h1>
    {numbers.map((n) => (
      <button key={`button${n}`}>{String(n)}</button>
    ))}
  </div>
);
