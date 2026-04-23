export interface User {
  id: string;
  cardId: string;
  name: string;
  phone?: string;
  role: "patient" | "admin";
}
