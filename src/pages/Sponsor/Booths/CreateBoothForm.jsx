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
import { useEffect } from "react";
import { useMemo } from "react";
import { useState } from "react";

const fetchBooth = () =>
  fetch(`${import.meta.env.VITE_API_KEY}/api/Booth?page=1&pageSize=10000`);
export function CreateBoothForm({ onCreate }) {
  //====
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  const itemList = useMemo(() => {
    console.log(searchValue);
    if (searchValue.length === 0) return data;

    return data.filter(({ title }) =>
      title.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [data, searchValue]);

  //====
  const sponsorId = useAuthStore((state) => state.userId);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [eventId, setEventId] = useState();

  const handleSave = async () => {
    try {
      const newBooth = {
        sponsorId: Number(sponsorId),
        name,
        description,
        location,
        eventId,
      };

      onCreate(newBooth);

      setName("");
      setDescription("");
      setLocation("");
      setEventId("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch(
      "https://ticketswp-cvb4bhguf9fmbte2.eastus-01.azurewebsites.net/api/Event?page=1&pageSize=1000"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data.data.listData);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-600">Create Booth</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create booth</DialogTitle>
          <DialogDescription>
            Create a booth here. Click save when you're done.
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
            <Label htmlFor="locaion" className="text-right">
              Location
            </Label>
            <Input
              id="locaion"
              placeholder="Enter quantity"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="booth" className="text-right">
              Event
            </Label>

            <Select value={eventId} onValueChange={setEventId}>
              <SelectTrigger className="w-[280px]">
                <SelectValue placeholder="Select a booth" />
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
                        {e.title}
                      </SelectItem>
                    ))}
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
