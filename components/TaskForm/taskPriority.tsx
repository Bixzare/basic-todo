import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function TaskPriority() {
  return (
    
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="None"  defaultChecked />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="1">Low</SelectItem>
        <SelectItem value="2">Med</SelectItem>
        <SelectItem value="3">High</SelectItem>
      </SelectContent>
    </Select>
  );
}
