export const Routers = {
  landing: {
    label: null,
    route: "/",
  },

  admin: {
    userManagement: {
      label: "User Management",
      route: "/admin/user-management",
    },
    events: {
      label: "Events",
      route: "/admin/events",
    },
  },
  staff: {
    events: {
      label: "Events",
      route: "/staff/events",
    },
    event: {
      label: "Event",
      route: "/staff/events/:eventId",
    },
  },
  sponsor: {
    events: {
      label: "Events",
      route: "/sponsor/events",
    },
    event: {
      label: "Event",
      route: "/sponsor/events/:eventId",
    },
    gifts: {
      label: "Gifts",
      route: "/sponsor/gifts",
    },
    booths: {
      label: "Booths",
      route: "/sponsor/booths",
    },
  },
  eventOperator: {
    events: {
      label: "Events",
      route: "/event-operator/events",
    },
  },
};
