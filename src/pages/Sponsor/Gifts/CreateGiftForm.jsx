import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import useFetch from "@/hooks/useFetch";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";

const fetchBooth = () =>
  fetch(`${import.meta.env.VITE_API_KEY}/api/Booth?page=1&pageSize=10000`);
export function CreateGiftForm({ onCreate }) {
  const sponsorId = useAuthStore((state) => state.userId);
  const [responseBooth] = useFetch(fetchBooth);

  const booths = responseBooth
    ? responseBooth?.data?.listData.filter((e) => e.sponsorId == sponsorId)
    : [];
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [boothId, setBoothId] = useState("");

  const handleSave = async () => {
    try {
      const newGift = {
        name,
        description,
        quantity,
        boothId,
      };

      onCreate(newGift);

      setName("");
      setDescription("");
      setQuantity("");
      setBoothId("");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Create Gift</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create gift</DialogTitle>
          <DialogDescription>
            Create a gift here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              placeholder="Enter user name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantity" className="text-right">
              Quantity
            </Label>
            <Input
              id="quantity"
              type="number"
              placeholder="Enter quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="booth" className="text-right">
              Booth
            </Label>
            <Select value={boothId} onValueChange={setBoothId}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a booth" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {booths &&
                    booths.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                  {/* <SelectItem value="Visitor">Visitor</SelectItem> */}
                  {/* <SelectItem value={3}>Sponsor</SelectItem>
                  <SelectItem value={1}>Event Operator</SelectItem>
                  <SelectItem value={2}>Checking Staff</SelectItem> */}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              className="bg-blue-500 hover:bg-blue-600"
              onClick={handleSave}
            >
              Save
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
