export interface ApiError {
  message: string;
}

export interface UserProfile {
  email: string;
  role: "user" | "admin";
  createdAt: Date;
}
