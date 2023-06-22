const mapping: Record<string, string> = {
  companies: 'company',
  'leave-requests': 'leave_request',
  'leave-types': 'leave_type',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
