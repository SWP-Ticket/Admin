import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import { useState, useEffect } from "react";
import useFetch from "@/hooks/useFetch";
import { useAuthStore } from "@/stores/auth.store";

const fetchBooth = () =>
  fetch(`${import.meta.env.VITE_API_KEY}/api/Booth?page=1&pageSize=10000`);
function EditGiftForm({ gift, onClose, onSave }) {
  const sponsorId = useAuthStore((state) => state.userId);
  const [responseBooth] = useFetch(fetchBooth);

  const booths = responseBooth
    ? responseBooth?.data?.listData.filter((e) => e.sponsorId == sponsorId)
    : [];
  const [name, setName] = useState(gift.name);
  const [description, setDescription] = useState(gift.description);
  const [quantity, setQuantity] = useState(gift.quantity);
  const [boothId, setBoothId] = useState(gift.boothId);

  // Update the form fields if the user prop changes
  useEffect(() => {
    setName(gift.name);
    setDescription(gift.email);
    setQuantity(gift.quantity);
    setBoothId(gift.boothId);
  }, [gift]);

  const handleSave = async () => {
    try {
      // Update user object with new values
      const updatedGift = {
        ...gift,
        name,
        description,
        quantity,
        boothId,
      };

      onSave(updatedGift);

      onClose();
    } catch (err) {
      console.log("Error:", err);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit gift</DialogTitle>
          <DialogDescription>
            Edit the gift details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
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
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {booths &&
                    booths.map((e) => (
                      <SelectItem key={e.id} value={e.id}>
                        {e.name}
                      </SelectItem>
                    ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleSave}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default EditGiftForm;
