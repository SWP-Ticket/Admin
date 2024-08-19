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
  },
  eventOperator: {
    events: {
      label: "Events",
      route: "/event-operator/events",
    },
  },
};
