import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import {cardData} from "./card-data"


export function CardTable() {
    return (
              <Table className = "size-full">
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Content</TableHead>
          <TableHead className="text-right">Footer</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cardData.map((data,index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{data.title}</TableCell>
            <TableCell>{data.description}</TableCell>
            <TableCell>{data.content}</TableCell>
            <TableCell className="text-right">{data.footer}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Total</TableCell>
          <TableCell className="text-right">$2,500.00</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
    )
}