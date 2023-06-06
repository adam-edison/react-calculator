const rows: number[][] = [[7, 8, 9], [4, 5, 6], [1, 2, 3], [0]];

export const Calculator = () => (
  <div>
    <h1>Calculator</h1>
    <div role="grid">{rows.map(buttonRow)}</div>
  </div>
);

const buttonRow = (row: number[]) => {
  return (
    <div role="row" key={row.toString()}>
      {row.map((n) => (
        <button key={`button${n}`}>{String(n)}</button>
      ))}
    </div>
  );
};
