import { Ticket, Users, Box } from "lucide-react";
import { Routers } from "@/config/RouterConfig";

export const AdminLinks = [
  {
    icon: <Users className="h-5 w-5" />,
    label: Routers.admin.userManagement.label,
    route: Routers.admin.userManagement.route,
  },
  {
    icon: <Ticket className="h-5 w-5" />,
    label: Routers.admin.events.label,
    route: Routers.admin.events.route,
  },
];
export const StaffLinks = [
  {
    icon: <Ticket className="h-5 w-5" />,
    label: Routers.staff.events.label,
    route: Routers.staff.events.route,
  },
];
export const SponsorLinks = [
  {
    icon: <Ticket className="h-5 w-5" />,
    label: Routers.sponsor.events.label,
    route: Routers.sponsor.events.route,
  },
  {
    icon: <Box className="h-5 w-5" />,
    label: Routers.sponsor.gifts.label,
    route: Routers.sponsor.gifts.route,
  },
  {
    icon: <Box className="h-5 w-5" />,
    label: Routers.sponsor.booths.label,
    route: Routers.sponsor.booths.route,
  },
];
export const EventOperatorLinks = [
  {
    icon: <Ticket className="h-5 w-5" />,
    label: Routers.eventOperator.events.label,
    route: Routers.eventOperator.events.route,
  },
];
export const UsersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    password: "********",
    status: "Active",
    role: "Visitor",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    password: "********",
    status: "Inactive",
    role: "Sponsor",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    password: "********",
    status: "Active",
    role: "Event Operator",
  },
  {
    id: 4,
    name: "Bob Brown",
    email: "bob@example.com",
    password: "********",
    status: "Pending",
    role: "Checking Staff",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    password: "********",
    status: "Active",
    role: "Visitor",
  },
  {
    id: 6,
    name: "Daniel Edwards",
    email: "daniel@example.com",
    password: "********",
    status: "Inactive",
    role: "Sponsor",
  },
  {
    id: 7,
    name: "Ella Fitzgerald",
    email: "ella@example.com",
    password: "********",
    status: "Active",
    role: "Event Operator",
  },
  {
    id: 8,
    name: "Frank Green",
    email: "frank@example.com",
    password: "********",
    status: "Pending",
    role: "Checking Staff",
  },
  {
    id: 9,
    name: "Grace Harris",
    email: "grace@example.com",
    password: "********",
    status: "Active",
    role: "Visitor",
  },
  {
    id: 10,
    name: "Henry Ivy",
    email: "henry@example.com",
    password: "********",
    status: "Inactive",
    role: "Sponsor",
  },
];

export const EventsData = [
  {
    id: 1,
    title: "Annual Company Picnic",
    startDate: "2024-08-01",
    endDate: "2024-08-02",
    description:
      "A day of fun and team-building activities for employees and their families.",
    status: "Upcoming",
    creator: "John Smith",
  },
  {
    id: 2,
    title: "Quarterly Business Review",
    startDate: "2024-08-05",
    endDate: "2024-08-06",
    description:
      "Review of the company's performance and strategies for the next quarter.",
    status: "Ongoing",
    creator: "Peter Johnson",
  },
  {
    id: 3,
    title: "Product Launch Event",
    startDate: "2024-08-10",
    endDate: "2024-08-11",
    description:
      "Launch event for the new product line with presentations and demonstrations.",
    status: "Completed",
    creator: "Mary Brown",
  },
  {
    id: 4,
    title: "Annual Sales Conference",
    startDate: "2024-08-15",
    endDate: "2024-08-16",
    description:
      "Conference for the sales team to discuss targets, strategies, and success stories.",
    status: "Upcoming",
    creator: "Alice Davis",
  },
  {
    id: 5,
    title: "Charity Gala",
    startDate: "2024-08-20",
    endDate: "2024-08-21",
    description:
      "A fundraising event with dinner, entertainment, and auctions to support local charities.",
    status: "Ongoing",
    creator: "Bob Wilson",
  },
];
