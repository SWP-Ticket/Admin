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
import { useMemo } from "react";

function GiftForm({ user, onClose, onSave }) {
  const sponsorId = useAuthStore((state) => state.userId);

  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const itemList = useMemo(() => {
    console.log(searchValue);
    if (searchValue.length === 0) return data;

    return data.filter(({ title }) =>
      title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [searchValue, data]);

  const [giftId, setGiftId] = useState();

  // Update the form fields if the user prop changes

  const handleSave = async () => {
    try {
      // Update user object with new values
      const updatedGift = {
        attendeeId: user?.id,
        giftId,
        receptionDate: new Date().toISOString(),
      };

      onSave(updatedGift);

      onClose();
    } catch (err) {
      console.log("Error:", err);
    }
  };
  useEffect(() => {
    fetch(
      `https://ticketswp-cvb4bhguf9fmbte2.eastus-01.azurewebsites.net/api/Gift/Sponsor/${sponsorId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setData(data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create gift</DialogTitle>
          <DialogDescription>
            Create the gift details here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="gift" className="text-right">
              Gift
            </Label>
            <Select value={giftId} onValueChange={setGiftId}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a gift" />
              </SelectTrigger>
              <SelectContent>
                <input
                  className="SelectSearchInput"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.currentTarget.value ?? "");
                  }}
                  placeholder="Search Item ..."
                />
                <SelectGroup>
                  {itemList &&
                    itemList.map((e) => (
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

export default GiftForm;
