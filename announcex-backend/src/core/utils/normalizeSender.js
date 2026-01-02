export function normalizeSender(sender) {
  if (!sender || sender.deletedAt) {
    return {
      id: null,
      name: "Deleted User",
      email: null,
      role: "ADMIN",
    };
  }

  return {
    id: sender._id,
    name: sender.name,
    email: sender.email,
    role: sender.role,
  };
}
