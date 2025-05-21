
import { LucideIcon, MessageCircle, Users, Bot } from "lucide-react";

export interface Profile {
  id: string;
  name: string;
  avatar: string;
  kcalRatio: number;
  goalType: "Lose" | "Gain" | "Maintain";
  dailyGoal: number;
  currentKcal: number;
}

export interface Dialog {
  id: string;
  profileId: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: Date;
  unread: number;
}

export interface Meal {
  id: string;
  name: string;
  calories: number;
  image: string;
  time: string;
}

// Custom message type just for the dummy data
export interface Message {
  id: string;
  text: string;
  timestamp: Date;
  isUser: boolean;
}

export const fakeProfiles: Profile[] = [
  { id: "1", name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", kcalRatio: 0.75, goalType: "Lose", dailyGoal: 2000, currentKcal: 1500 },
  { id: "2", name: "Bob Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", kcalRatio: 0.6, goalType: "Maintain", dailyGoal: 2500, currentKcal: 1500 },
  { id: "3", name: "Carol Williams", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6", kcalRatio: 0.9, goalType: "Gain", dailyGoal: 3000, currentKcal: 2700 },
  { id: "4", name: "David Brown", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", kcalRatio: 0.4, goalType: "Lose", dailyGoal: 1800, currentKcal: 720 },
  { id: "5", name: "Eva Martinez", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9", kcalRatio: 0.8, goalType: "Maintain", dailyGoal: 2200, currentKcal: 1760 },
];

export const fakeMessages: Message[] = [
  { id: "1", text: "How's my nutrition plan going?", timestamp: new Date(2023, 4, 18, 9, 30), isUser: true },
  { id: "2", text: "You're doing great! You've met 75% of your daily goal.", timestamp: new Date(2023, 4, 18, 9, 32), isUser: false },
  { id: "3", text: "What should I eat for lunch?", timestamp: new Date(2023, 4, 18, 12, 15), isUser: true },
  { id: "4", text: "I recommend a grilled chicken salad with olive oil dressing. It's high in protein and has healthy fats.", timestamp: new Date(2023, 4, 18, 12, 17), isUser: false },
  { id: "5", text: "Thanks! I'll try that.", timestamp: new Date(2023, 4, 18, 12, 20), isUser: true },
];

export const fakeDialogs: Dialog[] = [
  { id: "1", profileId: "1", name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", lastMessage: "How's my nutrition plan going?", timestamp: new Date(2023, 4, 18, 9, 30), unread: 2 },
  { id: "2", profileId: "2", name: "Bob Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", lastMessage: "What should I eat for dinner?", timestamp: new Date(2023, 4, 17, 18, 45), unread: 0 },
  { id: "3", profileId: "3", name: "Carol Williams", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6", lastMessage: "I completed my workout!", timestamp: new Date(2023, 4, 16, 20, 10), unread: 1 },
  { id: "4", profileId: "4", name: "David Brown", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb", lastMessage: "Can you adjust my calorie goal?", timestamp: new Date(2023, 4, 15, 14, 25), unread: 0 },
];

export const fakeMeals: Meal[] = [
  { id: "1", name: "Breakfast - Avocado Toast", calories: 350, image: "https://images.unsplash.com/photo-1588137378633-dea1336ce2e3", time: "8:00 AM" },
  { id: "2", name: "Morning Snack - Greek Yogurt", calories: 150, image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e", time: "10:30 AM" },
  { id: "3", name: "Lunch - Chicken Salad", calories: 450, image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c", time: "1:00 PM" },
  { id: "4", name: "Afternoon Snack - Almonds", calories: 160, image: "https://images.unsplash.com/photo-1599942239139-5f94359ab0be", time: "3:30 PM" },
  { id: "5", name: "Dinner - Salmon with Vegetables", calories: 550, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288", time: "7:00 PM" },
  { id: "6", name: "Evening Snack - Herbal Tea", calories: 40, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9", time: "9:00 PM" },
];
