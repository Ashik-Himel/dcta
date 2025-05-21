export interface Badge {
  _id: string;
  id: string;
  text: string;
  textBn: string;
}

export interface Category {
  _id: string;
  id: number;
  img: string;
  text: string;
  textBn: string;
  courseCount?: number;
}

export interface Course {
  _id: string;
  id: number;
  thumbnail: string;
  title: string;
  titleBn: string;
  category: Category;
  duration: number;
  slug: string;
  discountPrice: number;
  regularPrice: number;
  badge?: Badge;
  featured: boolean;
}

export interface Story {
  _id: string;
  id: number;
  avatar: string;
  name: string;
  nameBn: string;
  role: string;
  roleBn: string;
  thumbnail: string;
  video: string;
  course: Course;
  featured: boolean;
}

export interface Social {
  _id: string;
  id: number;
  name: string;
  nameBn: string;
  icon: string;
  link: string;
}

export interface Instructor {
  _id: string;
  id: number;
  name: string;
  nameBn: string;
  title: string;
  titleBn: string;
  photo: string;
  socials: Social[];
}

export interface FAQ {
  _id: string;
  id: number;
  question: string;
  answer: string;
  questionBn: string;
  answerBn: string;
}

export interface Application {
  _id: string;
  id: number;
  fullName: string;
  email: string;
  phone: string;
  address: string;
  message?: string;
  adminNote?: string;
  course: string;
  batch: string;
  status: "New" | "Called" | "Admitted" | "Rejected";
  date: string;
}

export interface Contact {
  _id: string;
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: "New" | "Read" | "Replied";
  date: string;
}
