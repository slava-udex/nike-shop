import { ISizeChart } from "~/shared/interfaces";
import { Table, TableBody, TableCell, TableRow } from "~/shared/ui";

interface Props {
  names: string[];
  sizeChart: ISizeChart;
}

export const SneakerSizeTable: React.FC<Props> = ({ names, sizeChart }) => {
  console.log(sizeChart);
  return (
    <Table className="border border-l-0 p-4">
      <TableBody>
        {Object.values(sizeChart).map((row, index) => (
          <TableRow className="relative" key={index}>
            <p className="sticky left-0 p-4 border-l bg-white">
              {names[index]}
            </p>
            {row.map((col, j) => (
              <TableCell key={j}>{col}</TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
